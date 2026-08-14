# Agentic AI in Computational Pathology

### 🌐 [**Explore the interactive website →**](https://researchsubmissions66.github.io/Agentic-AI-CPath/)

A comprehensive, curated summary of agentic AI systems, LLM agents, and copilots for computational pathology. This repository contains the source code for an interactive web viewer of this taxonomy.

## 💬 Interactive Copilots & Assistants

| System | Year | Backbone / Data | Key Idea | Resources |
|---|---|---|---|---|
| **PathChat** | 2024 | 456K instructions | Multimodal generative AI copilot for pathology (vision encoder + LLM); fine-tuned on 456K visual-language instructions (999K Q&A turns) for diagnostic Q&A | [Paper](https://arxiv.org/abs/2312.07814) • [Code](https://github.com/superjamessyx/Generative-Foundation-AI-Assistant-for-Pathology) • [Website](https://www.modella.ai/pathchat) |
| **SlideChat** | 2025 | WSI instruction data | Large vision-language assistant for whole-slide image understanding; slide-level VQA, description and reasoning | [Paper](https://arxiv.org/abs/2410.11761) • [Code](https://github.com/uni-medical/SlideChat) • [Website](https://uni-medical.github.io/SlideChat.github.io/) |
| **SmartPath-R1** | 2025 | Multiscale MoE co-pilot | Versatile reasoning-enhanced pathology co-pilot handling both ROI- and WSI-level tasks via scale-dependent supervised fine-tuning, task-aware reinforcement fine-tuning and a mixture-of-experts (2.3M ROI + 188K WSI instructions; 72 tasks) — no explicit CoT supervision | [Paper](https://arxiv.org/abs/2507.17303) |
| **TeamPath** | 2025 | RL + router copilot | RL and router-enhanced multimodal pathology copilots for expert-level diagnosis, patch summarization, and cross-modality (transcriptomic) generation | [Paper](https://arxiv.org/abs/2511.17652) • [Code](https://github.com/HelloWorldLTY/TeamPath) |

---

## 🧠 Reasoning & Diagnostic Agents

| System | Year | Backbone / Data | Key Idea | Resources |
|---|---|---|---|---|
| **Patho-R1** | 2025 | RL reasoner (GRPO/DAPO) | Multimodal RL-based pathology expert reasoner trained in three stages — continued pretraining (3.5M image-text pairs) → CoT supervised fine-tuning (500K) → RL with GRPO and DAPO; paired with PathoCLIP for zero-shot classification, cross-modal retrieval, VQA and MCQ | [Paper](https://arxiv.org/abs/2505.11404) • [Code](https://github.com/Wenchuan-Zhang/Patho-R1) |
| **CPathAgent** | 2025 | Agent-based FM | Agent-based foundation model that mimics pathologists' zoom-in/out navigation for interpretable high-resolution analysis (patch/region/WSI unified) | [Paper](https://arxiv.org/abs/2505.20510) |
| **Pathology-CoT** | 2025 | Visual CoT agent | Visual chain-of-thought agent learned from expert WSI diagnosis behavior (AI Session Recorder + Pathology-o3 agent) | [Paper](https://arxiv.org/abs/2510.04587) • [Code](https://github.com/zhihuanglab/Pathology-CoT) |
| **PathAgent** | 2025 | LLM agentic reasoning | LLM-based agentic reasoning for interpretable whole-slide pathology analysis via tool-use and step-wise reasoning | [Paper](https://arxiv.org/abs/2511.17052) • [Code](https://github.com/G14nTDo4/PathAgent) |
| **PathReasoning** | 2025 | ROI-navigation agent | Multimodal reasoning agent for query-based ROI navigation on whole-slide images | [Paper](https://arxiv.org/abs/2511.21902) |
| **PathFound** | 2025 | Agentic multimodal model | Agentic multimodal model activating evidence-seeking pathological diagnosis | [Paper](https://arxiv.org/abs/2512.23545) |
| **MLLM-HWSI** | 2026 | Hierarchical WSI MLLM | Multimodal LLM for hierarchical whole-slide image understanding across magnifications | [Paper](https://arxiv.org/abs/2603.23067) |

---

## 🧭 Navigation & Active-Perception Agents

| System | Year | Backbone / Data | Key Idea | Resources |
|---|---|---|---|---|
| **GIANT** | 2025 | Training-free LMM navigator | General-purpose LMM that pans, zooms, selects crops and reasons iteratively over WSIs (training-free); introduces the MultiPathQA benchmark (934 questions / 868 WSIs) | [Paper](https://arxiv.org/abs/2511.19652) |
| **MMNavAgent** | 2026 | Cross-magnification navigator | Cross-magnification navigation + magnification-selection tools with memory-driven reasoning to decide where and at what magnification to inspect next | [Paper](https://arxiv.org/abs/2603.02079) |
| **PathNavigate** | 2026 | Training-free scan-search | Training-free Scan -> Search -> Readout agent; builds a slide-specific surprise map with shared memory, then question-conditioned PLIP retrieval to pick regions for high-res inspection | [Paper](https://arxiv.org/abs/2605.23559) |
| **BEACON** | 2026 | Bayesian active perception | Maintains a Bayesian belief over competing diagnoses and picks the next patch by expected information gain; an evidence controller decides to answer, acquire, or zoom (training-free) | [Paper](https://arxiv.org/abs/2608.05757) |
| **AdaptivePath** | 2026 | Learned active navigator | A learned Navigator (PPO) decides where and at what scale to observe, then Morphology Interpreter -> Deliberator -> Arbiter; uses pathologist-reviewed abnormal-region labels | [Paper](https://arxiv.org/abs/2608.08648) |

---

## 🤝 Multi-Agent Systems

| System | Year | Backbone / Data | Key Idea | Resources |
|---|---|---|---|---|
| **PathFinder** | 2025 | Multi-agent diagnosis | Multi-modal multi-agent system for medical diagnostic decision-making applied to histopathology | [Paper](https://arxiv.org/abs/2502.08916) • [Website](https://pathfinder-dx.github.io/) |
| **Evidence-based Copilot** | 2025 | Multi-agent copilot | Evidence-based diagnostic reasoning with a multi-agent copilot for human pathology | [Paper](https://arxiv.org/abs/2506.20964) |
| **WSI-Agents** | 2025 | Collaborative multi-agent | Collaborative multi-agent system for multimodal whole-slide image analysis | [Paper](https://arxiv.org/abs/2507.14680) • [Code](https://github.com/CVI-SZU/WSI-Agents) |
| **Co-evolving Agentic System** | 2025 | Multi-agent medical imaging | Co-evolving multi-agent AI system for medical imaging analysis (including pathology); agents improve through interaction | [Paper](https://arxiv.org/abs/2509.20279) |
| **NOVA** | 2025 | Agentic analysis framework | Agentic framework for automated histopathology analysis and scientific discovery, orchestrating tools/agents over pathology data | [Paper](https://arxiv.org/abs/2511.11324) • [Code](https://github.com/microsoft/nova-agent) |
| **SurvAgent** | 2025 | CoT multi-agent | Hierarchical CoT multi-agent system with case banking and dichotomy-based reasoning for multimodal survival prediction | [Paper](https://arxiv.org/abs/2511.16635) |
| **PPGL-Swarm** | 2026 | PPGL agent swarm | Decomposes PPGL diagnosis into microtasks for specialized agents; RL improves tool selection; produces GAPP scoring, genotype-risk alerts and multimodal reports | [Paper](https://arxiv.org/abs/2603.21700) |
| **BUC AI-Agent** | 2026 | Routing multi-agent (path+CT) | Clinical multi-agent system for bladder urothelial carcinoma prognosis: a routing engine dispatches among pathology-report standardization, CT segmentation, WSI analysis, phenotype maps and prognostic models (MATCH-Net fusion; 1,185 patients across 4 centers) | [Paper](https://www.nature.com/articles/s41698-026-01415-z) |
| **EndoGov** | 2026 | Governed specialist agents | Specialist agents (pathology/molecular/clinical) extract evidence independently; a governance agent queries a guideline knowledge graph and applies executable clinical rules (endometrial cancer risk) | [Paper](https://arxiv.org/abs/2604.23802) |
| **PathPocket** | 2026 | Hypergraph evidence agents | Collaborative agents: input understanding -> evidence retrieval -> filtering -> diagnosis, grounded in a pathology hypergraph (>4.55M entities, >7.10M relations); text/ROI/WSI inputs | [Paper](https://arxiv.org/abs/2606.08093) |

---

## 🛠️ Tool-Use & Retrieval Agents

| System | Year | Backbone / Data | Key Idea | Resources |
|---|---|---|---|---|
| **Patho-AgenticRAG** | 2025 | Agentic RAG (RL) | Multimodal agentic retrieval-augmented generation for pathology VLMs, trained via reinforcement learning | [Paper](https://arxiv.org/abs/2508.02258) • [Code](https://github.com/Wenchuan-Zhang/Patho-AgenticRAG) |
| **Auditable Neuro-Symbolic** | 2026 | SQL tool-use agents | Feature Reasoning Agents generate and execute SQL over measured cellular features; a Knowledge Comparison Agent checks findings against pathology knowledge (executable tool use) | [Paper](https://arxiv.org/abs/2601.01875) |
| **LAMMI-Pathology** | 2026 | Tool-centric LVLM-agent | Tool-centric bottom-up LVLM-agent framework for molecularly informed medical intelligence in pathology | [Paper](https://arxiv.org/abs/2602.18773) |
| **Digepath** | 2026 | GPT-4o + DigeTools | End-to-end GI-pathology agent: GPT-4o orchestrates a DigeTools library over a WSI (feature extraction -> tumor detection -> subtype identification -> ROI selection -> report generation) through multi-turn dialogue | [Paper](https://www.nature.com/articles/s41746-026-02684-5) |
| **PathoTool** | 2026 | Confidence-gated tool use | Tool-using diagnostic agent that performs H&E diagnosis, estimates its own confidence, and only when confidence is insufficient calls a virtual-staining/IHC tool to acquire extra evidence, then integrates H&E and virtual-IHC to finalize the diagnosis (ACL ARR May 2026 submission) |  |
| **PathoSage** | 2026 | Tool-reliability agent | Collects evidence from multiple tools/knowledge sources, adjudicates disagreements, and learns Beta-Bernoulli tool-reliability estimates so past experience shapes future tool use | [Paper](https://arxiv.org/abs/2606.07549) |

---

## 🔬 Autonomous Discovery & Research

| System | Year | Backbone / Data | Key Idea | Resources |
|---|---|---|---|---|
| **SAGE** | 2026 | Hypothesis gen + eval | Structured Agentic system for hypothesis Generation and Evaluation; agents perform literature-grounded contextualization and empirical validation to discover interpretable biomarkers | [Paper](https://arxiv.org/abs/2602.00953) |
| **ROSIE** | 2026 | LLM biomarker orchestration | LLMs orchestrate modular biomarker inference and spatiotemporal reasoning directly over routine H&E to reconstruct immune/stromal evolution in pancreatic cancer (~10.4M single-cell profiles; immune-surveillance -> exhaustion -> stromal-dominant states) | [Paper](https://www.biorxiv.org/content/10.64898/2026.04.20.719684v1) |
| **Agentic Discovery** | 2026 | Autonomous discovery agents | Agentic framework for autonomous scientific discovery in cancer pathology (Nature Medicine) | [Paper](https://www.nature.com/articles/s41591-026-04357-y) |
| **PathLab** | 2026 | Autonomous workflow agent | Takes a natural-language CPath research objective and autonomously constructs, executes and validates an analytical workflow using pathology tools; evaluated across 12 datasets | [Paper](https://arxiv.org/abs/2606.20677) |
| **DERMA-Agent** | 2026 | CodeAct discovery agent | CodeAct-style Perception–Action loop over WSIs: generates biological hypotheses, writes and executes statistical code in a sandbox, evaluates survival associations across pan-cancer TCGA cohorts and revises analyses (grounded in a biological Knowledge Fabric) | [Paper](https://www.researchsquare.com/article/rs-10428278/v1) |

---

## 🧬 Agentic Image–Omics Reasoning

| System | Year | Backbone / Data | Key Idea | Resources |
|---|---|---|---|---|
| **Agent SPI-WSI** | 2025 | Iterative prompt refinement | Human-in-the-loop agent that iteratively generates -> evaluates -> critiques -> refines natural-language prompts to spatially infer bulk-RNA pathway activity on WSIs (pathologist-in-the-loop; CONCH scoring, PubMed cross-check) | [Paper](https://www.biorxiv.org/content/10.1101/2025.10.16.682972v1) |

---

## 📝 Report Generation Agents

| System | Year | Backbone / Data | Key Idea | Resources |
|---|---|---|---|---|
| **QCAgent** | 2026 | Checklist-critique report agent | Generates a report, critiques it against a user-defined diagnostic checklist, re-searches the WSI for missing evidence, and iteratively revises | [Paper](https://arxiv.org/abs/2603.01647) |

---

## 📊 Benchmarks & Evaluation

| Name | Year | Scope | Key Contribution | Resources |
|---|---|---|---|---|
| **PathAgentBench** | 2026 | Evidence-seeking VLM benchmark | Benchmark for evaluating evidence-seeking vision-language models on whole-slide pathology images | [Paper](https://arxiv.org/abs/2607.19261) |

---

## 📚 Surveys and Perspectives

| Paper | Year | Focus | Resources |
|---|---|---|---|
| **Landscape of CPath Agents** — *The Landscape of Computational Pathology Agents: From Static Analysis to Autonomous Diagnostic Workflows* | 2026 | Survey charting the field’s shift from static analysis to autonomous diagnostic workflows, taxonomizing computational-pathology agent architectures and capabilities | [Paper](https://www.techrxiv.org/doi/full/10.36227/techrxiv.176773877.76155111/v1) |
| **CPath in the Era of Agentic AI** — *Computational Pathology in the Era of Emerging Foundation and Agentic AI — International Expert Perspectives on Clinical Integration and Translational Readiness* | 2026 | International expert perspective connecting foundation- and agentic-AI capabilities to clinical integration — weighing technical maturity, operational readiness, and economic/regulatory context for real-world adoption | [Paper](https://arxiv.org/abs/2603.05884) |

---

## 📝 Citation

If you find this repository useful in your research, please consider citing it using the following BibTeX:

```bibtex
@misc{agenticcpath2026,
  author = {Anonymous Authors},
  title = {Agentic AI in Computational Pathology},
  year = {2026},
  publisher = {GitHub},
  journal = {GitHub repository},
  howpublished = {\url{https://github.com/researchsubmissions66/Agentic-AI-CPath}}
}
```
