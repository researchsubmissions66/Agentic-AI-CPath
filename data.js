const modelData = [
  {
    "category": "Interactive Copilots & Assistants",
    "models": [
      {
        "name": "PathChat",
        "year": 2024,
        "date": "2023-12-13",
        "data": "456K instructions",
        "idea": "Multimodal generative AI copilot for pathology (vision encoder + LLM); fine-tuned on 456K visual-language instructions (999K Q&A turns) for diagnostic Q&A",
        "github": "https://github.com/superjamessyx/Generative-Foundation-AI-Assistant-for-Pathology",
        "hf": "",
        "website": "https://www.modella.ai/pathchat",
        "paper": "https://arxiv.org/abs/2312.07814",
        "bibtex": "@misc{lu2023foundationalmultimodalvisionlanguage,\n      title={A Foundational Multimodal Vision Language AI Assistant for Human Pathology}, \n      author={Ming Y. Lu and Bowen Chen and Drew F. K. Williamson and Richard J. Chen and Kenji Ikamura and Georg Gerber and Ivy Liang and Long Phi Le and Tong Ding and Anil V Parwani and Faisal Mahmood},\n      year={2023},\n      eprint={2312.07814},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2312.07814}, \n}",
        "paper_title": "A Foundational Multimodal Vision Language AI Assistant for Human Pathology",
        "paper_author": "Lu"
      },
      {
        "name": "SlideChat",
        "year": 2025,
        "date": "2024-10-15",
        "data": "WSI instruction data",
        "idea": "Large vision-language assistant for whole-slide image understanding; slide-level VQA, description and reasoning",
        "github": "https://github.com/uni-medical/SlideChat",
        "hf": "",
        "website": "https://uni-medical.github.io/SlideChat.github.io/",
        "paper": "https://arxiv.org/abs/2410.11761",
        "bibtex": "@misc{chen2025slidechatlargevisionlanguageassistant,\n      title={SlideChat: A Large Vision-Language Assistant for Whole-Slide Pathology Image Understanding}, \n      author={Ying Chen and Guoan Wang and Yuanfeng Ji and Yanjun Li and Jin Ye and Tianbin Li and Ming Hu and Rongshan Yu and Yu Qiao and Junjun He},\n      year={2025},\n      eprint={2410.11761},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2410.11761}, \n}",
        "paper_title": "SlideChat: A Large Vision-Language Assistant for Whole-Slide Pathology Image Understanding",
        "paper_author": "Chen"
      },
      {
        "name": "SmartPath-R1",
        "year": 2025,
        "date": "2025-07-23",
        "data": "Multiscale MoE co-pilot",
        "idea": "Versatile reasoning-enhanced pathology co-pilot handling both ROI- and WSI-level tasks via scale-dependent supervised fine-tuning, task-aware reinforcement fine-tuning and a mixture-of-experts (2.3M ROI + 188K WSI instructions; 72 tasks) — no explicit CoT supervision",
        "paper": "https://arxiv.org/abs/2507.17303",
        "bibtex": "@misc{xu2025versatilepathologycopilotreasoning,\n      title={A Versatile Pathology Co-pilot via Reasoning Enhanced Multimodal Large Language Model}, \n      author={Zhe Xu and Ziyi Liu and Junlin Hou and Jiabo Ma and Cheng Jin and Yihui Wang and Zhixuan Chen and Zhengyu Zhang and Fuxiang Huang and Zhengrui Guo and Fengtao Zhou and Yingxue Xu and Xi Wang and Ronald Cheong Kin Chan and Li Liang and Hao Chen},\n      year={2025},\n      eprint={2507.17303},\n      archivePrefix={arXiv},\n      primaryClass={eess.IV},\n      url={https://arxiv.org/abs/2507.17303}, \n}",
        "paper_title": "A Versatile Pathology Co-pilot via Reasoning Enhanced Multimodal Large Language Model",
        "paper_author": "Xu"
      },
      {
        "name": "TeamPath",
        "year": 2025,
        "date": "2025-11-20",
        "data": "RL + router copilot",
        "idea": "RL and router-enhanced multimodal pathology copilots for expert-level diagnosis, patch summarization, and cross-modality (transcriptomic) generation",
        "github": "https://github.com/HelloWorldLTY/TeamPath",
        "hf": "",
        "paper": "https://arxiv.org/abs/2511.17652",
        "bibtex": "@misc{liu2026teampathbuildingmultimodalpathology,\n      title={TeamPath: Building MultiModal Pathology Experts with Reasoning AI Copilots}, \n      author={Tianyu Liu and Weihao Xuan and Hao Wu and Peter Humphrey and Marcello DiStasio and Mohamed Kahila and Alfonso Garcia Tan and Heli Qi and Rui Yang and Simeng Han and Tinglin Huang and Fang Wu and Chen Liu and Qingyu Chen and Nan Liu and Irene Li and Hua Xu and Hongyu Zhao},\n      year={2026},\n      eprint={2511.17652},\n      archivePrefix={arXiv},\n      primaryClass={q-bio.QM},\n      url={https://arxiv.org/abs/2511.17652}, \n}",
        "paper_title": "TeamPath: Building MultiModal Pathology Experts with Reasoning AI Copilots",
        "paper_author": "Liu"
      }
    ]
  },
  {
    "category": "Reasoning & Diagnostic Agents",
    "models": [
      {
        "name": "Patho-R1",
        "year": 2025,
        "date": "2025-05-16",
        "data": "RL reasoner (GRPO/DAPO)",
        "idea": "Multimodal RL-based pathology expert reasoner trained in three stages — continued pretraining (3.5M image-text pairs) → CoT supervised fine-tuning (500K) → RL with GRPO and DAPO; paired with PathoCLIP for zero-shot classification, cross-modal retrieval, VQA and MCQ",
        "github": "https://github.com/Wenchuan-Zhang/Patho-R1",
        "paper": "https://arxiv.org/abs/2505.11404",
        "bibtex": "@misc{zhang2025pathor1multimodalreinforcementlearningbased,\n      title={Patho-R1: A Multimodal Reinforcement Learning-Based Pathology Expert Reasoner}, \n      author={Wenchuan Zhang and Penghao Zhang and Jingru Guo and Tao Cheng and Jie Chen and Shuwan Zhang and Zhang Zhang and Yuhao Yi and Hong Bu},\n      year={2025},\n      eprint={2505.11404},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2505.11404}, \n}",
        "paper_title": "Patho-R1: A Multimodal Reinforcement Learning-Based Pathology Expert Reasoner",
        "paper_author": "Zhang"
      },
      {
        "name": "CPathAgent",
        "year": 2025,
        "date": "2025-05-26",
        "data": "Agent-based FM",
        "idea": "Agent-based foundation model that mimics pathologists' zoom-in/out navigation for interpretable high-resolution analysis (patch/region/WSI unified)",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2505.20510",
        "bibtex": "@misc{sun2025cpathagentagentbasedfoundationmodel,\n      title={CPathAgent: An Agent-based Foundation Model for Interpretable High-Resolution Pathology Image Analysis Mimicking Pathologists' Diagnostic Logic}, \n      author={Yuxuan Sun and Yixuan Si and Chenglu Zhu and Kai Zhang and Zhongyi Shui and Bowen Ding and Tao Lin and Lin Yang},\n      year={2025},\n      eprint={2505.20510},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2505.20510}, \n}",
        "paper_title": "CPathAgent: An Agent-based Foundation Model for Interpretable High-Resolution Pathology Image Analysis Mimicking Pathologists' Diagnostic Logic",
        "paper_author": "Sun"
      },
      {
        "name": "Pathology-CoT",
        "year": 2025,
        "date": "2025-10-06",
        "data": "Visual CoT agent",
        "idea": "Visual chain-of-thought agent learned from expert WSI diagnosis behavior (AI Session Recorder + Pathology-o3 agent)",
        "github": "https://github.com/zhihuanglab/Pathology-CoT",
        "hf": "",
        "paper": "https://arxiv.org/abs/2510.04587",
        "bibtex": "@misc{wang2025pathologycotlearningvisualchainofthought,\n      title={Pathology-CoT: Learning Visual Chain-of-Thought Agent from Expert Whole Slide Image Diagnosis Behavior}, \n      author={Sheng Wang and Ruiming Wu and Charles Herndon and Yihang Liu and Shunsuke Koga and Jeanne Shen and Zhi Huang},\n      year={2025},\n      eprint={2510.04587},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2510.04587}, \n}",
        "paper_title": "Pathology-CoT: Learning Visual Chain-of-Thought Agent from Expert Whole Slide Image Diagnosis Behavior",
        "paper_author": "Wang"
      },
      {
        "name": "PathAgent",
        "year": 2025,
        "date": "2025-11-21",
        "data": "LLM agentic reasoning",
        "idea": "LLM-based agentic reasoning for interpretable whole-slide pathology analysis via tool-use and step-wise reasoning",
        "github": "https://github.com/G14nTDo4/PathAgent",
        "hf": "",
        "paper": "https://arxiv.org/abs/2511.17052",
        "bibtex": "@misc{chen2025pathagentinterpretableanalysiswholeslide,\n      title={PathAgent: Toward Interpretable Analysis of Whole-slide Pathology Images via Large Language Model-based Agentic Reasoning}, \n      author={Jingyun Chen and Linghan Cai and Zhikang Wang and Yi Huang and Songhan Jiang and Shenjin Huang and Hongpeng Wang and Yongbing Zhang},\n      year={2025},\n      eprint={2511.17052},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2511.17052}, \n}",
        "paper_title": "PathAgent: Toward Interpretable Analysis of Whole-slide Pathology Images via Large Language Model-based Agentic Reasoning",
        "paper_author": "Chen"
      },
      {
        "name": "PathReasoning",
        "year": 2025,
        "date": "2025-11-26",
        "data": "ROI-navigation agent",
        "idea": "Multimodal reasoning agent for query-based ROI navigation on whole-slide images",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2511.21902",
        "bibtex": "@misc{zhang2025pathreasoningmultimodalreasoningagent,\n      title={PathReasoning: A multimodal reasoning agent for query-based ROI navigation on whole-slide images}, \n      author={Kunpeng Zhang and Hanwen Xu and Sheng Wang},\n      year={2025},\n      eprint={2511.21902},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2511.21902}, \n}",
        "paper_title": "PathReasoning: A multimodal reasoning agent for query-based ROI navigation on whole-slide images",
        "paper_author": "Zhang"
      },
      {
        "name": "PathFound",
        "year": 2025,
        "date": "2025-12-29",
        "data": "Agentic multimodal model",
        "idea": "Agentic multimodal model activating evidence-seeking pathological diagnosis",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2512.23545",
        "bibtex": "@misc{hua2025pathfoundagenticmultimodalmodel,\n      title={PathFound: An Agentic Multimodal Model Activating Evidence-seeking Pathological Diagnosis}, \n      author={Shengyi Hua and Jianfeng Wu and Tianle Shen and Kangzhe Hu and Zhongzhen Huang and Shujuan Ni and Zhihong Zhang and Yuan Li and Zhe Wang and Xiaofan Zhang},\n      year={2025},\n      eprint={2512.23545},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2512.23545}, \n}",
        "paper_title": "PathFound: An Agentic Multimodal Model Activating Evidence-seeking Pathological Diagnosis",
        "paper_author": "Hua"
      },
      {
        "name": "MLLM-HWSI",
        "year": 2026,
        "date": "2026-03-24",
        "data": "Hierarchical WSI MLLM",
        "idea": "Multimodal LLM for hierarchical whole-slide image understanding across magnifications",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2603.23067",
        "bibtex": "@misc{alawode2026mllmhwsimultimodallargelanguage,\n      title={MLLM-HWSI: A Multimodal Large Language Model for Hierarchical Whole Slide Image Understanding}, \n      author={Basit Alawode and Arif Mahmood and Muaz Khalifa Al-Radi and Shahad Albastaki and Asim Khan and Muhammad Bilal and Moshira Ali Abdalla and Mohammed Bennamoun and Sajid Javed},\n      year={2026},\n      eprint={2603.23067},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2603.23067}, \n}",
        "paper_title": "MLLM-HWSI: A Multimodal Large Language Model for Hierarchical Whole Slide Image Understanding",
        "paper_author": "Alawode"
      }
    ]
  },
  {
    "category": "Navigation & Active-Perception Agents",
    "models": [
      {
        "name": "GIANT",
        "year": 2025,
        "date": "2025-11-24",
        "data": "Training-free LMM navigator",
        "idea": "General-purpose LMM that pans, zooms, selects crops and reasons iteratively over WSIs (training-free); introduces the MultiPathQA benchmark (934 questions / 868 WSIs)",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2511.19652",
        "bibtex": "@misc{buckley2026navigatinggigapixelpathologyimages,\n      title={Navigating Gigapixel Pathology Images with Large Multimodal Models}, \n      author={Thomas A. Buckley and Kian R. Weihrauch and Katherine Latham and Andrew Z. Zhou and Padmini A. Manrai and Arjun K. Manrai},\n      year={2026},\n      eprint={2511.19652},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2511.19652}, \n}",
        "paper_title": "Navigating Gigapixel Pathology Images with Large Multimodal Models",
        "paper_author": "Buckley"
      },
      {
        "name": "MMNavAgent",
        "year": 2026,
        "date": "2026-03-02",
        "data": "Cross-magnification navigator",
        "idea": "Cross-magnification navigation + magnification-selection tools with memory-driven reasoning to decide where and at what magnification to inspect next",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2603.02079",
        "bibtex": "@misc{xu2026mmnavagentmultimagnificationwsinavigation,\n      title={MMNavAgent: Multi-Magnification WSI Navigation Agent for Clinically Consistent Whole-Slide Analysis}, \n      author={Zhengyang Xu and Han Li and Jingsong Liu and Linrui Xie and Xun Ma and Xin You and Shihui Zu and Ayako Ito and Xinyu Hao and Hongming Xu and Shaohua Kevin Zhou and Nassir Navab and Peter J. Schüffler},\n      year={2026},\n      eprint={2603.02079},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2603.02079}, \n}",
        "paper_title": "MMNavAgent: Multi-Magnification WSI Navigation Agent for Clinically Consistent Whole-Slide Analysis",
        "paper_author": "Xu"
      },
      {
        "name": "PathNavigate",
        "year": 2026,
        "date": "2026-05-22",
        "data": "Training-free scan-search",
        "idea": "Training-free Scan -> Search -> Readout agent; builds a slide-specific surprise map with shared memory, then question-conditioned PLIP retrieval to pick regions for high-res inspection",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2605.23559",
        "bibtex": "@misc{yang2026pathnavigatetrainingfreepathologyagent,\n      title={PathNavigate: A Training-Free Pathology Agent with Surprise-Guided Scan and Shared Slide Memory for Whole-Slide Image VQA}, \n      author={Chunze Yang and Qidong Liu and Wenjie Zhao and Yue Tang and Jiusong Ge and Di Zhang and Jiashuai Liu and Lei Wu and Junbo Lu and Ni Zhang and Xian Wu and Zeyu Gao and Chen Li},\n      year={2026},\n      eprint={2605.23559},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2605.23559}, \n}",
        "paper_title": "PathNavigate: A Training-Free Pathology Agent with Surprise-Guided Scan and Shared Slide Memory for Whole-Slide Image VQA",
        "paper_author": "Yang"
      },
      {
        "name": "BEACON",
        "year": 2026,
        "date": "2026-08-06",
        "data": "Bayesian active perception",
        "idea": "Maintains a Bayesian belief over competing diagnoses and picks the next patch by expected information gain; an evidence controller decides to answer, acquire, or zoom (training-free)",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2608.05757",
        "bibtex": "@misc{wong2026relevancebayesianevidenceacquisition,\n      title={Beyond Relevance: Bayesian Evidence Acquisition for Agentic Whole-Slide Image Reasoning}, \n      author={Bryan Wong and Xun Xu and Huazhu Fu and Nancy F. Chen and Mun Yong Yi},\n      year={2026},\n      eprint={2608.05757},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2608.05757}, \n}",
        "paper_title": "Beyond Relevance: Bayesian Evidence Acquisition for Agentic Whole-Slide Image Reasoning",
        "paper_author": "Wong"
      },
      {
        "name": "AdaptivePath",
        "year": 2026,
        "date": "2026-08-09",
        "data": "Learned active navigator",
        "idea": "A learned Navigator (PPO) decides where and at what scale to observe, then Morphology Interpreter -> Deliberator -> Arbiter; uses pathologist-reviewed abnormal-region labels",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2608.08648",
        "bibtex": "@misc{chen2026agenticvisualreasoningwholeslide,\n      title={Agentic Visual Reasoning in Whole-Slide Pathology Images via Active Perception}, \n      author={Jingyun Chen and Fengchun Liu and Linghan Cai and Songhan Jiang and Shenjin Huang and Hongpeng Wang and Lequan Yu and Yongbing Zhang},\n      year={2026},\n      eprint={2608.08648},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2608.08648}, \n}",
        "paper_title": "Agentic Visual Reasoning in Whole-Slide Pathology Images via Active Perception",
        "paper_author": "Chen"
      }
    ]
  },
  {
    "category": "Multi-Agent Systems",
    "models": [
      {
        "name": "PathFinder",
        "year": 2025,
        "date": "2025-02-13",
        "data": "Multi-agent diagnosis",
        "idea": "Multi-modal multi-agent system for medical diagnostic decision-making applied to histopathology",
        "github": "",
        "hf": "",
        "website": "https://pathfinder-dx.github.io/",
        "paper": "https://arxiv.org/abs/2502.08916",
        "bibtex": "@misc{ghezloo2025pathfindermultimodalmultiagentmedical,\n      title={PathFinder: A Multi-Modal Multi-Agent System for Medical Diagnostic Decision-Making Applied to Histopathology}, \n      author={Fatemeh Ghezloo and Mehmet Saygin Seyfioglu and Rustin Soraki and Wisdom O. Ikezogwo and Beibin Li and Tejoram Vivekanandan and Joann G. Elmore and Ranjay Krishna and Linda Shapiro},\n      year={2025},\n      eprint={2502.08916},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2502.08916}, \n}",
        "paper_title": "PathFinder: A Multi-Modal Multi-Agent System for Medical Diagnostic Decision-Making Applied to Histopathology",
        "paper_author": "Ghezloo"
      },
      {
        "name": "Evidence-based Copilot",
        "year": 2025,
        "date": "2025-06-26",
        "data": "Multi-agent copilot",
        "idea": "Evidence-based diagnostic reasoning with a multi-agent copilot for human pathology",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2506.20964",
        "bibtex": "@misc{weishaupt2026evidencebaseddiagnosticreasoningmultiagent,\n      title={Evidence-based diagnostic reasoning with multi-agent copilot for human pathology}, \n      author={Luca L. Weishaupt and Chengkuan Chen and Drew F. K. Williamson and Richard J. Chen and Guillaume Jaume and Tong Ding and Bowen Chen and Anurag Vaidya and Long Phi Le and Guillaume Jaume and Ming Y. Lu and Faisal Mahmood},\n      year={2026},\n      eprint={2506.20964},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2506.20964}, \n}",
        "paper_title": "Evidence-based diagnostic reasoning with multi-agent copilot for human pathology",
        "paper_author": "Chen"
      },
      {
        "name": "WSI-Agents",
        "year": 2025,
        "date": "2025-07-19",
        "data": "Collaborative multi-agent",
        "idea": "Collaborative multi-agent system for multimodal whole-slide image analysis",
        "github": "https://github.com/CVI-SZU/WSI-Agents",
        "hf": "",
        "paper": "https://arxiv.org/abs/2507.14680",
        "bibtex": "@misc{lyu2025wsiagentscollaborativemultiagentmultimodal,\n      title={WSI-Agents: A Collaborative Multi-Agent System for Multi-Modal Whole Slide Image Analysis}, \n      author={Xinheng Lyu and Yuci Liang and Wenting Chen and Meidan Ding and Jiaqi Yang and Guolin Huang and Daokun Zhang and Xiangjian He and Linlin Shen},\n      year={2025},\n      eprint={2507.14680},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2507.14680}, \n}",
        "paper_title": "WSI-Agents: A Collaborative Multi-Agent System for Multi-Modal Whole Slide Image Analysis",
        "paper_author": "Lyu"
      },
      {
        "name": "Co-evolving Agentic System",
        "year": 2025,
        "date": "2025-09-24",
        "data": "Multi-agent medical imaging",
        "idea": "Co-evolving multi-agent AI system for medical imaging analysis (including pathology); agents improve through interaction",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2509.20279",
        "bibtex": "@misc{li2025coevolvingagenticaimedical,\n      title={A co-evolving agentic AI system for medical imaging analysis}, \n      author={Songhao Li and Jonathan Xu and Tiancheng Bao and Yuxuan Liu and Yuchen Liu and Yihang Liu and Lilin Wang and Wenhui Lei and Sheng Wang and Yinuo Xu and Yan Cui and Jialu Yao and Shunsuke Koga and Zhi Huang},\n      year={2025},\n      eprint={2509.20279},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2509.20279}, \n}",
        "paper_title": "A co-evolving agentic AI system for medical imaging analysis",
        "paper_author": "Li"
      },
      {
        "name": "NOVA",
        "year": 2025,
        "date": "2025-11-14",
        "data": "Agentic analysis framework",
        "idea": "Agentic framework for automated histopathology analysis and scientific discovery, orchestrating tools/agents over pathology data",
        "github": "https://github.com/microsoft/nova-agent",
        "hf": "",
        "paper": "https://arxiv.org/abs/2511.11324",
        "bibtex": "@misc{vaidya2025novaagenticframeworkautomated,\n      title={NOVA: An Agentic Framework for Automated Histopathology Analysis and Discovery},\n      author={Anurag J. Vaidya and Felix Meissen and Daniel C. Castro and Shruthi Bannur and Tristan Lazard and Drew F. K. Williamson and Faisal Mahmood and Javier Alvarez-Valle and Stephanie L. Hyland and Kenza Bouzid},\n      year={2025},\n      eprint={2511.11324},\n      archivePrefix={arXiv},\n      primaryClass={cs.CL},\n      url={https://arxiv.org/abs/2511.11324},\n}",
        "paper_title": "NOVA: An Agentic Framework for Automated Histopathology Analysis and Discovery",
        "paper_author": "Vaidya"
      },
      {
        "name": "SurvAgent",
        "year": 2025,
        "date": "2025-11-20",
        "data": "CoT multi-agent",
        "idea": "Hierarchical CoT multi-agent system with case banking and dichotomy-based reasoning for multimodal survival prediction",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2511.16635",
        "bibtex": "@misc{huang2025survagenthierarchicalcotenhancedcase,\n      title={SurvAgent: Hierarchical CoT-Enhanced Case Banking and Dichotomy-Based Multi-Agent System for Multimodal Survival Prediction}, \n      author={Guolin Huang and Wenting Chen and Jiaqi Yang and Xinheng Lyu and Xiaoling Luo and Sen Yang and Xiaohan Xing and Linlin Shen},\n      year={2025},\n      eprint={2511.16635},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2511.16635}, \n}",
        "paper_title": "SurvAgent: Hierarchical CoT-Enhanced Case Banking and Dichotomy-Based Multi-Agent System for Multimodal Survival Prediction",
        "paper_author": "Huang"
      },
      {
        "name": "PPGL-Swarm",
        "year": 2026,
        "date": "2026-03-23",
        "data": "PPGL agent swarm",
        "idea": "Decomposes PPGL diagnosis into microtasks for specialized agents; RL improves tool selection; produces GAPP scoring, genotype-risk alerts and multimodal reports",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2603.21700",
        "bibtex": "@misc{liu2026ppglswarmintegratedmultimodalrisk,\n      title={PPGL-Swarm: Integrated Multimodal Risk Stratification and Hereditary Syndrome Detection in Pheochromocytoma and Paraganglioma}, \n      author={Zelin Liu and Xiangfu Yu and Jie Huang and Ge Wang and Yizhe Yuan and Zhenyu Yi and Jing Xie and Haotian Jiang and Lichi Zhang},\n      year={2026},\n      eprint={2603.21700},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2603.21700}, \n}",
        "paper_title": "PPGL-Swarm: Integrated Multimodal Risk Stratification and Hereditary Syndrome Detection in Pheochromocytoma and Paraganglioma",
        "paper_author": "Liu"
      },
      {
        "name": "BUC AI-Agent",
        "year": 2026,
        "date": "2026-04-14",
        "data": "Routing multi-agent (path+CT)",
        "idea": "Clinical multi-agent system for bladder urothelial carcinoma prognosis: a routing engine dispatches among pathology-report standardization, CT segmentation, WSI analysis, phenotype maps and prognostic models (MATCH-Net fusion; 1,185 patients across 4 centers)",
        "paper": "https://www.nature.com/articles/s41698-026-01415-z",
        "bibtex": "@article{He_2026, title={Development and validation of a multimodal AI-agent system for prognosis analysis of bladder urothelial carcinoma}, volume={10}, ISSN={2397-768X}, url={http://dx.doi.org/10.1038/s41698-026-01415-z}, DOI={10.1038/s41698-026-01415-z}, number={1}, journal={npj Precision Oncology}, publisher={Springer Science and Business Media LLC}, author={He, Quanhao and Tan, Hao and Xiao, Bangxin and Peng, Xiang and Peng, Canjie and Tan, Yiwen and Liu, YingJia and Cao, Youde and Lv, Fa Jin and Zhao, Wenlong and Yue, Xiaofeng and He, Weiyang and Xiao, Mingzhao}, year={2026}, month=Apr }",
        "paper_title": "Development and validation of a multimodal AI-agent system for prognosis analysis of bladder urothelial carcinoma",
        "paper_author": "He"
      },
      {
        "name": "EndoGov",
        "year": 2026,
        "date": "2026-04-26",
        "data": "Governed specialist agents",
        "idea": "Specialist agents (pathology/molecular/clinical) extract evidence independently; a governance agent queries a guideline knowledge graph and applies executable clinical rules (endometrial cancer risk)",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2604.23802",
        "bibtex": "@misc{dai2026endogovknowledgegovernedmultiagentexpert,\n      title={EndoGov: A knowledge-governed multi-agent expert system for endometrial cancer risk stratification}, \n      author={Weiye Dai and Liyun Shi and Zanxiang He and Yuling Ma and Mengyuan Lin and Dianxiang Sun and Liming Nie},\n      year={2026},\n      eprint={2604.23802},\n      archivePrefix={arXiv},\n      primaryClass={cs.MA},\n      url={https://arxiv.org/abs/2604.23802}, \n}",
        "paper_title": "EndoGov: A knowledge-governed multi-agent expert system for endometrial cancer risk stratification",
        "paper_author": "Dai"
      },
      {
        "name": "PathPocket",
        "year": 2026,
        "date": "2026-06-06",
        "data": "Hypergraph evidence agents",
        "idea": "Collaborative agents: input understanding -> evidence retrieval -> filtering -> diagnosis, grounded in a pathology hypergraph (>4.55M entities, >7.10M relations); text/ROI/WSI inputs",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2606.08093",
        "bibtex": "@misc{xu2026multimodalagenticcopilotevidence,\n      title={A Multi-modal Agentic Co-pilot for Evidence Grounded Computational Pathology}, \n      author={Zhe Xu and Zhengyu Zhang and Zhiyuan Cai and Jiahao Xu and Yijie Lin and Ziyi Liu and Junlin Hou and Hongyi Wang and Yuxiang Nie and Ling Liang and Yihui Wang and Yingxue Xu and Ronald Cheong Kin Chan and Li Liang and Hao Chen},\n      year={2026},\n      eprint={2606.08093},\n      archivePrefix={arXiv},\n      primaryClass={cs.AI},\n      url={https://arxiv.org/abs/2606.08093}, \n}",
        "paper_title": "A Multi-modal Agentic Co-pilot for Evidence Grounded Computational Pathology",
        "paper_author": "Xu"
      }
    ]
  },
  {
    "category": "Tool-Use & Retrieval Agents",
    "models": [
      {
        "name": "Patho-AgenticRAG",
        "year": 2025,
        "date": "2025-08-04",
        "data": "Agentic RAG (RL)",
        "idea": "Multimodal agentic retrieval-augmented generation for pathology VLMs, trained via reinforcement learning",
        "github": "https://github.com/Wenchuan-Zhang/Patho-AgenticRAG",
        "hf": "",
        "paper": "https://arxiv.org/abs/2508.02258",
        "bibtex": "@misc{zhang2025pathoagenticragmultimodalagenticretrievalaugmented,\n      title={Patho-AgenticRAG: Towards Multimodal Agentic Retrieval-Augmented Generation for Pathology VLMs via Reinforcement Learning}, \n      author={Wenchuan Zhang and Jingru Guo and Hengzhe Zhang and Penghao Zhang and Jie Chen and Shuwan Zhang and Zhang Zhang and Yuhao Yi and Hong Bu},\n      year={2025},\n      eprint={2508.02258},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2508.02258}, \n}",
        "paper_title": "Patho-AgenticRAG: Towards Multimodal Agentic Retrieval-Augmented Generation for Pathology VLMs via Reinforcement Learning",
        "paper_author": "Zhang"
      },
      {
        "name": "Auditable Neuro-Symbolic",
        "year": 2026,
        "date": "2026-01-05",
        "data": "SQL tool-use agents",
        "idea": "Feature Reasoning Agents generate and execute SQL over measured cellular features; a Knowledge Comparison Agent checks findings against pathology knowledge (executable tool use)",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2601.01875",
        "bibtex": "@misc{cao2026auditableneurosymbolicreasoningpathology,\n      title={Toward Auditable Neuro-Symbolic Reasoning in Pathology: SQL as an Explicit Trace of Evidence}, \n      author={Kewen Cao and Jianxu Chen and Yongbing Zhang and Ye Zhang and Hongxiao Wang},\n      year={2026},\n      eprint={2601.01875},\n      archivePrefix={arXiv},\n      primaryClass={cs.AI},\n      url={https://arxiv.org/abs/2601.01875}, \n}",
        "paper_title": "Toward Auditable Neuro-Symbolic Reasoning in Pathology: SQL as an Explicit Trace of Evidence",
        "paper_author": "Cao"
      },
      {
        "name": "LAMMI-Pathology",
        "year": 2026,
        "date": "2026-02-21",
        "data": "Tool-centric LVLM-agent",
        "idea": "Tool-centric bottom-up LVLM-agent framework for molecularly informed medical intelligence in pathology",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2602.18773",
        "bibtex": "@misc{su2026lammipathologytoolcentricbottomuplvlmagent,\n      title={LAMMI-Pathology: A Tool-Centric Bottom-Up LVLM-Agent Framework for Molecularly Informed Medical Intelligence in Pathology}, \n      author={Haoyang Su and Shaoting Zhang and Xiaosong Wang},\n      year={2026},\n      eprint={2602.18773},\n      archivePrefix={arXiv},\n      primaryClass={cs.AI},\n      url={https://arxiv.org/abs/2602.18773}, \n}",
        "paper_title": "LAMMI-Pathology: A Tool-Centric Bottom-Up LVLM-Agent Framework for Molecularly Informed Medical Intelligence in Pathology",
        "paper_author": "Su"
      },
      {
        "name": "Digepath",
        "year": 2026,
        "date": "2026-05-04",
        "data": "GPT-4o + DigeTools",
        "idea": "End-to-end GI-pathology agent: GPT-4o orchestrates a DigeTools library over a WSI (feature extraction -> tumor detection -> subtype identification -> ROI selection -> report generation) through multi-turn dialogue",
        "paper": "https://www.nature.com/articles/s41746-026-02684-5",
        "bibtex": "@article{Zhu_2026, title={Subspecialty-specific foundation model for intelligent gastrointestinal pathology}, volume={9}, ISSN={2398-6352}, url={http://dx.doi.org/10.1038/s41746-026-02684-5}, DOI={10.1038/s41746-026-02684-5}, number={1}, journal={npj Digital Medicine}, publisher={Springer Science and Business Media LLC}, author={Zhu, Lianghui and Ling, Xitong and Ouyang, Minxi and Liu, Xiaoping and Guan, Tian and Fu, Mingxi and Zeng, Maomao and Cheng, Zhiqiang and Fu, Fanglei and Huang, Qiang and Zhu, Mingxi and Jin, Yibo and He, Qiming and Wang, Yizhi and Cheng, Junru and Wang, Xuanyu and Xie, Luxi and Li, Houqiang and Tian, Sufang and He, Yonghong}, year={2026}, month=May }",
        "paper_title": "Subspecialty-specific foundation model for intelligent gastrointestinal pathology",
        "paper_author": "Zhu"
      },
      {
        "name": "PathoTool",
        "year": 2026,
        "date": "2026-05-15",
        "data": "Confidence-gated tool use",
        "idea": "Tool-using diagnostic agent that performs H&E diagnosis, estimates its own confidence, and only when confidence is insufficient calls a virtual-staining/IHC tool to acquire extra evidence, then integrates H&E and virtual-IHC to finalize the diagnosis (ACL ARR May 2026 submission)",
        "paper": ""
      },
      {
        "name": "PathoSage",
        "year": 2026,
        "date": "2026-05-18",
        "data": "Tool-reliability agent",
        "idea": "Collects evidence from multiple tools/knowledge sources, adjudicates disagreements, and learns Beta-Bernoulli tool-reliability estimates so past experience shapes future tool use",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2606.07549",
        "bibtex": "@misc{zhang2026pathosagemultisourceevidenceadjudication,\n      title={PathoSage: Towards Multi-Source Evidence Adjudication in Pathology via Experience-Aware Agentic Workflow}, \n      author={Chengyang Zhang and Wenchuan Zhang and Bo Li and Mengran Li and Bob Zhang and Yuhao Yi and Hong Bu and Jiancheng Lv},\n      year={2026},\n      eprint={2606.07549},\n      archivePrefix={arXiv},\n      primaryClass={cs.AI},\n      url={https://arxiv.org/abs/2606.07549}, \n}",
        "paper_title": "PathoSage: Towards Multi-Source Evidence Adjudication in Pathology via Experience-Aware Agentic Workflow",
        "paper_author": "Zhang"
      }
    ]
  },
  {
    "category": "Autonomous Discovery & Research",
    "models": [
      {
        "name": "SAGE",
        "year": 2026,
        "date": "2026-02-01",
        "data": "Hypothesis gen + eval",
        "idea": "Structured Agentic system for hypothesis Generation and Evaluation; agents perform literature-grounded contextualization and empirical validation to discover interpretable biomarkers",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2602.00953",
        "bibtex": "@misc{nasser2026sageagenticframeworkinterpretable,\n      title={SAGE: Agentic Framework for Interpretable and Clinically Translatable Computational Pathology Biomarker Discovery}, \n      author={Sahar Almahfouz Nasser and Juan Francisco Pesantez Borja and Jincheng Liu and Sandeep Manandhar and Shikhar Shiromani and Mohammad Tanvir Hasan and Zenghan Wang and Suman Ghosh and Jinchu Li and Xuejian Xu and Aniket Ramkrishnan Iyer and Naoto Tokuyama and Twisha Shah and Tilak Pathak and Soundharya Kumaresan and Yohei Abe and Himanshu Maurya and Anant Madabhushi},\n      year={2026},\n      eprint={2602.00953},\n      archivePrefix={arXiv},\n      primaryClass={cs.LG},\n      url={https://arxiv.org/abs/2602.00953}, \n}",
        "paper_title": "SAGE: Agentic Framework for Interpretable and Clinically Translatable Computational Pathology Biomarker Discovery",
        "paper_author": "Nasser"
      },
      {
        "name": "ROSIE",
        "year": 2026,
        "date": "2026-04-23",
        "data": "LLM biomarker orchestration",
        "idea": "LLMs orchestrate modular biomarker inference and spatiotemporal reasoning directly over routine H&E to reconstruct immune/stromal evolution in pancreatic cancer (~10.4M single-cell profiles; immune-surveillance -> exhaustion -> stromal-dominant states)",
        "paper": "https://www.biorxiv.org/content/10.64898/2026.04.20.719684v1",
        "bibtex": "@article{Huang_2026, title={Autonomous multimodal agents enable transparent, spatiotemporal reconstruction of immune dynamics in pancreatic cancer progression}, url={http://dx.doi.org/10.64898/2026.04.20.719684}, DOI={10.64898/2026.04.20.719684}, publisher={openRxiv}, author={Huang, Beibei and Zhu, Bo}, year={2026}, month=Apr }",
        "paper_title": "Autonomous multimodal agents enable transparent, spatiotemporal reconstruction of immune dynamics in pancreatic cancer progression",
        "paper_author": "Huang"
      },
      {
        "name": "Agentic Discovery",
        "year": 2026,
        "date": "2026-04-29",
        "data": "Autonomous discovery agents",
        "idea": "Agentic framework for autonomous scientific discovery in cancer pathology (Nature Medicine)",
        "github": "",
        "hf": "",
        "paper": "https://www.nature.com/articles/s41591-026-04357-y",
        "bibtex": "@article{Trost_2026, title={An agentic framework for autonomous scientific discovery in cancer pathology}, volume={32}, ISSN={1546-170X}, url={http://dx.doi.org/10.1038/s41591-026-04357-y}, DOI={10.1038/s41591-026-04357-y}, number={6}, journal={Nature Medicine}, publisher={Springer Science and Business Media LLC}, author={Trost, Florian and Zhang, Bide and Aring, Ines and Bauer, Marcus and Glamann, Lennert and Wessolly, Michael and Johnson, Kyra and Göbel, Heike and Lerbs, Tristan and Sangenne, Taban and Herrmann, Peter and Mairinger, Fabian and Kopp, Christopher and Michels, Sebastian and Rasokat, Anna and Heldwein, Matthias and Wagner, Steffen and Schömig-Markiefka, Birgid and Wolf, Jürgen and Hartmann, Sylvia and Wickenhauser, Claudia and Bychkov, Andrey and Klussmann, Jens Peter and Quaas, Alexander and Buettner, Reinhard and Tolkach, Yuri}, year={2026}, month=Apr, pages={2254–2266} }",
        "paper_title": "An agentic framework for autonomous scientific discovery in cancer pathology",
        "paper_author": "Trost"
      },
      {
        "name": "PathLab",
        "year": 2026,
        "date": "2026-06-12",
        "data": "Autonomous workflow agent",
        "idea": "Takes a natural-language CPath research objective and autonomously constructs, executes and validates an analytical workflow using pathology tools; evaluated across 12 datasets",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2606.20677",
        "bibtex": "@misc{ma2026democratizingacceleratingaidrivenpathology,\n      title={Democratizing and accelerating AI-driven pathology research through agentic intelligence}, \n      author={Jiabo Ma and Cheng Jin and Yihui Wang and Hao Jiang and Ling Liang and Yingxue Xu and Junlin Hou and Zhengrui Guo and Zhengyu Zhang and Yifei Xia and Hongyi Wang and Fengtao Zhou and Zhe Xu and Huajun Zhou and Jiarui Ouyang and Qian Zeng and On Ki Tang and Eunhyang Park and Carolyn Glass and Ronald Cheong Kin Chan and Li Liang and Hao Chen},\n      year={2026},\n      eprint={2606.20677},\n      archivePrefix={arXiv},\n      primaryClass={cs.AI},\n      url={https://arxiv.org/abs/2606.20677}, \n}",
        "paper_title": "Democratizing and accelerating AI-driven pathology research through agentic intelligence",
        "paper_author": "Ma"
      },
      {
        "name": "DERMA-Agent",
        "year": 2026,
        "date": "2026-07-22",
        "data": "CodeAct discovery agent",
        "idea": "CodeAct-style Perception–Action loop over WSIs: generates biological hypotheses, writes and executes statistical code in a sandbox, evaluates survival associations across pan-cancer TCGA cohorts and revises analyses (grounded in a biological Knowledge Fabric)",
        "paper": "https://www.researchsquare.com/article/rs-10428278/v1",
        "bibtex": "@article{Swaminathan_2026, title={DERMA-Agent: An Agentic Framework for Prognostic Discovery in Pan-Cancer Pathology}, url={http://dx.doi.org/10.21203/rs.3.rs-10428278/v1}, DOI={10.21203/rs.3.rs-10428278/v1}, publisher={Springer Science and Business Media LLC}, author={Swaminathan, Gurumurthy}, year={2026}, month=July }",
        "paper_title": "DERMA-Agent: An Agentic Framework for Prognostic Discovery in Pan-Cancer Pathology",
        "paper_author": "Swaminathan"
      }
    ]
  },
  {
    "category": "Agentic Image–Omics Reasoning",
    "models": [
      {
        "name": "Agent SPI-WSI",
        "year": 2025,
        "date": "2025-10-17",
        "data": "Iterative prompt refinement",
        "idea": "Human-in-the-loop agent that iteratively generates -> evaluates -> critiques -> refines natural-language prompts to spatially infer bulk-RNA pathway activity on WSIs (pathologist-in-the-loop; CONCH scoring, PubMed cross-check)",
        "paper": "https://www.biorxiv.org/content/10.1101/2025.10.16.682972v1",
        "bibtex": "@article{Vashistha_2025, title={Agent SPI-WSI: In context learning for computationally spatial pathway inferring on whole slide histopathology images conditioned on bulk RNA sequencing using pathologist in the loop}, url={http://dx.doi.org/10.1101/2025.10.16.682972}, DOI={10.1101/2025.10.16.682972}, publisher={openRxiv}, author={Vashistha, Rajat and Brosda, Sandra and Belle, Clemence J. and Aoude, Lauren G. and Waddell, Nic and Ghosh, Soumen and Cooper, Caroline and Barbour, Andrew P. and Vegh, Viktor}, year={2025}, month=Oct }",
        "paper_title": "Agent SPI-WSI: In context learning for computationally spatial pathway inferring on whole slide histopathology images conditioned on bulk RNA sequencing using pathologist in the loop",
        "paper_author": "Vashistha"
      }
    ]
  },
  {
    "category": "Report Generation Agents",
    "models": [
      {
        "name": "QCAgent",
        "year": 2026,
        "date": "2026-03-02",
        "data": "Checklist-critique report agent",
        "idea": "Generates a report, critiques it against a user-defined diagnostic checklist, re-searches the WSI for missing evidence, and iteratively revises",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2603.01647",
        "bibtex": "@misc{wang2026qcagentagenticframeworkqualitycontrollable,\n      title={QCAgent: An agentic framework for quality-controllable pathology report generation from whole slide image}, \n      author={Rundong Wang and Wei Ba and Ying Zhou and Yingtai Li and Bowen Liu and Baizhi Wang and Yuhao Wang and Zhidong Yang and Kun Zhang and Rui Yan and S. Kevin Zhou},\n      year={2026},\n      eprint={2603.01647},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2603.01647}, \n}",
        "paper_title": "QCAgent: An agentic framework for quality-controllable pathology report generation from whole slide image",
        "paper_author": "Wang"
      }
    ]
  },
  {
    "category": "Benchmarks & Evaluation",
    "models": [
      {
        "name": "PathAgentBench",
        "year": 2026,
        "date": "2026-07-21",
        "data": "Evidence-seeking VLM benchmark",
        "idea": "Benchmark for evaluating evidence-seeking vision-language models on whole-slide pathology images",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2607.19261",
        "bibtex": "@misc{liao2026pathagentbenchbenchmarkingevidenceseekingvisionlanguage,\n      title={PathAgentBench: Benchmarking Evidence-Seeking Vision-Language Models on Whole-Slide Pathology Image}, \n      author={Dankai Liao and Tianyi Zhang and Yufeng Wu and Xinyue Zhang and Qiaochu Xue and Zeyu Liu and Dachun Zhao and Linghan Cai and Yueming Jin},\n      year={2026},\n      eprint={2607.19261},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2607.19261}, \n}",
        "paper_title": "PathAgentBench: Benchmarking Evidence-Seeking Vision-Language Models on Whole-Slide Pathology Image",
        "paper_author": "Liao"
      }
    ]
  },
  {
    "category": "Surveys and Perspectives",
    "models": [
      {
        "name": "Landscape of CPath Agents",
        "year": 2026,
        "date": "2026-01-06",
        "data": "Survey of pathology agents",
        "idea": "Survey charting the field’s shift from static analysis to autonomous diagnostic workflows, taxonomizing computational-pathology agent architectures and capabilities",
        "paper": "https://www.techrxiv.org/doi/full/10.36227/techrxiv.176773877.76155111/v1",
        "bibtex": "@article{Chen_2026, title={The Landscape of Computational Pathology Agents From Static Analysis to Autonomous Diagnostic Workflows}, url={http://dx.doi.org/10.36227/techrxiv.176773877.76155111/v1}, DOI={10.36227/techrxiv.176773877.76155111/v1}, publisher={Institute of Electrical and Electronics Engineers (IEEE)}, author={Chen, Jingyun and Liu, Fengchun and Jiang, Songhan and Cai, Linghan}, year={2026}, month=Jan }",
        "paper_title": "The Landscape of Computational Pathology Agents: From Static Analysis to Autonomous Diagnostic Workflows",
        "paper_author": "Chen"
      },
      {
        "name": "CPath in the Era of Agentic AI",
        "year": 2026,
        "date": "2026-03-06",
        "data": "International expert review",
        "idea": "International expert perspective connecting foundation- and agentic-AI capabilities to clinical integration — weighing technical maturity, operational readiness, and economic/regulatory context for real-world adoption",
        "paper": "https://arxiv.org/abs/2603.05884",
        "bibtex": "@misc{da2026computationalpathologyeraemerging,\n      title={Computational Pathology in the Era of Emerging Foundation and Agentic AI -- International Expert Perspectives on Clinical Integration and Translational Readiness}, \n      author={Qian Da and Yijiang Chen and Min Ju and Zheyi Ji and Albert Zhou and Wenwen Wang and Matthew A Abikenari and Philip Chikontwe and Guillaume Larghero and Bowen Chen and Peter Neidlinger and Dingrong Zhong and Shuhao Wang and Wei Xu and Drew Williamson and German Corredor and Sen Yang and Le Lu and Xiao Han and Kun-Hsing Yu and Jun-zhou Huang and Laura Barisoni and Geert Litjens and Anant Madabhushi and Lifeng Zhu and Chaofu Wang and Junhan Zhao and Weiguo Hu},\n      year={2026},\n      eprint={2603.05884},\n      archivePrefix={arXiv},\n      primaryClass={cs.CE},\n      url={https://arxiv.org/abs/2603.05884}, \n}",
        "paper_title": "Computational Pathology in the Era of Emerging Foundation and Agentic AI — International Expert Perspectives on Clinical Integration and Translational Readiness",
        "paper_author": "Da"
      }
    ]
  }
];

// Node.js export (browser ignores this).
if (typeof module !== 'undefined' && module.exports) {
  module.exports = modelData;
}
