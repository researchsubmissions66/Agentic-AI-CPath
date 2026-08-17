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
    const swimlaneBtn = document.getElementById('swimlaneBtn');
    const treeBtn = document.getElementById('treeBtn');

    // View toggle logic (grid / table / timeline / swimlane / tree)
    function setView(view, activeBtn) {
        currentView = view;
        [gridBtn, tableBtn, timelineBtn, swimlaneBtn, treeBtn].forEach(b => b && b.classList.remove('active'));
        if (activeBtn) activeBtn.classList.add('active');
        handleFilters();
    }
    if (gridBtn) gridBtn.addEventListener('click', () => setView('grid', gridBtn));
    if (tableBtn) tableBtn.addEventListener('click', () => setView('table', tableBtn));
    if (timelineBtn) timelineBtn.addEventListener('click', () => setView('timeline', timelineBtn));
    if (swimlaneBtn) swimlaneBtn.addEventListener('click', () => setView('swimlane', swimlaneBtn));
    if (treeBtn) treeBtn.addEventListener('click', () => setView('tree', treeBtn));

    // ---- Faceted filtering (optional collapsible panel) --------------------
    const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const FACETS = [
        { key: 'paradigm', label: 'Training paradigm', icon: 'ph-graduation-cap', tags: m => {
            const s = ((m.audit_paradigm || '') + ' ' + (m.audit_backbone || '')).toLowerCase(); const o = [];
            if (/training-free|off-the-shelf/.test(s)) o.push('Training-free');
            if (/\brl\b|grpo|\bppo\b|dapo|reinforcement/.test(s)) o.push('Reinforcement learning');
            if (/sft|instruction|fine-tun|finetun/.test(s)) o.push('SFT / instruction-tuned');
            if (/pretrain/.test(s)) o.push('Pretraining');
            if (/multi-stage|three-stage|two-stage/.test(s)) o.push('Multi-stage');
            return o;
        } },
        { key: 'capability', label: 'Agent capability', icon: 'ph-lightning', tags: m => {
            const s = ((m.audit_tools || '') + ' ' + (m.audit_architecture || '') + ' ' + (m.audit_paradigm || '')).toLowerCase(); const o = [];
            if ((m.audit_tools || '').trim()) o.push('Tool use');
            if (/knowledge|ontology|retriev|\brag\b|corpus|textbook/.test(s)) o.push('Knowledge / RAG');
            if (/\bcode\b|python|sandbox|code-generat|codeact/.test(s)) o.push('Code execution');
            if (/navigat|zoom|magnif|active perception|roi propos|explore/.test(s)) o.push('WSI navigation');
            if (/multi-agent|multi agent|collaborat|orchestrat|agents|supervisor/.test(s)) o.push('Multi-agent');
            return o;
        } },
        { key: 'task', label: 'Task', icon: 'ph-list-checks', tags: m => {
            const s = (m.audit_tasks || '').toLowerCase(); const o = [];
            if (/vqa|question answering|q&a|question/.test(s)) o.push('VQA');
            if (/report|caption|summar/.test(s)) o.push('Report / captioning');
            if (/classif|subtyp|grading|staging|prognos/.test(s)) o.push('Classification / grading');
            if (/segment|detection/.test(s)) o.push('Segmentation / detection');
            if (/reasoning|explain|interpretab/.test(s)) o.push('Reasoning / explainable');
            return o;
        } },
        { key: 'backbone', label: 'Backbone', icon: 'ph-cpu', tags: m => {
            const s = (m.audit_backbone || '').toLowerCase(); const o = [];
            if (/training-free|off-the-shelf|frozen/.test(s)) o.push('Training-free / frozen');
            if (/gpt/.test(s)) o.push('GPT-based');
            if (/conch|plip|patho-clip|visual fm|foundation.model/.test(s)) o.push('Pathology encoder');
            if (/mllm|vlm|multimodal|\blmm\b/.test(s)) o.push('MLLM / VLM');
            if (/\bllm\b/.test(s)) o.push('LLM');
            return o;
        } }
    ];
    const activeFacets = {};
    FACETS.forEach(f => { activeFacets[f.key] = new Set(); });

    const allModels = () => modelData.reduce((a, c) => a.concat(c.models), []);
    function modelPassesFacets(m) {
        for (const f of FACETS) {
            const sel = activeFacets[f.key];
            if (!sel.size) continue;
            if (!f.tags(m).some(t => sel.has(t))) return false;
        }
        return true;
    }
    function updateFacetBadge() {
        const c = FACETS.reduce((n, f) => n + activeFacets[f.key].size, 0);
        const badge = document.getElementById('facetCount');
        if (badge) { badge.textContent = c; badge.hidden = c === 0; }
        const btn = document.getElementById('facetBtn');
        if (btn) btn.classList.toggle('has-active', c > 0);
    }
    function buildFacetPanel() {
        const panel = document.getElementById('facetPanel');
        if (!panel) return;
        const models = allModels();
        let html = '<div class="facet-head"><span><i class="ph ph-funnel"></i> Filter by metadata</span>' +
            '<button type="button" id="facetClear" class="facet-clear">Clear all</button></div><div class="facet-groups">';
        FACETS.forEach(f => {
            const counts = {};
            models.forEach(m => f.tags(m).forEach(t => { counts[t] = (counts[t] || 0) + 1; }));
            let vals = Object.keys(counts);
            if (!vals.length) return;
            if (f.order) vals.sort((a, b) => f.order.indexOf(a) - f.order.indexOf(b));
            else vals.sort((a, b) => counts[b] - counts[a]);
            html += '<div class="facet-group"><div class="facet-group-label"><i class="ph ' + f.icon + '"></i> ' + f.label + '</div><div class="facet-chips">';
            vals.forEach(v => {
                html += '<button type="button" class="facet-chip" data-key="' + f.key + '" data-val="' + esc(v) + '">' +
                    esc(v) + ' <span class="facet-chip-n">' + counts[v] + '</span></button>';
            });
            html += '</div></div>';
        });
        html += '</div>';
        panel.innerHTML = html;
        panel.querySelectorAll('.facet-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const k = chip.dataset.key, v = chip.dataset.val;
                if (activeFacets[k].has(v)) activeFacets[k].delete(v); else activeFacets[k].add(v);
                chip.classList.toggle('active');
                updateFacetBadge();
                handleFilters();
            });
        });
        const clr = document.getElementById('facetClear');
        if (clr) clr.addEventListener('click', () => {
            FACETS.forEach(f => activeFacets[f.key].clear());
            panel.querySelectorAll('.facet-chip.active').forEach(c => c.classList.remove('active'));
            updateFacetBadge();
            handleFilters();
        });
    }
    const facetBtn = document.getElementById('facetBtn');
    if (facetBtn) facetBtn.addEventListener('click', () => {
        const panel = document.getElementById('facetPanel');
        if (!panel) return;
        const open = panel.hidden;
        panel.hidden = !open;
        facetBtn.classList.toggle('open', open);
        facetBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

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
            // Remove a paper's column from the comparison (view-only, this session).
            overlay.querySelector('#compareBody').addEventListener('click', e => {
                const btn = e.target.closest('.cmp-remove');
                if (!btn) return;
                if (btn.dataset.col !== undefined) {
                    overlay.querySelectorAll('[data-col="' + btn.dataset.col + '"]').forEach(el => el.remove());
                } else {
                    const tr = btn.closest('tr');
                    if (tr) tr.remove();
                }
            });
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
            models.map((m, i) => '<th class="cmp-model" data-col="' + i + '"><span class="cmp-mname">' + m.name + (m.year != null ? ' <span class="cmp-year">' + m.year + '</span>' : '') + '</span><button class="cmp-remove" data-col="' + i + '" title="Remove from comparison">&times;</button></th>').join('') + '</tr>';
        const attrTh = (icon, lbl) => '<th class="cmp-attr"><div class="cmp-attr-in"><span><i class="ph ' + icon + '"></i>' + lbl + '</span><button class="cmp-remove" title="Remove row">&times;</button></div></th>';
        const body = rowDefs.map(([lbl, get, icon]) =>
            '<tr>' + attrTh(icon, lbl) +
            models.map((m, i) => '<td data-col="' + i + '">' + (isMeaningful(get(m)) ? formatField(get(m)) : '<span class="cmp-dash">—</span>') + '</td>').join('') + '</tr>'
        ).join('') +
            '<tr>' + attrTh('ph-link', 'Resources') + models.map((m, i) => '<td data-col="' + i + '"><div class="cmp-links">' + compareLinks(m) + '</div></td>').join('') + '</tr>';

        document.getElementById('compareTitle').textContent = 'Compare · ' + categoryName + ' (' + models.length + ')';
        document.getElementById('compareBody').innerHTML = '<div class="cmp-scroll"><table class="cmp-table"><thead>' + head + '</thead><tbody>' + body + '</tbody></table></div>';
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    // Tree view: collapsible force-directed graph (root → categories → systems).
    function renderTree(data) {
        container.innerHTML = '';
        const cats = data.filter(c => c.models.length);
        if (!cats.length) {
            container.innerHTML = `<div class="empty-state"><i class="ph ph-ghost" style="font-size:3rem;opacity:.5"></i><h3>No entries found</h3><p>Try adjusting your search or filters.</p></div>`;
            return;
        }
        if (typeof d3 === 'undefined') {
            container.innerHTML = `<div class="empty-state"><i class="ph ph-tree-structure" style="font-size:3rem;opacity:.5"></i><h3>Graph library unavailable</h3><p>The force-directed view needs D3 (loaded from a CDN) — check your connection.</p></div>`;
            return;
        }
        const ROOT_LABEL = 'Agentic CPath';
        const color = c => (typeof SPIRAL_COLORS !== 'undefined' && SPIRAL_COLORS[c]) || '#6366f1';

        const root = { id: '__root', label: ROOT_LABEL, kind: 'root' };
        const catData = cats.map(c => ({
            id: 'c__' + c.category, label: c.category, kind: 'cat', category: c.category, expanded: false,
            children: c.models.map(m => ({ id: 'm__' + c.category + '__' + m.name, label: m.name, kind: 'model', category: c.category, model: m }))
        }));

        const wrap = document.createElement('div');
        wrap.className = 'tree-wrap';
        wrap.innerHTML = '<div class="tree-hint"><i class="ph ph-hand-pointing"></i> Click a category to expand · drag nodes · scroll to zoom · click a paper for details</div>' +
            '<div class="tree-spread" title="Node spacing"><i class="ph ph-arrows-in-line-horizontal"></i><input type="range" id="treeSpread" min="0.5" max="2.5" step="0.05" value="1" aria-label="Node spacing"><i class="ph ph-arrows-out-line-horizontal"></i></div>';
        container.appendChild(wrap);

        const width = wrap.clientWidth || 900, height = 620;
        const svg = d3.select(wrap).append('svg').attr('class', 'tree-svg').attr('viewBox', [0, 0, width, height]);
        const g = svg.append('g');
        svg.call(d3.zoom().scaleExtent([0.25, 3]).on('zoom', e => g.attr('transform', e.transform)));
        const linkG = g.append('g'), nodeG = g.append('g');

        const radius = d => d.kind === 'root' ? 15 : d.kind === 'cat' ? 10 : 6;

        let spread = 1;
        const linkDist = d => (d.target.kind === 'model' ? 80 : 150) * spread;
        const chargeStr = d => (d.kind === 'model' ? -220 : -650) * spread;
        const collideR = d => radius(d) + (d.kind === 'model' ? 34 : 24) * spread;

        const sim = d3.forceSimulation()
            .force('link', d3.forceLink().id(d => d.id).distance(linkDist).strength(0.45))
            .force('charge', d3.forceManyBody().strength(chargeStr))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collide', d3.forceCollide().radius(collideR).strength(0.9))
            .on('tick', ticked);

        const spreadInput = wrap.querySelector('#treeSpread');
        if (spreadInput) spreadInput.addEventListener('input', () => {
            spread = +spreadInput.value;
            sim.force('link').distance(linkDist);
            sim.force('charge').strength(chargeStr);
            sim.force('collide').radius(collideR);
            sim.alpha(0.6).restart();
        });

        let linkSel = linkG.selectAll('line');
        let nodeSel = nodeG.selectAll('g');

        function graph() {
            const N = [root], L = [];
            catData.forEach(cn => {
                N.push(cn);
                L.push({ source: root.id, target: cn.id });
                if (cn.expanded) cn.children.forEach(mn => { N.push(mn); L.push({ source: cn.id, target: mn.id }); });
            });
            return { N, L };
        }

        function drag() {
            return d3.drag()
                .on('start', (e, d) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
                .on('drag', (e, d) => { d.fx = e.x; d.fy = e.y; })
                .on('end', (e, d) => { if (!e.active) sim.alphaTarget(0); if (d.kind !== 'root') { d.fx = null; d.fy = null; } });
        }

        function ticked() {
            linkSel.attr('x1', d => d.source.x).attr('y1', d => d.source.y).attr('x2', d => d.target.x).attr('y2', d => d.target.y);
            nodeSel.attr('transform', d => 'translate(' + d.x + ',' + d.y + ')');
        }

        function update() {
            const { N, L } = graph();
            linkSel = linkSel.data(L, d => (d.source.id || d.source) + '>' + (d.target.id || d.target));
            linkSel.exit().remove();
            linkSel = linkSel.enter().append('line').attr('class', 'tree-link').merge(linkSel);

            nodeSel = nodeSel.data(N, d => d.id);
            nodeSel.exit().remove();
            const enter = nodeSel.enter().append('g')
                .attr('class', d => 'tree-node tn-' + d.kind)
                .style('color', d => d.kind === 'root' ? 'var(--accent-1)' : color(d.category))
                .call(drag());
            enter.append('circle').attr('fill', 'currentColor');
            enter.append('text').attr('class', 'tree-label').attr('dy', '0.32em')
                .text(d => d.kind === 'cat' ? d.label + ' (' + d.children.length + ')' : d.label);
            enter.append('title').text(d => d.label);
            enter.on('click', (e, d) => {
                e.stopPropagation();
                if (d.kind === 'cat') { d.expanded = !d.expanded; update(); }
                else if (d.kind === 'model') { openModal(d.model); }
                else { const any = catData.some(c => c.expanded); catData.forEach(c => c.expanded = !any); update(); }
            });
            nodeSel = enter.merge(nodeSel);
            nodeSel.select('circle').attr('r', radius);
            nodeSel.select('.tree-label').attr('x', d => radius(d) + 5);
            nodeSel.classed('expanded', d => d.kind === 'cat' && d.expanded);

            sim.nodes(N);
            sim.force('link').links(L);
            sim.alpha(0.9).restart();
        }

        root.fx = width / 2; root.fy = height / 2;
        update();
    }

    // Swimlane timeline: one horizontal track per category, dots placed by date,
    // labels staggered above/below to avoid overlap, dashed year gridlines.
    function renderSwimlane(data) {
        const items = [];
        data.forEach(cat => cat.models.forEach(m => {
            const iso = m.date || (m.year ? m.year + '-01-01' : '');
            const parts = iso.split('-').map(Number);
            const y = parts[0], mo = parts[1] || 1, d = parts[2] || 1;
            if (!y) return;
            items.push({ m, category: cat.category, frac: y + ((mo - 1) * 30 + (d - 1)) / 365, iso });
        }));
        container.innerHTML = '';
        if (!items.length) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="ph ph-ghost" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>No models found</h3><p>Try adjusting your search or filters.</p>
                </div>`;
            return;
        }

        const lanes = Object.keys(SPIRAL_COLORS).filter(c => items.some(it => it.category === c));
        data.forEach(cat => { if (cat.models.length && !lanes.includes(cat.category) && items.some(it => it.category === cat.category)) lanes.push(cat.category); });
        const minYear = Math.floor(Math.min(...items.map(i => i.frac)));
        const maxYear = Math.floor(Math.max(...items.map(i => i.frac)));
        const domainMax = maxYear + 1;
        const span = domainMax - minYear;

        const padX = 28, yearW = 340, axisH = 34;
        const baseGap = 13, levelH = 15, gap = 9, textH = 11, sidePad = 10, minHalf = 22;
        const plotW = padX * 2 + span * yearW;
        const xOf = frac => padX + (frac - minYear) * yearW;

        // Layout pass: pack labels per lane, then size each lane to exactly the
        // vertical space its own labels use (so sparse lanes stay compact).
        const laneLayouts = lanes.map(cat => {
            const laneItems = items.filter(it => it.category === cat).sort((a, b) => a.frac - b.frac);
            const aboveRight = [], belowRight = [];
            const placed = laneItems.map((it, k) => {
                const x = xOf(it.frac);
                const labelLeft = x + 7;
                const labelRight = labelLeft + it.m.name.length * 6.4 + 8;
                const side = (k % 2 === 0) ? 'above' : 'below';
                const arr = side === 'above' ? aboveRight : belowRight;
                let level = 0;
                while (level < arr.length && arr[level] + gap > labelLeft) level++;
                arr[level] = labelRight;
                return { it, x, labelLeft, side, level };
            });
            const aboveH = Math.max(minHalf, (aboveRight.length ? baseGap + (aboveRight.length - 1) * levelH + textH : 0) + sidePad);
            const belowH = Math.max(minHalf, (belowRight.length ? baseGap + (belowRight.length - 1) * levelH + textH : 0) + sidePad);
            return { cat, placed, aboveH, belowH, height: aboveH + belowH, count: laneItems.length };
        });

        let runningY = axisH;
        laneLayouts.forEach(L => { L.top = runningY; L.trackY = runningY + L.aboveH; runningY += L.height; });
        const totalH = runningY;

        let svg = `<svg class="swim-svg" width="${plotW}" height="${totalH}" viewBox="0 0 ${plotW} ${totalH}">`;
        for (let yr = minYear; yr <= domainMax; yr++) {
            const x = xOf(yr);
            svg += `<line class="swim-grid" x1="${x}" y1="${axisH - 8}" x2="${x}" y2="${totalH}" />`;
            if (yr <= maxYear) svg += `<text class="swim-year" x="${x + 8}" y="${axisH - 14}">${yr}</text>`;
        }
        laneLayouts.forEach((L, i) => {
            if (i) svg += `<line class="swim-sep" x1="0" y1="${L.top}" x2="${plotW}" y2="${L.top}" />`;
            svg += `<line class="swim-track" x1="${padX}" y1="${L.trackY}" x2="${plotW - padX}" y2="${L.trackY}" stroke="${spiralColor(L.cat)}" />`;
        });

        const flat = [];
        laneLayouts.forEach(L => {
            const cclr = spiralColor(L.cat);
            L.placed.forEach(p => {
                const off = baseGap + p.level * levelH;
                const ly = p.side === 'above' ? L.trackY - off : L.trackY + off;
                const idx = flat.length;
                svg += `<g class="swim-item" data-idx="${idx}">`
                    + `<line class="swim-leader" x1="${p.x}" y1="${L.trackY}" x2="${p.x}" y2="${p.side === 'above' ? ly + 3 : ly - 3}" stroke="${cclr}"/>`
                    + `<circle class="swim-dot" cx="${p.x}" cy="${L.trackY}" r="5" fill="${cclr}"/>`
                    + `<text class="swim-label" x="${p.labelLeft}" y="${ly}" dominant-baseline="${p.side === 'above' ? 'auto' : 'hanging'}">${escapeHtml(p.it.m.name)}</text>`
                    + `</g>`;
                flat.push(p.it);
            });
        });
        svg += `</svg>`;

        const laneLabels = laneLayouts.map(L =>
            `<div class="swim-lane-label" style="height:${L.height}px">`
            + `<span class="swim-lane-dot" style="background:${spiralColor(L.cat)}"></span>`
            + `<span class="swim-lane-name">${L.cat}</span>`
            + `<span class="swim-lane-count">${L.count}</span>`
            + `</div>`).join('');

        container.innerHTML = `
          <div class="swim-view">
            <div class="swim-hint"><i class="ph ph-hand-pointing"></i> Scroll horizontally · each dot is a paper (color = category) · click a dot for details</div>
            <div class="swim-body">
              <div class="swim-lanes"><div class="swim-lane-head" style="height:${axisH}px"></div>${laneLabels}</div>
              <div class="swim-scroll">${svg}</div>
            </div>
          </div>`;

        const svgEl = container.querySelector('.swim-svg');
        if (svgEl) svgEl.addEventListener('click', e => {
            const g = e.target.closest('.swim-item');
            if (g) openModal(flat[+g.dataset.idx].m);
        });
    }

    function render(data) {
        container.innerHTML = '';
        if (currentView === 'timeline') { renderTimeline(data); return; }
        if (currentView === 'swimlane') { renderSwimlane(data); return; }
        if (currentView === 'tree') { renderTree(data); return; }
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

                    tr.querySelector('.expand-btn').addEventListener('click', () => openModal(model));

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
                return haystack.includes(searchTerm) && modelPassesFacets(m);
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

    // Contribute button: explain how to add a paper via a pull request on data.js.
    const REPO = 'https://github.com/researchsubmissions66/Agentic-AI-CPath';
    const contributeBtn = document.getElementById('contributeBtn');
    if (contributeBtn) {
        contributeBtn.addEventListener('click', () => {
            let ov = document.getElementById('contribOverlay');
            if (!ov) {
                const example = [
                    '{',
                    '  "name": "YourAgent",',
                    '  "year": 2026,',
                    '  "date": "2026-01-15",',
                    '  "idea": "One-sentence key idea of the agent/method",',
                    '  "paper": "https://arxiv.org/abs/2601.00000",',
                    '  "github": "https://github.com/...",',
                    '  "website": "https://...",',
                    '  "hf": "https://huggingface.co/..."',
                    '}'
                ].join('\n');
                ov = document.createElement('div');
                ov.id = 'contribOverlay';
                ov.className = 'contrib-overlay';
                ov.innerHTML =
                    '<div class="contrib-panel">' +
                        '<div class="contrib-head"><h3><i class="ph ph-git-pull-request"></i> Contribute a paper</h3><button class="close-contrib" aria-label="Close">&times;</button></div>' +
                        '<div class="contrib-body">' +
                            '<p>The whole catalog is generated from a single file, <code>data.js</code> — each entry is one object inside its category\'s array. Adding a paper is a small edit plus a pull request:</p>' +
                            '<ol class="contrib-steps">' +
                                '<li><strong>Open <code>data.js</code></strong> and find the category array your paper belongs to.</li>' +
                                '<li><strong>Add an entry</strong> in the existing format (example below). Only <code>name</code>, <code>year</code>, <code>idea</code> and <code>paper</code> are required — everything else is optional.</li>' +
                                '<li><strong>(Optional)</strong> run <code>node sync.js</code> to regenerate <code>README.md</code> and <code>references.bib</code>.</li>' +
                                '<li><strong>Open a pull request</strong> — done. The site rebuilds itself from <code>data.js</code>.</li>' +
                            '</ol>' +
                            '<pre class="contrib-code">' + example.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</pre>' +
                            '<div class="contrib-actions">' +
                                '<a href="' + REPO + '/edit/main/data.js" target="_blank" class="action-btn action-btn-primary"><i class="ph ph-pencil-simple"></i> Edit data.js</a>' +
                                '<a href="' + REPO + '/blob/main/data.js" target="_blank" class="action-btn"><i class="ph ph-file-code"></i> View data.js</a>' +
                                '<a href="' + REPO + '/pulls" target="_blank" class="action-btn"><i class="ph ph-git-pull-request"></i> Pull requests</a>' +
                            '</div>' +
                            '<p class="contrib-note"><i class="ph ph-info"></i> New to GitHub? The <strong>Edit data.js</strong> button opens GitHub\'s in-browser editor and will offer to fork the repo and open the pull request for you automatically.</p>' +
                        '</div>' +
                    '</div>';
                document.body.appendChild(ov);
                const close = () => { ov.classList.remove('open'); document.body.style.overflow = ''; };
                ov.addEventListener('click', e => { if (e.target === ov) close(); });
                ov.querySelector('.close-contrib').addEventListener('click', close);
                document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
            }
            ov.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }

    buildFacetPanel();
    render(modelData);
});
