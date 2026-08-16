document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('modelsContainer');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    // Modal Elements
    const modal = document.getElementById('metadataModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.getElementById('closeModal');

    // Close Modal Logic
    function hideModal() {
        modal.style.display = "none";
        modal.setAttribute('aria-hidden', 'true');
    }
    if (closeModal) {
        closeModal.onclick = hideModal;
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            hideModal();
        }
    }
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            hideModal();
        }
    });

    // View state
    let currentView = 'table';
    let spiralYear = 'all';
    const gridBtn = document.getElementById('gridBtn');
    const tableBtn = document.getElementById('tableBtn');
    const timelineBtn = document.getElementById('timelineBtn');

    // View toggle logic
    function setView(view, activeBtn) {
        currentView = view;
        [gridBtn, tableBtn, timelineBtn].forEach(b => b && b.classList.remove('active'));
        if (activeBtn) activeBtn.classList.add('active');
        handleFilters();
    }
    if (gridBtn) gridBtn.addEventListener('click', () => setView('grid', gridBtn));
    if (tableBtn) tableBtn.addEventListener('click', () => setView('table', tableBtn));
    if (timelineBtn) timelineBtn.addEventListener('click', () => setView('timeline', timelineBtn));

    // Populate Category Filter
    modelData.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.category;
        option.textContent = cat.category;
        categoryFilter.appendChild(option);
    });

    // Tag each entry with its category so the detail modal can show it.
    modelData.forEach(cat => cat.models.forEach(m => { m._category = cat.category; }));

    // Helper to get family tag info based on category
    function getFamilyInfo(category) {
        const catLower = category.toLowerCase();
        if (catLower.includes('copilot') || catLower.includes('assistant')) return { text: 'copilot', color: 'purple' };
        if (catLower.includes('reasoning') || catLower.includes('diagnostic')) return { text: 'agent', color: 'blue' };
        if (catLower.includes('navigation') || catLower.includes('perception')) return { text: 'navigation', color: 'yellow' };
        if (catLower.includes('multi-agent')) return { text: 'multi-agent', color: 'teal' };
        if (catLower.includes('tool') || catLower.includes('retrieval')) return { text: 'tool-use', color: 'green' };
        if (catLower.includes('discovery') || catLower.includes('research')) return { text: 'discovery', color: 'gray' };
        if (catLower.includes('omics')) return { text: 'image-omics', color: 'cyan' };
        if (catLower.includes('report')) return { text: 'report-gen', color: 'pink' };
        if (catLower.includes('benchmark')) return { text: 'benchmark', color: 'orange' };
        if (catLower.includes('survey') || catLower.includes('perspective')) return { text: 'survey', color: 'gray' };
        return { text: 'agent', color: 'gray' };
    }

    function formatField(text) {
        if (!text) return '';
        // Replace **text** with <strong>text</strong> or just strip. Let's use strong.
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }

    // Escape for safe display inside a <pre> block.
    function escapeHtml(text) {
        return (text || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // Small clickable chips for a model's newer versions/variants.
    function variantChips(model) {
        if (!model.variants || !model.variants.length) return '';
        return model.variants.map(v => {
            const url = v.hf || v.paper;
            const note = (v.note || '').replace(/"/g, '&quot;');
            if (!url) return `<span class="variant-chip variant-chip-static" title="${note}"><i class="ph ph-git-fork"></i> ${v.name}</span>`;
            return `<a href="${url}" target="_blank" class="variant-chip" title="${note}"><i class="ph ph-git-fork"></i> ${v.name}</a>`;
        }).join('');
    }

    // A field is "meaningful" only if it isn't blank, "Not found", or "N/A".
    function isMeaningful(text) {
        if (!text) return false;
        const clean = text.replace(/\*/g, '').trim().toLowerCase();
        return clean !== '' && clean !== 'not found' && clean !== 'n/a';
    }

    // Prefer the richer audit value when it carries real information,
    // otherwise fall back to the concise summary field.
    function preferAudit(auditVal, fallback) {
        if (isMeaningful(auditVal)) return formatField(auditVal);
        if (isMeaningful(fallback)) return formatField(fallback);
        return '';
    }

    // Show Modal Function
    function openModal(model) {
        modalTitle.textContent = model.name;
        
        if (model.paper_title || model.paper_author) {
            let subtitleHtml = '';
            if (model.paper_title) {
                subtitleHtml += model.paper_title;
            }
            if (model.paper_author) {
                subtitleHtml += (subtitleHtml ? ' — ' : '') + model.paper_author + ' et al.';
            }
            modalSubtitle.textContent = subtitleHtml;
            modalSubtitle.style.display = 'block';
        } else {
            modalSubtitle.style.display = 'none';
        }
        
        // Click-to-expand facets: stain, organ/tissue, and institution (when available).
        const facetDefs = [
            { key: 'audit_architecture', label: 'Agent architecture', icon: 'ph-flow-arrow' },
            { key: 'audit_tools', label: 'Tools & models', icon: 'ph-wrench' },
            { key: 'audit_tasks', label: 'Downstream tasks', icon: 'ph-list-checks' },
            { key: 'audit_domain', label: 'Domain / focus', icon: 'ph-target' }
        ];
        let facetsHtml = '';
        facetDefs.forEach(facet => {
            if (isMeaningful(model[facet.key])) {
                facetsHtml += `
                    <div class="facet">
                        <button class="facet-btn" type="button" aria-expanded="false">
                            <span class="facet-label"><i class="ph ${facet.icon}"></i> ${facet.label}</span>
                            <i class="ph ph-caret-down facet-caret"></i>
                        </button>
                        <div class="facet-content" hidden>${formatField(model[facet.key])}</div>
                    </div>`;
            }
        });
        if (model.variants && model.variants.length) {
            const vRows = model.variants.map(v => {
                let vlinks = '';
                if (v.hf) vlinks += `<a href="${v.hf}" target="_blank" class="variant-link"><i class="ph ph-cube"></i> Model</a>`;
                if (v.paper) vlinks += `<a href="${v.paper}" target="_blank" class="variant-link"><i class="ph ph-file-text"></i> Paper</a>`;
                return `<div class="variant-row">
                            <div class="variant-head"><span class="variant-name">${v.name}</span>${v.year ? `<span class="variant-year">${v.year}</span>` : ''}</div>
                            ${v.note ? `<div class="variant-note">${v.note}</div>` : ''}
                            ${vlinks ? `<div class="variant-links">${vlinks}</div>` : ''}
                        </div>`;
            }).join('');
            facetsHtml += `
                    <div class="facet">
                        <button class="facet-btn" type="button" aria-expanded="false">
                            <span class="facet-label"><i class="ph ph-git-fork"></i> Versions / variants</span>
                            <i class="ph ph-caret-down facet-caret"></i>
                        </button>
                        <div class="facet-content facet-variants" hidden>${vRows}</div>
                    </div>`;
        }
        if (model.bibtex) {
            facetsHtml += `
                    <div class="facet">
                        <button class="facet-btn" type="button" aria-expanded="false">
                            <span class="facet-label"><i class="ph ph-quotes"></i> Cite (BibTeX)</span>
                            <i class="ph ph-caret-down facet-caret"></i>
                        </button>
                        <div class="facet-content facet-cite" hidden>
                            <div class="cite-toolbar">
                                <span class="cite-label">BibTeX</span>
                                <button class="copy-bibtex" type="button"><i class="ph ph-copy"></i> Copy</button>
                            </div>
                            <pre class="bibtex-block">${escapeHtml(model.bibtex)}</pre>
                        </div>
                    </div>`;
        }
        const facetsBlock = facetsHtml ? `<div class="modal-facets">${facetsHtml}</div>` : '';

        // Overview: the full description of what the system does / what makes it agentic.
        const overview = preferAudit(model.audit_notes, model.idea);
        const overviewBlock = overview ? `<div class="modal-overview">${overview}</div>` : '';

        // Key metadata rows (quick facts).
        let rowsHtml = '';
        const fields = [
            { label: 'Category', value: model._category },
            { label: 'Published', value: formatDate(model.date) },
            { label: 'Backbone', value: model.audit_backbone },
            { label: 'Paradigm', value: model.audit_paradigm },
            { label: 'Benchmark / dataset', value: model.audit_benchmark },
            { label: 'Headline result', value: model.audit_result }
        ];
        fields.forEach(field => {
            if (isMeaningful(field.value)) {
                rowsHtml += `<tr><th>${field.label}</th><td>${formatField(field.value)}</td></tr>`;
            }
        });
        const tableBlock = rowsHtml ? `<table class="modal-table"><tbody>${rowsHtml}</tbody></table>` : '';

        // Resource links.
        let linkRow = '';
        if (model.paper) linkRow += `<a href="${model.paper}" target="_blank" class="link-btn link-paper"><i class="ph ph-file-text"></i> Paper</a>`;
        if (model.github) linkRow += `<a href="${model.github}" target="_blank" class="link-btn link-github"><i class="ph ph-github-logo"></i> Code</a>`;
        if (model.hf) linkRow += `<a href="${model.hf}" target="_blank" class="link-btn link-hf"><i class="ph ph-cube"></i> Model</a>`;
        if (model.dataset) linkRow += `<a href="${model.dataset}" target="_blank" class="link-btn link-dataset"><i class="ph ph-database"></i> Dataset</a>`;
        if (model.website) linkRow += `<a href="${model.website}" target="_blank" class="link-btn link-website"><i class="ph ph-globe"></i> Website</a>`;
        const linksBlock = linkRow ? `<div class="modal-links">${linkRow}</div>` : '';

        const body = overviewBlock + tableBlock + facetsBlock + linksBlock;
        modalBody.innerHTML = body || '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">No detailed metadata found for this model.</p>';

        // Wire up the accordion toggles.
        modalBody.querySelectorAll('.facet-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const content = btn.nextElementSibling;
                const isHidden = content.hasAttribute('hidden');
                if (isHidden) {
                    content.removeAttribute('hidden');
                    btn.setAttribute('aria-expanded', 'true');
                } else {
                    content.setAttribute('hidden', '');
                    btn.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Copy-to-clipboard for the BibTeX entry.
        const copyBtn = modalBody.querySelector('.copy-bibtex');
        if (copyBtn && model.bibtex) {
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(model.bibtex).then(() => {
                    const orig = copyBtn.innerHTML;
                    copyBtn.innerHTML = '<i class="ph ph-check"></i> Copied!';
                    setTimeout(() => { copyBtn.innerHTML = orig; }, 2000);
                });
            });
        }

        modal.style.display = "block";
        modal.setAttribute('aria-hidden', 'false');
    }

    // Format an ISO date (YYYY-MM-DD) as "Mon D, YYYY".
    function formatDate(iso) {
        if (!iso) return '';
        const [y, mo, d] = iso.split('-').map(Number);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[mo - 1]} ${d}, ${y}`;
    }

    // Distinct per-category palette for the spiral timeline (10 categories).
    const SPIRAL_COLORS = {
        'Interactive Copilots & Assistants': '#a855f7',
        'Reasoning & Diagnostic Agents': '#3b82f6',
        'Navigation & Active-Perception Agents': '#eab308',
        'Multi-Agent Systems': '#14b8a6',
        'Tool-Use & Retrieval Agents': '#22c55e',
        'Autonomous Discovery & Research': '#f97316',
        'Agentic Image–Omics Reasoning': '#06b6d4',
        'Report Generation Agents': '#ec4899',
        'Benchmarks & Evaluation': '#ef4444',
        'Surveys and Perspectives': '#94a3b8',
    };
    const spiralColor = c => SPIRAL_COLORS[c] || '#9ca3af';

    // Timeline view: an Archimedean spiral — one full revolution per year, so
    // same-month entries align radially and the field's growth reads outward.
    function renderTimeline(data) {
        const allItems = [];
        data.forEach(cat => cat.models.forEach(m => allItems.push({ m, category: cat.category })));
        container.innerHTML = '';
        if (!allItems.length) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="ph ph-ghost" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>No entries found</h3><p>Try adjusting your search or filters.</p>
                </div>`;
            return;
        }
        allItems.sort((a, b) => (a.m.date || '').localeCompare(b.m.date || ''));

        // Year tabs: filter the spiral to a single year (or All).
        const allYears = [...new Set(allItems.map(it => (it.m.date || (it.m.year + '')).slice(0, 4)).filter(Boolean))].sort();
        if (spiralYear !== 'all' && !allYears.includes(spiralYear)) spiralYear = 'all';
        const tabs = `<button class="spiral-tab${spiralYear === 'all' ? ' active' : ''}" data-year="all">All</button>` +
            allYears.map(y => `<button class="spiral-tab${spiralYear === y ? ' active' : ''}" data-year="${y}">${y}</button>`).join('');
        const wireTabs = () => container.querySelectorAll('.spiral-tab').forEach(b => b.addEventListener('click', () => { spiralYear = b.dataset.year; handleFilters(); }));
        const items = spiralYear === 'all' ? allItems : allItems.filter(it => (it.m.date || '').slice(0, 4) === spiralYear);
        if (!items.length) {
            container.innerHTML = `<div class="spiral-wrap"><div class="spiral-tabs">${tabs}</div>
                <div class="empty-state"><i class="ph ph-ghost" style="font-size:2.5rem;opacity:.5"></i><h3>Nothing in ${spiralYear}</h3></div></div>`;
            wireTabs();
            return;
        }

        // Map an ISO date to spiral parameter t (in years from the base year).
        const baseYear = 2023;
        const toT = iso => { const [y, mo, d] = (iso || (baseYear + '-01-01')).split('-').map(Number); return (y - baseYear) + (((mo - 1) * 30.44 + (d - 1)) / 365); };
        const ts = items.map(it => toT(it.m.date));
        const tMax = Math.max(...ts);

        const single = spiralYear !== 'all';   // single-year view: bigger, more open loop with larger dots
        const R0 = single ? 90 : 58, K = single ? 175 : 92;
        const dotR = single ? 8 : 6, dotHr = single ? 11 : 9, collide = single ? 17 : 13.5;
        const p0 = t => { const th = 2 * Math.PI * t, r = R0 + K * t; return [r * Math.sin(th), -r * Math.cos(th)]; };

        // Place dots; fan collisions outward along the radius so clustered dates stay visible.
        const placed = [];
        const P = ts.map(t => {
            const th = 2 * Math.PI * t; let r = R0 + K * t, x = r * Math.sin(th), y = -r * Math.cos(th), tries = 0;
            while (tries < 60 && placed.some(q => Math.hypot(q[0] - x, q[1] - y) < collide)) { r += collide * 0.34; x = r * Math.sin(th); y = -r * Math.cos(th); tries++; }
            placed.push([x, y]); return [x, y];
        });

        const maxR = Math.max(R0 + K * tMax, ...P.map(p => Math.hypot(p[0], p[1])));
        const pad = 40, size = Math.ceil(2 * (maxR + pad)), c = size / 2;

        // Colored quarter wedges (faint pie slices) + a month dial with all 12 labels.
        const mNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const onC = (f, R) => [c + R * Math.sin(2 * Math.PI * f), c - R * Math.cos(2 * Math.PI * f)];
        let wedges = '';
        [['q1', 0, 0.25], ['q2', 0.25, 0.5], ['q3', 0.5, 0.75], ['q4', 0.75, 1]].forEach(([cls, f1, f2]) => {
            const a = onC(f1, maxR), b = onC(f2, maxR);
            wedges += `<path d="M ${c},${c} L ${a[0].toFixed(1)},${a[1].toFixed(1)} A ${maxR.toFixed(1)},${maxR.toFixed(1)} 0 0 1 ${b[0].toFixed(1)},${b[1].toFixed(1)} Z" class="spiral-quarter ${cls}"/>`;
        });
        let ticks = '', monthLabels = '';
        for (let m = 0; m < 12; m++) {
            const q = m % 3 === 0, a = onC(m / 12, maxR - (q ? 14 : 8)), b = onC(m / 12, maxR + (q ? 4 : 0));
            ticks += `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" class="spiral-tick${q ? ' q' : ''}"/>`;
            const [lx, ly] = onC(m / 12, maxR + 17);
            monthLabels += `<text x="${lx.toFixed(1)}" y="${(ly + 3.5).toFixed(1)}" class="spiral-monthlabel${q ? ' q' : ''}" text-anchor="middle">${mNames[m]}</text>`;
        }

        // Spiral path.
        let dPath = '';
        for (let t = 0; t <= tMax + 0.001; t += 0.008) { const [x, y] = p0(t); dPath += (dPath ? 'L' : 'M') + (x + c).toFixed(1) + ',' + (y + c).toFixed(1); }

        // Year ticks/labels at the top of each year's loop (January = 12 o'clock).
        const years = [...new Set(items.map(it => (it.m.date || '').slice(0, 4)).filter(Boolean))];
        let yearMarks = '';
        years.forEach(ys => { const [x, y] = p0(toT(ys + '-01-01')); yearMarks += `<circle cx="${(x + c).toFixed(1)}" cy="${(y + c).toFixed(1)}" r="2.5" class="spiral-yeartick"/><text x="${(x + c).toFixed(1)}" y="${(y + c - 10).toFixed(1)}" class="spiral-yearlabel" text-anchor="middle">${ys}</text>`; });

        // Dots.
        let dots = '';
        items.forEach((it, i) => { const col = spiralColor(it.category); dots += `<circle class="spiral-dot" data-idx="${i}" cx="${(P[i][0] + c).toFixed(1)}" cy="${(P[i][1] + c).toFixed(1)}" r="${dotR}" fill="${col}" style="color:${col};animation-delay:${i * 13}ms"/>`; });

        // Legend (categories present, in canonical order).
        const present = Object.keys(SPIRAL_COLORS).filter(cat => items.some(it => it.category === cat));
        const legend = present.map(cat => `<span class="spiral-leg"><i style="background:${spiralColor(cat)}"></i>${cat}</span>`).join('');

        container.innerHTML = `
        <div class="spiral-wrap">
          <div class="spiral-tabs">${tabs}</div>
          <svg viewBox="0 0 ${size} ${size}" class="spiral-svg" style="--dot-hr:${dotHr}" role="img" aria-label="Spiral timeline of ${items.length} systems, one revolution per year">
            <defs>
              <radialGradient id="spiralGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="var(--accent-1)" stop-opacity="0.10"/>
                <stop offset="72%" stop-color="var(--accent-1)" stop-opacity="0"/>
              </radialGradient>
              <linearGradient id="spiralStroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="var(--accent-1)"/>
                <stop offset="100%" stop-color="var(--accent-2)"/>
              </linearGradient>
            </defs>
            ${wedges}
            <circle cx="${c}" cy="${c}" r="${maxR.toFixed(1)}" fill="url(#spiralGlow)"/>
            ${ticks}
            <path d="${dPath}" fill="none" stroke="url(#spiralStroke)" stroke-width="1.6" stroke-opacity="0.4" stroke-linecap="round"/>
            ${yearMarks}
            ${dots}
            <text x="${c}" y="${c + 9}" class="spiral-center-num" text-anchor="middle">${items.length}</text>
            ${monthLabels}
          </svg>
          <div class="spiral-hovercard" id="spiralCard" hidden></div>
          <div class="spiral-legend">${legend}</div>
        </div>`;

        // Interactions: hover → preview card (with bridge), click → modal.
        const wrap = container.querySelector('.spiral-wrap');
        const svgEl = container.querySelector('.spiral-svg');
        const card = container.querySelector('#spiralCard');
        let hideTimer;
        const showCard = (i, dot) => {
            clearTimeout(hideTimer);
            const it = items[i], m = it.m;
            let links = '';
            if (m.paper) links += `<a href="${m.paper}" target="_blank" class="icon-link paper" title="Paper"><i class="ph ph-file-text"></i></a>`;
            if (m.github) links += `<a href="${m.github}" target="_blank" class="icon-link github" title="Code"><i class="ph ph-github-logo"></i></a>`;
            if (m.hf) links += `<a href="${m.hf}" target="_blank" class="icon-link hf" title="Model"><i class="ph ph-cube"></i></a>`;
            if (m.website) links += `<a href="${m.website}" target="_blank" class="icon-link website" title="Website"><i class="ph ph-globe"></i></a>`;
            card.innerHTML = `<div class="sc-head"><span class="sc-dot" style="background:${spiralColor(it.category)}"></span><strong>${m.name}</strong></div>
                <div class="sc-date">${formatDate(m.date) || m.year} · ${it.category}</div>
                <div class="sc-idea">${preferAudit(m.audit_notes, m.idea)}</div>
                <div class="sc-links">${links}<button class="sc-details" type="button">Details</button></div>`;
            card.hidden = false;
            card.querySelector('.sc-details').addEventListener('click', () => openModal(m));
            const wr = wrap.getBoundingClientRect(), dr = dot.getBoundingClientRect();
            const cw = card.offsetWidth, ch = card.offsetHeight;
            let left = (dr.left - wr.left + dr.width / 2) - cw / 2;
            left = Math.max(4, Math.min(left, wrap.clientWidth - cw - 4));
            let top = (dr.top - wr.top) - ch - 12;
            if (top < 4) top = (dr.bottom - wr.top) + 12;
            card.style.left = left + 'px';
            card.style.top = top + 'px';
        };
        svgEl.addEventListener('mouseover', e => { const dot = e.target.closest('.spiral-dot'); if (dot) { dot.classList.add('active'); showCard(+dot.dataset.idx, dot); } });
        svgEl.addEventListener('mouseout', e => { const dot = e.target.closest('.spiral-dot'); if (dot) { dot.classList.remove('active'); hideTimer = setTimeout(() => { card.hidden = true; }, 140); } });
        card.addEventListener('mouseenter', () => clearTimeout(hideTimer));
        card.addEventListener('mouseleave', () => { card.hidden = true; });
        svgEl.addEventListener('click', e => { const dot = e.target.closest('.spiral-dot'); if (dot) openModal(items[+dot.dataset.idx].m); });

        wireTabs();
    }

    // Render Data
    // Resource icon-links for a model (used in the compare table).
    function compareLinks(m) {
        let s = '';
        if (m.paper) s += `<a href="${m.paper}" target="_blank" class="icon-link paper" title="Paper"><i class="ph ph-file-text"></i></a>`;
        if (m.github) s += `<a href="${m.github}" target="_blank" class="icon-link github" title="Code"><i class="ph ph-github-logo"></i></a>`;
        if (m.hf) s += `<a href="${m.hf}" target="_blank" class="icon-link hf" title="Model"><i class="ph ph-cube"></i></a>`;
        if (m.dataset) s += `<a href="${m.dataset}" target="_blank" class="icon-link dataset" title="Dataset"><i class="ph ph-database"></i></a>`;
        if (m.website) s += `<a href="${m.website}" target="_blank" class="icon-link website" title="Website"><i class="ph ph-globe"></i></a>`;
        return s || '<span class="cmp-dash">—</span>';
    }

    function closeCompare() {
        const o = document.getElementById('compareOverlay');
        if (o) { o.classList.remove('open'); document.body.style.overflow = ''; }
    }

    // Side-by-side comparison table for a category (models = columns, attributes = rows).
    function openCompare(categoryName, models) {
        let overlay = document.getElementById('compareOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'compareOverlay';
            overlay.className = 'compare-overlay';
            overlay.innerHTML = '<div class="compare-panel"><div class="compare-head"><h3 id="compareTitle"></h3><button class="close-compare" id="closeCompare" aria-label="Close">&times;</button></div><div class="compare-body" id="compareBody"></div></div>';
            document.body.appendChild(overlay);
            overlay.addEventListener('click', e => { if (e.target === overlay) closeCompare(); });
            overlay.querySelector('#closeCompare').addEventListener('click', closeCompare);
            document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCompare(); });
        }
        const rowDefs = [
            ['Year', m => m.year != null ? String(m.year) : '', 'ph-calendar-blank'],
            ['Backbone / Data', m => m.data, 'ph-database'],
            ['Key idea', m => m.idea, 'ph-lightbulb'],
            ['Pre-training objective', m => m.audit_objective, 'ph-atom'],
            ['Agent architecture', m => m.audit_architecture, 'ph-flow-arrow'],
            ['Tools & models', m => m.audit_tools, 'ph-wrench'],
            ['Backbone', m => m.audit_backbone, 'ph-cpu'],
            ['Paradigm', m => m.audit_paradigm, 'ph-path'],
            ['Tasks', m => m.audit_tasks || m.audit_downstream, 'ph-list-checks'],
            ['Domain / focus', m => m.audit_domain || m.audit_organs, 'ph-target'],
            ['Benchmark / dataset', m => m.audit_benchmark, 'ph-ruler'],
            ['Headline result', m => m.audit_result, 'ph-trophy'],
            ['Pretraining WSIs', m => m.audit_wsis, 'ph-images'],
            ['Patches / tiles', m => m.audit_patches, 'ph-squares-four'],
            ['Image–text pairs', m => m.audit_image_text, 'ph-chat-text'],
            ['WSI–report pairs', m => m.audit_wsi_report, 'ph-file-text'],
            ['Image–omics pairs', m => m.audit_image_omics, 'ph-dna'],
            ['Institution / data sources', m => m.audit_cohorts, 'ph-buildings'],
            ['Scanners / vendors', m => m.audit_scanners, 'ph-scan'],
            ['Omics modality & scale', m => m.audit_omics, 'ph-dna'],
            ['Stain', m => m.stains, 'ph-drop'],
            ['Notes', m => m.audit_notes, 'ph-note'],
        ].filter(([, get]) => models.some(m => isMeaningful(get(m))));

        const head = '<tr><th class="cmp-corner">' + models.length + ' entries</th>' +
            models.map(m => '<th class="cmp-model">' + m.name + (m.year != null ? ' <span class="cmp-year">' + m.year + '</span>' : '') + '</th>').join('') + '</tr>';
        const body = rowDefs.map(([lbl, get, icon]) =>
            '<tr><th class="cmp-attr"><i class="ph ' + icon + '"></i>' + lbl + '</th>' +
            models.map(m => '<td>' + (isMeaningful(get(m)) ? formatField(get(m)) : '<span class="cmp-dash">—</span>') + '</td>').join('') + '</tr>'
        ).join('') +
            '<tr><th class="cmp-attr"><i class="ph ph-link"></i>Resources</th>' + models.map(m => '<td class="cmp-links">' + compareLinks(m) + '</td>').join('') + '</tr>';

        document.getElementById('compareTitle').textContent = 'Compare · ' + categoryName + ' (' + models.length + ')';
        document.getElementById('compareBody').innerHTML = '<div class="cmp-scroll"><table class="cmp-table"><thead>' + head + '</thead><tbody>' + body + '</tbody></table></div>';
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function render(data) {
        container.innerHTML = '';
        if (currentView === 'timeline') { renderTimeline(data); return; }
        let hasResults = false;

        data.forEach(categoryGroup => {
            if (categoryGroup.models.length === 0) return;
            hasResults = true;

            const section = document.createElement('div');
            section.className = 'category-section';

            const header = document.createElement('div');
            header.className = 'category-header';
            const title = document.createElement('h2');
            title.className = 'category-title';
            title.textContent = categoryGroup.category;
            header.appendChild(title);
            if (categoryGroup.models.length > 1) {
                const cmpBtn = document.createElement('button');
                cmpBtn.type = 'button';
                cmpBtn.className = 'compare-btn';
                cmpBtn.innerHTML = '<i class="ph ph-columns"></i> Compare';
                const grpName = categoryGroup.category, grpModels = categoryGroup.models;
                cmpBtn.addEventListener('click', () => openCompare(grpName, grpModels));
                header.appendChild(cmpBtn);
            }
            section.appendChild(header);

            const family = getFamilyInfo(categoryGroup.category);

            if (currentView === 'table') {
                // TABLE VIEW
                const tableWrapper = document.createElement('div');
                tableWrapper.className = 'table-responsive';

                const table = document.createElement('table');
                table.className = 'models-table';
                table.innerHTML = `
                    <thead>
                        <tr>
                            <th class="expand-col"></th>
                            <th>${(categoryGroup.category.includes('Survey') || categoryGroup.category.includes('Perspective')) ? 'Paper' : categoryGroup.category.includes('Benchmark') ? 'Benchmark' : 'System'}</th>
                            <th>Year</th>
                            <th>Key Idea</th>
                            <th>Resources</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                `;
                
                const tbody = table.querySelector('tbody');
                
                categoryGroup.models.forEach(model => {
                    const tr = document.createElement('tr');
                    tr.className = 'main-row';
                    
                    let linksHTML = '';
                    if (model.paper) linksHTML += `<a href="${model.paper}" target="_blank" class="icon-link paper" title="Paper"><i class="ph ph-file-text"></i></a>`;
                    if (model.github) linksHTML += `<a href="${model.github}" target="_blank" class="icon-link github" title="Code"><i class="ph ph-github-logo"></i></a>`;
                    if (model.hf) linksHTML += `<a href="${model.hf}" target="_blank" class="icon-link hf" title="Model weights"><i class="ph ph-cube"></i></a>`;
                    if (model.dataset) linksHTML += `<a href="${model.dataset}" target="_blank" class="icon-link dataset" title="Dataset"><i class="ph ph-database"></i></a>`;
                    if (model.website) linksHTML += `<a href="${model.website}" target="_blank" class="icon-link website" title="Website"><i class="ph ph-globe"></i></a>`;

                    tr.innerHTML = `
                        <td class="expand-col"><button class="expand-btn" title="View Detailed Metadata"><i class="ph ph-arrows-out-simple"></i></button></td>
                        <td>
                            <div class="model-info-col">
                                <div class="model-name">${model.name}</div>
                                <span class="tag tag-${model.tag_color || family.color}">${model.tag || model.type || family.text}</span>
                            </div>
                        </td>
                        <td><span class="year-badge">${model.year}</span></td>
                        <td class="idea-col">${preferAudit(model.audit_notes, model.idea)}</td>
                        <td><div class="links-col">${linksHTML}${variantChips(model)}</div></td>
                    `;
                    
                    // Modal logic
                    tr.querySelector('.expand-btn').addEventListener('click', function() {
                        openModal(model);
                    });

                    tbody.appendChild(tr);
                });
                tableWrapper.appendChild(table);
                section.appendChild(tableWrapper);
            } else {
                // GRID VIEW
                const grid = document.createElement('div');
                grid.className = 'grid';
                
                categoryGroup.models.forEach(model => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    let linksHTML = '';
                    if (model.paper) linksHTML += `<a href="${model.paper}" target="_blank" class="link-btn link-paper"><i class="ph ph-file-text"></i> Paper</a>`;
                    if (model.github) linksHTML += `<a href="${model.github}" target="_blank" class="link-btn link-github"><i class="ph ph-github-logo"></i> Code</a>`;
                    if (model.hf) linksHTML += `<a href="${model.hf}" target="_blank" class="link-btn link-hf"><i class="ph ph-cube"></i> Model</a>`;
                    if (model.dataset) linksHTML += `<a href="${model.dataset}" target="_blank" class="link-btn link-dataset"><i class="ph ph-database"></i> Dataset</a>`;
                    if (model.website) linksHTML += `<a href="${model.website}" target="_blank" class="link-btn link-website"><i class="ph ph-globe"></i> Website</a>`;

                    card.innerHTML = `
                        <div class="card-header">
                            <div class="model-info">
                                <div class="model-name">${model.name}</div>
                                <span class="tag tag-${model.tag_color || family.color}">${model.tag || model.type || family.text}</span>
                            </div>
                            <div class="model-year">${model.year}</div>
                        </div>
                        <div class="model-idea">${preferAudit(model.audit_notes, model.idea)}</div>
                        <div class="model-data">
                            <i class="ph ph-database"></i>
                            <span>${preferAudit(model.audit_wsis, model.data)}</span>
                        </div>
                        <div class="card-links">
                            ${linksHTML}
                        </div>
                        ${variantChips(model) ? `<div class="card-variants">${variantChips(model)}</div>` : ''}
                        <button class="card-expand-btn">
                            Detailed Metadata <i class="ph ph-arrows-out-simple"></i>
                        </button>
                    `;

                    // Modal logic
                    card.querySelector('.card-expand-btn').addEventListener('click', function() {
                        openModal(model);
                    });

                    grid.appendChild(card);
                });
                section.appendChild(grid);
            }

            container.appendChild(section);
        });

        if (!hasResults) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="ph ph-ghost" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>No models found</h3>
                    <p>Try adjusting your search or filters.</p>
                </div>
            `;
        }
    }

    function handleFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const filtered = modelData.map(cat => {
            if (selectedCategory !== 'all' && cat.category !== selectedCategory) {
                return { ...cat, models: [] };
            }
            const matchedModels = cat.models.filter(m => {
                const haystack = [
                    m.name, m.idea, m.data, m.year, cat.category,
                    m.audit_notes, m.paper_title, m.paper_author, m.tag,
                    ...(m.variants || []).map(v => v.name)
                ].filter(Boolean).join(' ').toLowerCase();
                return haystack.includes(searchTerm);
            });
            return { ...cat, models: matchedModels };
        });
        render(filtered);
    }

    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light' || (!savedTheme && window.matchMedia('(prefers-color-scheme: light)').matches)) {
        document.body.classList.add('light-mode');
        themeIcon.classList.replace('ph-sun', 'ph-moon');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        if (isLight) themeIcon.classList.replace('ph-sun', 'ph-moon');
        else themeIcon.classList.replace('ph-moon', 'ph-sun');
    });

    searchInput.addEventListener('input', handleFilters);
    categoryFilter.addEventListener('change', handleFilters);

    // Top BibTeX button: copy the citation for this website/repository itself.
    const bibtexBtn = document.getElementById('bibtexBtn');
    if (bibtexBtn) {
        bibtexBtn.addEventListener('click', () => {
            const bibtex = `@misc{agenticcpath2026,\n  author = {Anonymous Authors},\n  title = {Agentic AI in Computational Pathology},\n  year = {2026},\n  publisher = {GitHub},\n  journal = {GitHub repository},\n  howpublished = {\\url{https://github.com/researchsubmissions66/Agentic-AI-CPath}}\n}`;
            navigator.clipboard.writeText(bibtex).then(() => {
                const originalText = bibtexBtn.innerHTML;
                bibtexBtn.innerHTML = '<i class="ph ph-check"></i> Copied!';
                setTimeout(() => { bibtexBtn.innerHTML = originalText; }, 2000);
            });
        });
    }

    render(modelData);
});
