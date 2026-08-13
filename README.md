# Agentic AI in Computational Pathology

### 🌐 [**Explore the interactive website →**](https://researchsubmissions66.github.io/Agentic-AI-CPath/)

A comprehensive, curated summary of agentic AI systems, LLM agents, and copilots for computational pathology. This repository contains the source code for an interactive web viewer of this taxonomy.

## 💬 Interactive Copilots & Assistants

| System | Year | Backbone / Data | Key Idea | Resources |
|---|---|---|---|---|
| **PathChat** | 2024 | 456K instructions | Multimodal generative AI copilot for pathology (vision encoder + LLM); fine-tuned on 456K visual-language instructions (999K Q&A turns) for diagnostic Q&A | [Paper](https://arxiv.org/abs/2312.07814) |
| **SlideChat** | 2025 | WSI instruction data | Large vision-language assistant for whole-slide image understanding; slide-level VQA, description and reasoning | [Paper](https://arxiv.org/abs/2410.11761) |
| **TeamPath** | 2025 | RL + router copilot | RL and router-enhanced multimodal pathology copilots for expert-level diagnosis, patch summarization, and cross-modality (transcriptomic) generation | [Paper](https://arxiv.org/abs/2511.17652) |

---

## 🧠 Reasoning & Diagnostic Agents

| System | Year | Backbone / Data | Key Idea | Resources |
|---|---|---|---|---|
| **CPathAgent** | 2025 | Agent-based FM | Agent-based foundation model that mimics pathologists' zoom-in/out navigation for interpretable high-resolution analysis (patch/region/WSI unified) | [Paper](https://arxiv.org/abs/2505.20510) |
| **Pathology-CoT** | 2025 | Visual CoT agent | Visual chain-of-thought agent learned from expert WSI diagnosis behavior (AI Session Recorder + Pathology-o3 agent) | [Paper](https://arxiv.org/abs/2510.04587) |
| **PathAgent** | 2025 | LLM agentic reasoning | LLM-based agentic reasoning for interpretable whole-slide pathology analysis via tool-use and step-wise reasoning | [Paper](https://arxiv.org/abs/2511.17052) |
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
| **PathFinder** | 2025 | Multi-agent diagnosis | Multi-modal multi-agent system for medical diagnostic decision-making applied to histopathology | [Paper](https://arxiv.org/abs/2502.08916) |
| **Evidence-based Copilot** | 2025 | Multi-agent copilot | Evidence-based diagnostic reasoning with a multi-agent copilot for human pathology | [Paper](https://arxiv.org/abs/2506.20964) |
| **WSI-Agents** | 2025 | Collaborative multi-agent | Collaborative multi-agent system for multimodal whole-slide image analysis | [Paper](https://arxiv.org/abs/2507.14680) |
| **Co-evolving Agentic System** | 2025 | Multi-agent medical imaging | Co-evolving multi-agent AI system for medical imaging analysis (including pathology); agents improve through interaction | [Paper](https://arxiv.org/abs/2509.20279) |
| **NOVA** | 2025 | Agentic analysis framework | Agentic framework for automated histopathology analysis and scientific discovery, orchestrating tools/agents over pathology data | [Paper](https://arxiv.org/abs/2511.11324) |
| **SurvAgent** | 2025 | CoT multi-agent | Hierarchical CoT multi-agent system with case banking and dichotomy-based reasoning for multimodal survival prediction | [Paper](https://arxiv.org/abs/2511.16635) |
| **PPGL-Swarm** | 2026 | PPGL agent swarm | Decomposes PPGL diagnosis into microtasks for specialized agents; RL improves tool selection; produces GAPP scoring, genotype-risk alerts and multimodal reports | [Paper](https://arxiv.org/abs/2603.21700) |
| **EndoGov** | 2026 | Governed specialist agents | Specialist agents (pathology/molecular/clinical) extract evidence independently; a governance agent queries a guideline knowledge graph and applies executable clinical rules (endometrial cancer risk) | [Paper](https://arxiv.org/abs/2604.23802) |
| **PathPocket** | 2026 | Hypergraph evidence agents | Collaborative agents: input understanding -> evidence retrieval -> filtering -> diagnosis, grounded in a pathology hypergraph (>4.55M entities, >7.10M relations); text/ROI/WSI inputs | [Paper](https://arxiv.org/abs/2606.08093) |

---

## 🛠️ Tool-Use & Retrieval Agents

| System | Year | Backbone / Data | Key Idea | Resources |
|---|---|---|---|---|
| **Patho-AgenticRAG** | 2025 | Agentic RAG (RL) | Multimodal agentic retrieval-augmented generation for pathology VLMs, trained via reinforcement learning | [Paper](https://arxiv.org/abs/2508.02258) |
| **Auditable Neuro-Symbolic** | 2026 | SQL tool-use agents | Feature Reasoning Agents generate and execute SQL over measured cellular features; a Knowledge Comparison Agent checks findings against pathology knowledge (executable tool use) | [Paper](https://arxiv.org/abs/2601.01875) |
| **LAMMI-Pathology** | 2026 | Tool-centric LVLM-agent | Tool-centric bottom-up LVLM-agent framework for molecularly informed medical intelligence in pathology | [Paper](https://arxiv.org/abs/2602.18773) |
| **PathoSage** | 2026 | Tool-reliability agent | Collects evidence from multiple tools/knowledge sources, adjudicates disagreements, and learns Beta-Bernoulli tool-reliability estimates so past experience shapes future tool use | [Paper](https://arxiv.org/abs/2606.07549) |

---

## 🔬 Autonomous Discovery & Research

| System | Year | Backbone / Data | Key Idea | Resources |
|---|---|---|---|---|
| **SAGE** | 2026 | Hypothesis gen + eval | Structured Agentic system for hypothesis Generation and Evaluation; agents perform literature-grounded contextualization and empirical validation to discover interpretable biomarkers | [Paper](https://arxiv.org/abs/2602.00953) |
| **Agentic Discovery** | 2026 | Autonomous discovery agents | Agentic framework for autonomous scientific discovery in cancer pathology (Nature Medicine) | [Paper](https://www.nature.com/articles/s41591-026-04357-y) |
| **PathLab** | 2026 | Autonomous workflow agent | Takes a natural-language CPath research objective and autonomously constructs, executes and validates an analytical workflow using pathology tools; evaluated across 12 datasets | [Paper](https://arxiv.org/abs/2606.20677) |

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
