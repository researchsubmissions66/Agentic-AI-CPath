const fs = require('fs');
const path = require('path');

// data.js exports `modelData` under Node (see the guard at the bottom of that file).
const modelData = require('./data.js');

const emojiMap = {
    "Interactive Copilots & Assistants": "💬",
    "Reasoning & Diagnostic Agents": "🧠",
    "Navigation & Active-Perception Agents": "🧭",
    "Multi-Agent Systems": "🤝",
    "Tool-Use & Retrieval Agents": "🛠️",
    "Autonomous Discovery & Research": "🔬",
    "Report Generation Agents": "📝",
    "Benchmarks & Evaluation": "📊",
    "Surveys and Perspectives": "📚"
};

function resources(m) {
    const res = [];
    if (m.paper) res.push(`[Paper](${m.paper})`);
    if (m.github) res.push(`[Code](${m.github})`);
    if (m.hf) res.push(`[Model](${m.hf})`);
    if (m.dataset) res.push(`[Dataset](${m.dataset})`);
    if (m.website) res.push(`[Website](${m.website})`);
    (m.variants || []).forEach(v => {
        const link = v.hf || v.paper;
        res.push(link ? `[${v.name}](${link})` : v.name);
    });
    return res.join(" • ");
}

let md = "# Agentic AI in Computational Pathology\n\n" +
    "### 🌐 [**Explore the interactive website →**](https://researchsubmissions66.github.io/Agentic-AI-CPath/)\n\n" +
    "A comprehensive, curated summary of agentic AI systems, LLM agents, and copilots for computational pathology. " +
    "This repository contains the source code for an interactive web viewer of this taxonomy.\n\n";

modelData.forEach(cat => {
    const emoji = emojiMap[cat.category] || "📌";
    md += `## ${emoji} ${cat.category}\n\n`;

    const isBenchmark = cat.category.includes("Benchmark");
    const isPaperList = cat.category.includes("Survey") || cat.category.includes("Perspective");

    if (isBenchmark) {
        md += "| Name | Year | Scope | Key Contribution | Resources |\n|---|---|---|---|---|\n";
        cat.models.forEach(m => {
            md += `| **${m.name}** | ${m.year} | ${m.data} | ${m.idea} | ${resources(m)} |\n`;
        });
    } else if (isPaperList) {
        md += "| Paper | Year | Focus | Resources |\n|---|---|---|---|\n";
        cat.models.forEach(m => {
            const title = m.paper_title ? ` — *${m.paper_title}*` : "";
            md += `| **${m.name}**${title} | ${m.year} | ${m.idea} | ${resources(m)} |\n`;
        });
    } else {
        md += "| System | Year | Backbone / Data | Key Idea | Resources |\n|---|---|---|---|---|\n";
        cat.models.forEach(m => {
            md += `| **${m.name}** | ${m.year} | ${m.data} | ${m.idea} | ${resources(m)} |\n`;
        });
    }
    md += "\n---\n\n";
});

md += "## 📝 Citation\n\n" +
    "If you find this repository useful in your research, please consider citing it using the following BibTeX:\n\n" +
    "```bibtex\n@misc{agenticcpath2026,\n  author = {Anonymous Authors},\n  title = {Agentic AI in Computational Pathology}," +
    "\n  year = {2026},\n  publisher = {GitHub},\n  journal = {GitHub repository}," +
    "\n  howpublished = {\\url{https://github.com/researchsubmissions66/Agentic-AI-CPath}}\n}\n```\n";

fs.writeFileSync(path.join(__dirname, 'README.md'), md);
console.log("README.md updated");

// --- references.bib: one entry per unique paper, deduped, keys disambiguated ---
const seenBib = new Map(); // bibtex content -> [model names]
modelData.forEach(cat => cat.models.forEach(m => {
    if (!m.bibtex) return;
    if (!seenBib.has(m.bibtex)) seenBib.set(m.bibtex, [m.name]);
    else seenBib.get(m.bibtex).push(m.name);
}));
const keyOf = c => (c.match(/^@\w+\{\s*([^,]+),/) || [, 'ref'])[1].trim();
const usedKeys = new Map();
let bibOut = "% Agentic AI in Computational Pathology - reference list\n" +
    "% Auto-generated from data.js by sync.js; one entry per unique paper.\n\n";
for (const [content, names] of seenBib) {
    let c = content, key = keyOf(c);
    if (usedKeys.has(key) && usedKeys.get(key) !== c) {
        let i = 2, nk;
        do { nk = `${key}_${i++}`; } while (usedKeys.has(nk));
        c = c.replace(/^(@\w+\{\s*)[^,]+,/, `$1${nk},`);
        key = nk;
    }
    usedKeys.set(key, c);
    bibOut += `% ${names.join(', ')}\n${c}\n\n`;
}
fs.writeFileSync(path.join(__dirname, 'references.bib'), bibOut);
console.log("references.bib updated");
