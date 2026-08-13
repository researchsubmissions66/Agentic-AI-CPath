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

    // Helper to get family tag info based on category
    function getFamilyInfo(category) {
        const catLower = category.toLowerCase();
        if (catLower.includes('copilot') || catLower.includes('assistant')) return { text: 'copilot', color: 'purple' };
        if (catLower.includes('reasoning') || catLower.includes('diagnostic')) return { text: 'agent', color: 'blue' };
        if (catLower.includes('multi-agent')) return { text: 'multi-agent', color: 'teal' };
        if (catLower.includes('tool') || catLower.includes('retrieval')) return { text: 'tool-use', color: 'green' };
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
            { key: 'stains', label: 'Stain', icon: 'ph-drop' },
            { key: 'audit_organs', label: 'Organ / Tissue site', icon: 'ph-tree' },
            { key: 'audit_cohorts', label: 'Institution', icon: 'ph-buildings' },
            { key: 'audit_downstream', label: 'Downstream tasks', icon: 'ph-list-checks' }
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

        let rowsHtml = '';

        const fields = [
            { label: 'Pretraining WSIs', value: model.audit_wsis },
            { label: 'Patches / tiles', value: model.audit_patches },
            { label: 'Image-text pairs', value: model.audit_image_text },
            { label: 'WSI-report pairs', value: model.audit_wsi_report },
            { label: 'Image-omics pairs', value: model.audit_image_omics },
            { label: 'Dataset notes', value: model.audit_notes }
        ];

        fields.forEach(field => {
            if (isMeaningful(field.value)) {
                rowsHtml += `<tr><th>${field.label}</th><td>${formatField(field.value)}</td></tr>`;
            }
        });

        const tableBlock = rowsHtml ? `<table class="modal-table"><tbody>${rowsHtml}</tbody></table>` : '';

        if (!facetsBlock && !tableBlock) {
            modalBody.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">No detailed metadata found for this model.</p>';
        } else {
            modalBody.innerHTML = facetsBlock + tableBlock;
        }

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

    // Timeline view: all (filtered) entries in one chronological stream by exact date.
    function renderTimeline(data) {
        const items = [];
        data.forEach(cat => cat.models.forEach(m => items.push({ m, family: getFamilyInfo(cat.category) })));
        if (!items.length) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="ph ph-ghost" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>No entries found</h3><p>Try adjusting your search or filters.</p>
                </div>`;
            return;
        }
        items.sort((a, b) => (a.m.date || '').localeCompare(b.m.date || ''));
        const timeline = document.createElement('div');
        timeline.className = 'timeline';
        let lastYear = null;
        items.forEach(({ m, family }) => {
            const yr = (m.date || '').slice(0, 4) || String(m.year);
            if (yr !== lastYear) {
                lastYear = yr;
                const yearEl = document.createElement('div');
                yearEl.className = 'timeline-year';
                yearEl.textContent = yr;
                timeline.appendChild(yearEl);
            }
            let linksHTML = '';
            if (m.paper) linksHTML += `<a href="${m.paper}" target="_blank" class="icon-link paper" title="Paper"><i class="ph ph-file-text"></i></a>`;
            if (m.github) linksHTML += `<a href="${m.github}" target="_blank" class="icon-link github" title="Code"><i class="ph ph-github-logo"></i></a>`;
            if (m.hf) linksHTML += `<a href="${m.hf}" target="_blank" class="icon-link hf" title="Model"><i class="ph ph-cube"></i></a>`;
            if (m.dataset) linksHTML += `<a href="${m.dataset}" target="_blank" class="icon-link dataset" title="Dataset"><i class="ph ph-database"></i></a>`;
            if (m.website) linksHTML += `<a href="${m.website}" target="_blank" class="icon-link website" title="Website"><i class="ph ph-globe"></i></a>`;

            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.innerHTML = `
                <div class="timeline-date">${formatDate(m.date) || m.year}</div>
                <div class="timeline-card">
                    <div class="timeline-card-head">
                        <span class="model-name">${m.name}</span>
                        <span class="tag tag-${m.tag_color || family.color}">${m.tag || m.type || family.text}</span>
                    </div>
                    <div class="timeline-idea">${preferAudit(m.audit_notes, m.idea)}</div>
                    <div class="timeline-links">${linksHTML}${variantChips(m)}<button class="timeline-expand" title="Detailed Metadata"><i class="ph ph-arrows-out-simple"></i></button></div>
                </div>`;
            item.querySelector('.timeline-expand').addEventListener('click', () => openModal(m));
            timeline.appendChild(item);
        });
        container.appendChild(timeline);
    }

    // Render Data
    function render(data) {
        container.innerHTML = '';
        if (currentView === 'timeline') { renderTimeline(data); return; }
        let hasResults = false;

        data.forEach(categoryGroup => {
            if (categoryGroup.models.length === 0) return;
            hasResults = true;

            const section = document.createElement('div');
            section.className = 'category-section';

            const title = document.createElement('h2');
            title.className = 'category-title';
            title.textContent = categoryGroup.category;
            section.appendChild(title);

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
                    if (model.hf) linksHTML += `<a href="${model.hf}" target="_blank" class="icon-link hf" title="Hugging Face Model"><i class="ph ph-cube"></i></a>`;
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
