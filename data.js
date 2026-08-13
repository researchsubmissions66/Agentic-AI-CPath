const modelData = [
  {
    "category": "Interactive Copilots & Assistants",
    "models": [
      {
        "name": "PathChat",
        "year": 2024,
        "data": "456K instructions",
        "idea": "Multimodal generative AI copilot for pathology (vision encoder + LLM); fine-tuned on 456K visual-language instructions (999K Q&A turns) for diagnostic Q&A",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2312.07814",
        "bibtex": "@misc{lu2023foundationalmultimodalvisionlanguage,\n      title={A Foundational Multimodal Vision Language AI Assistant for Human Pathology}, \n      author={Ming Y. Lu and Bowen Chen and Drew F. K. Williamson and Richard J. Chen and Kenji Ikamura and Georg Gerber and Ivy Liang and Long Phi Le and Tong Ding and Anil V Parwani and Faisal Mahmood},\n      year={2023},\n      eprint={2312.07814},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2312.07814}, \n}",
        "paper_title": "A Foundational Multimodal Vision Language AI Assistant for Human Pathology",
        "paper_author": "Lu"
      },
      {
        "name": "SlideChat",
        "year": 2025,
        "data": "WSI instruction data",
        "idea": "Large vision-language assistant for whole-slide image understanding; slide-level VQA, description and reasoning",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2410.11761",
        "bibtex": "@misc{chen2025slidechatlargevisionlanguageassistant,\n      title={SlideChat: A Large Vision-Language Assistant for Whole-Slide Pathology Image Understanding}, \n      author={Ying Chen and Guoan Wang and Yuanfeng Ji and Yanjun Li and Jin Ye and Tianbin Li and Ming Hu and Rongshan Yu and Yu Qiao and Junjun He},\n      year={2025},\n      eprint={2410.11761},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2410.11761}, \n}",
        "paper_title": "SlideChat: A Large Vision-Language Assistant for Whole-Slide Pathology Image Understanding",
        "paper_author": "Chen"
      },
      {
        "name": "TeamPath",
        "year": 2025,
        "data": "RL + router copilot",
        "idea": "RL and router-enhanced multimodal pathology copilots for expert-level diagnosis, patch summarization, and cross-modality (transcriptomic) generation",
        "github": "",
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
        "name": "PathAgent",
        "year": 2025,
        "data": "LLM agentic reasoning",
        "idea": "LLM-based agentic reasoning for interpretable whole-slide pathology analysis via tool-use and step-wise reasoning",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2511.17052",
        "bibtex": "@misc{chen2025pathagentinterpretableanalysiswholeslide,\n      title={PathAgent: Toward Interpretable Analysis of Whole-slide Pathology Images via Large Language Model-based Agentic Reasoning}, \n      author={Jingyun Chen and Linghan Cai and Zhikang Wang and Yi Huang and Songhan Jiang and Shenjin Huang and Hongpeng Wang and Yongbing Zhang},\n      year={2025},\n      eprint={2511.17052},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2511.17052}, \n}",
        "paper_title": "PathAgent: Toward Interpretable Analysis of Whole-slide Pathology Images via Large Language Model-based Agentic Reasoning",
        "paper_author": "Chen"
      },
      {
        "name": "MLLM-HWSI",
        "year": 2026,
        "data": "Hierarchical WSI MLLM",
        "idea": "Multimodal LLM for hierarchical whole-slide image understanding across magnifications",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2603.23067",
        "bibtex": "@misc{alawode2026mllmhwsimultimodallargelanguage,\n      title={MLLM-HWSI: A Multimodal Large Language Model for Hierarchical Whole Slide Image Understanding}, \n      author={Basit Alawode and Arif Mahmood and Muaz Khalifa Al-Radi and Shahad Albastaki and Asim Khan and Muhammad Bilal and Moshira Ali Abdalla and Mohammed Bennamoun and Sajid Javed},\n      year={2026},\n      eprint={2603.23067},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2603.23067}, \n}",
        "paper_title": "MLLM-HWSI: A Multimodal Large Language Model for Hierarchical Whole Slide Image Understanding",
        "paper_author": "Alawode"
      },
      {
        "name": "CPathAgent",
        "year": 2025,
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
        "data": "Visual CoT agent",
        "idea": "Visual chain-of-thought agent learned from expert WSI diagnosis behavior (AI Session Recorder + Pathology-o3 agent)",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2510.04587",
        "bibtex": "@misc{wang2025pathologycotlearningvisualchainofthought,\n      title={Pathology-CoT: Learning Visual Chain-of-Thought Agent from Expert Whole Slide Image Diagnosis Behavior}, \n      author={Sheng Wang and Ruiming Wu and Charles Herndon and Yihang Liu and Shunsuke Koga and Jeanne Shen and Zhi Huang},\n      year={2025},\n      eprint={2510.04587},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2510.04587}, \n}",
        "paper_title": "Pathology-CoT: Learning Visual Chain-of-Thought Agent from Expert Whole Slide Image Diagnosis Behavior",
        "paper_author": "Wang"
      },
      {
        "name": "PathReasoning",
        "year": 2025,
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
        "data": "Agentic multimodal model",
        "idea": "Agentic multimodal model activating evidence-seeking pathological diagnosis",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2512.23545",
        "bibtex": "@misc{hua2025pathfoundagenticmultimodalmodel,\n      title={PathFound: An Agentic Multimodal Model Activating Evidence-seeking Pathological Diagnosis}, \n      author={Shengyi Hua and Jianfeng Wu and Tianle Shen and Kangzhe Hu and Zhongzhen Huang and Shujuan Ni and Zhihong Zhang and Yuan Li and Zhe Wang and Xiaofan Zhang},\n      year={2025},\n      eprint={2512.23545},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2512.23545}, \n}",
        "paper_title": "PathFound: An Agentic Multimodal Model Activating Evidence-seeking Pathological Diagnosis",
        "paper_author": "Hua"
      }
    ]
  },
  {
    "category": "Multi-Agent Systems",
    "models": [
      {
        "name": "Co-evolving Agentic System",
        "year": 2025,
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
        "name": "PathFinder",
        "year": 2025,
        "data": "Multi-agent diagnosis",
        "idea": "Multi-modal multi-agent system for medical diagnostic decision-making applied to histopathology",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2502.08916",
        "bibtex": "@misc{ghezloo2025pathfindermultimodalmultiagentmedical,\n      title={PathFinder: A Multi-Modal Multi-Agent System for Medical Diagnostic Decision-Making Applied to Histopathology}, \n      author={Fatemeh Ghezloo and Mehmet Saygin Seyfioglu and Rustin Soraki and Wisdom O. Ikezogwo and Beibin Li and Tejoram Vivekanandan and Joann G. Elmore and Ranjay Krishna and Linda Shapiro},\n      year={2025},\n      eprint={2502.08916},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2502.08916}, \n}",
        "paper_title": "PathFinder: A Multi-Modal Multi-Agent System for Medical Diagnostic Decision-Making Applied to Histopathology",
        "paper_author": "Ghezloo"
      },
      {
        "name": "Evidence-based Copilot",
        "year": 2025,
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
        "data": "Collaborative multi-agent",
        "idea": "Collaborative multi-agent system for multimodal whole-slide image analysis",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2507.14680",
        "bibtex": "@misc{lyu2025wsiagentscollaborativemultiagentmultimodal,\n      title={WSI-Agents: A Collaborative Multi-Agent System for Multi-Modal Whole Slide Image Analysis}, \n      author={Xinheng Lyu and Yuci Liang and Wenting Chen and Meidan Ding and Jiaqi Yang and Guolin Huang and Daokun Zhang and Xiangjian He and Linlin Shen},\n      year={2025},\n      eprint={2507.14680},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2507.14680}, \n}",
        "paper_title": "WSI-Agents: A Collaborative Multi-Agent System for Multi-Modal Whole Slide Image Analysis",
        "paper_author": "Lyu"
      },
      {
        "name": "SurvAgent",
        "year": 2025,
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
        "name": "Agentic Discovery",
        "year": 2026,
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
        "name": "NOVA",
        "year": 2025,
        "data": "Agentic analysis framework",
        "idea": "Agentic framework for automated histopathology analysis and scientific discovery, orchestrating tools/agents over pathology data",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2511.11324",
        "bibtex": "@misc{vaidya2025novaagenticframeworkautomated,\n      title={NOVA: An Agentic Framework for Automated Histopathology Analysis and Discovery},\n      author={Anurag J. Vaidya and Felix Meissen and Daniel C. Castro and Shruthi Bannur and Tristan Lazard and Drew F. K. Williamson and Faisal Mahmood and Javier Alvarez-Valle and Stephanie L. Hyland and Kenza Bouzid},\n      year={2025},\n      eprint={2511.11324},\n      archivePrefix={arXiv},\n      primaryClass={cs.CL},\n      url={https://arxiv.org/abs/2511.11324},\n}",
        "paper_title": "NOVA: An Agentic Framework for Automated Histopathology Analysis and Discovery",
        "paper_author": "Vaidya"
      }
    ]
  },
  {
    "category": "Tool-Use & Retrieval Agents",
    "models": [
      {
        "name": "Patho-AgenticRAG",
        "year": 2025,
        "data": "Agentic RAG (RL)",
        "idea": "Multimodal agentic retrieval-augmented generation for pathology VLMs, trained via reinforcement learning",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2508.02258",
        "bibtex": "@misc{zhang2025pathoagenticragmultimodalagenticretrievalaugmented,\n      title={Patho-AgenticRAG: Towards Multimodal Agentic Retrieval-Augmented Generation for Pathology VLMs via Reinforcement Learning}, \n      author={Wenchuan Zhang and Jingru Guo and Hengzhe Zhang and Penghao Zhang and Jie Chen and Shuwan Zhang and Zhang Zhang and Yuhao Yi and Hong Bu},\n      year={2025},\n      eprint={2508.02258},\n      archivePrefix={arXiv},\n      primaryClass={cs.CV},\n      url={https://arxiv.org/abs/2508.02258}, \n}",
        "paper_title": "Patho-AgenticRAG: Towards Multimodal Agentic Retrieval-Augmented Generation for Pathology VLMs via Reinforcement Learning",
        "paper_author": "Zhang"
      },
      {
        "name": "LAMMI-Pathology",
        "year": 2026,
        "data": "Tool-centric LVLM-agent",
        "idea": "Tool-centric bottom-up LVLM-agent framework for molecularly informed medical intelligence in pathology",
        "github": "",
        "hf": "",
        "paper": "https://arxiv.org/abs/2602.18773",
        "bibtex": "@misc{su2026lammipathologytoolcentricbottomuplvlmagent,\n      title={LAMMI-Pathology: A Tool-Centric Bottom-Up LVLM-Agent Framework for Molecularly Informed Medical Intelligence in Pathology}, \n      author={Haoyang Su and Shaoting Zhang and Xiaosong Wang},\n      year={2026},\n      eprint={2602.18773},\n      archivePrefix={arXiv},\n      primaryClass={cs.AI},\n      url={https://arxiv.org/abs/2602.18773}, \n}",
        "paper_title": "LAMMI-Pathology: A Tool-Centric Bottom-Up LVLM-Agent Framework for Molecularly Informed Medical Intelligence in Pathology",
        "paper_author": "Su"
      }
    ]
  },
  {
    "category": "Benchmarks & Evaluation",
    "models": [
      {
        "name": "PathAgentBench",
        "year": 2026,
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
  }
];

// Node.js export (browser ignores this).
if (typeof module !== 'undefined' && module.exports) {
  module.exports = modelData;
}
