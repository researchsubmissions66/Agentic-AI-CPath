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
| **PathAgent** | 2025 | LLM agentic reasoning | LLM-based agentic reasoning for interpretable whole-slide pathology analysis via tool-use and step-wise reasoning | [Paper](https://arxiv.org/abs/2511.17052) |
| **MLLM-HWSI** | 2026 | Hierarchical WSI MLLM | Multimodal LLM for hierarchical whole-slide image understanding across magnifications | [Paper](https://arxiv.org/abs/2603.23067) |
| **CPathAgent** | 2025 | Agent-based FM | Agent-based foundation model that mimics pathologists' zoom-in/out navigation for interpretable high-resolution analysis (patch/region/WSI unified) | [Paper](https://arxiv.org/abs/2505.20510) |
| **Pathology-CoT** | 2025 | Visual CoT agent | Visual chain-of-thought agent learned from expert WSI diagnosis behavior (AI Session Recorder + Pathology-o3 agent) | [Paper](https://arxiv.org/abs/2510.04587) |
| **PathReasoning** | 2025 | ROI-navigation agent | Multimodal reasoning agent for query-based ROI navigation on whole-slide images | [Paper](https://arxiv.org/abs/2511.21902) |
| **PathFound** | 2025 | Agentic multimodal model | Agentic multimodal model activating evidence-seeking pathological diagnosis | [Paper](https://arxiv.org/abs/2512.23545) |

---

## 🤝 Multi-Agent Systems

| System | Year | Backbone / Data | Key Idea | Resources |
|---|---|---|---|---|
| **Co-evolving Agentic System** | 2025 | Multi-agent medical imaging | Co-evolving multi-agent AI system for medical imaging analysis (including pathology); agents improve through interaction | [Paper](https://arxiv.org/abs/2509.20279) |
| **PathFinder** | 2025 | Multi-agent diagnosis | Multi-modal multi-agent system for medical diagnostic decision-making applied to histopathology | [Paper](https://arxiv.org/abs/2502.08916) |
| **Evidence-based Copilot** | 2025 | Multi-agent copilot | Evidence-based diagnostic reasoning with a multi-agent copilot for human pathology | [Paper](https://arxiv.org/abs/2506.20964) |
| **WSI-Agents** | 2025 | Collaborative multi-agent | Collaborative multi-agent system for multimodal whole-slide image analysis | [Paper](https://arxiv.org/abs/2507.14680) |
| **SurvAgent** | 2025 | CoT multi-agent | Hierarchical CoT multi-agent system with case banking and dichotomy-based reasoning for multimodal survival prediction | [Paper](https://arxiv.org/abs/2511.16635) |
| **Agentic Discovery** | 2026 | Autonomous discovery agents | Agentic framework for autonomous scientific discovery in cancer pathology (Nature Medicine) | [Paper](https://www.nature.com/articles/s41591-026-04357-y) |

---

## 🛠️ Tool-Use & Retrieval Agents

| System | Year | Backbone / Data | Key Idea | Resources |
|---|---|---|---|---|
| **Patho-AgenticRAG** | 2025 | Agentic RAG (RL) | Multimodal agentic retrieval-augmented generation for pathology VLMs, trained via reinforcement learning | [Paper](https://arxiv.org/abs/2508.02258) |
| **LAMMI-Pathology** | 2026 | Tool-centric LVLM-agent | Tool-centric bottom-up LVLM-agent framework for molecularly informed medical intelligence in pathology | [Paper](https://arxiv.org/abs/2602.18773) |

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
