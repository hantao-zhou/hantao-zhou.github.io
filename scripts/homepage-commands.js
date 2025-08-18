(function () {
  const data = {
    zh: {
      about: "我是一名谦逊的极客，目前在汉堡大学攻读计算机科学（人工智能）硕士。我的兴趣包括大语言模型、多模态系统和机器人。我喜欢构建高效可靠的AI系统，并跨学科合作。",
      contact: "电话: +86 15210812512\n邮箱: hantaozhouted@gmail.com",
      education: "- 计算机科学（人工智能）理学硕士，德国汉堡大学（2023年10月–2025年11月）。GPA 91/100（1.8/5.0），专注于大语言模型的应用与基础。\n- 智能科学与技术工学学士，北京邮电大学（2019年9月–2023年6月）。GPA 88.55/100（前10%），多次获得二等奖学金。毕业论文研究用于酶催化化学反应分析的多模态大模型。",
      experience: "- 美的（上海全球创新总部）– AI算法工程师（2025年6月–2025年12月）。负责机器人决策任务中的多模态大模型系统级加速与算法框架开发。通过调度、算子融合、内存复用和并行等方法，将推理和训练效率提升至最多7倍。设计了兼容多种策略和训练范式的统一决策训练框架，并跨团队合作构建端到端流程。\n- 矩阵无限科技（北京）– 大模型优化专家（2025年3月–2025年6月）。通过重构模型和减少冗余计算优化大语言模型以应对高并发场景。构建分布式部署方案，使系统吞吐量提升超过2倍，并降低延迟以满足业务需求。\n- Cauliflower AI（汉堡）– LLM实习生（2024年9月–2024年11月）。参与大语言模型的研发工作。",
      projects: "- 硕士机器人项目（2023年10月–2024年12月）。设计并实现了基于多模态大模型的控制决策系统，并在ICML 2024的MFMEAI上发表。\n- 用于酶催化反应分析的多模态大模型（2022年7月–2023年6月）。在清华大学THUNLP担任研究助理，探索用于理解酶催化化学反应的多模态大模型。",
      skills: "- 编程：Python, Matlab, C++, C, Lisp, WebAssembly (Emscripten), CUDA, JavaScript, TypeScript, Lua, Java, Ruby\n- 框架与库：PyTorch, Transformers (Hugging Face), Scikit-learn, SciPy, Pandas, Numpy (及CuPy), Tilelang\n- 工具：Linux, macOS, Nix, ROS 1/2, Shell (GNU Coreutils & BusyBox), (Neo)Vim, (Spac)Emacs, Tmux, Git, GitHub, GitLab, Docker, Kubernetes, LaTeX, Markdown, Typst\n- 语言：英语（六级623）, 德语, 拉丁语",
      awards: "- 大学英语六级623；托福113\n- 北京邮电大学二等奖学金（前10%），2021 & 2022\n- 美国大学生数学建模竞赛Meritorious奖（前10%），2022\n- 北京邮电大学大学生创新创业竞赛二等奖，2021\n- 全国实用英语竞赛北京赛区冠军，2017"
    },
    en: {
      about: "I am a humble geek pursuing a master's degree in Computer Science (Artificial Intelligence) at the University of Hamburg. My interests lie in large language models, multi-modal systems and robotics. I enjoy building efficient and robust AI systems and collaborating across disciplines.",
      contact: "Phone: +86 15210812512\nEmail: hantaozhouted@gmail.com",
      education: "- M.Sc. in Computer Science (AI), University of Hamburg, Germany (Oct 2023 – Nov 2025). GPA 91/100 (1.8/5.0). Focus on large language model applications and fundamentals.\n- B.Eng. in Intelligent Science & Technology, Beijing University of Posts and Telecommunications (Sep 2019 – Jun 2023). GPA 88.55/100 (Top 10%). Awarded multiple second-class scholarships. Thesis on multi-modal large models for enzyme-catalyzed chemical reaction analysis.",
      experience: "- Midea (Shanghai Global Innovation HQ) – AI Algorithm Engineer (Jun 2025 – Dec 2025). Led system-level acceleration and algorithm framework development for multi-modal large models in robot decision-making tasks. Improved inference and training efficiency through scheduling, operator fusion, memory reuse and parallelism, achieving up to 7× throughput improvement. Designed a unified decision training framework compatible with various policies and training paradigms, and collaborated across teams to build end-to-end pipelines.\n- Matrix Infinity Tech (Beijing) – Large Model Optimization Expert (Mar 2025 – Jun 2025). Optimised large language models for high-concurrency workloads by restructuring models and reducing redundant computation. Built distributed deployment solutions, improved system throughput by more than 2× and reduced latency to meet business requirements.\n- Cauliflower AI (Hamburg) – LLM Intern (Sep 2024 – Nov 2024). Contributed to the research and development of large language models.",
      projects: "- Master’s Robotics Project (Oct 2023 – Dec 2024). Designed and implemented a control decision system based on multi-modal large models and published the work at MFMEAI@ICML 2024.\n- Multi-modal LLM for Enzyme-Catalyzed Reaction Analysis (Jul 2022 – Jun 2023). Research assistant at THUNLP (Tsinghua University) exploring multi-modal large models for understanding enzyme-catalysed chemical reactions.",
      skills: "- Programming: Python, Matlab, C++, C, Lisp, WebAssembly (Emscripten), CUDA, JavaScript, TypeScript, Lua, Java, Ruby\n- Frameworks & Libraries: PyTorch, Transformers (Hugging Face), Scikit-learn, SciPy, Pandas, Numpy (and CuPy), Tilelang\n- Tools: Linux, macOS, Nix, ROS 1/2, Shell (GNU Coreutils & BusyBox), (Neo)Vim, (Spac)Emacs, Tmux, Git, GitHub, GitLab, Docker, Kubernetes, LaTeX, Markdown, Typst\n- Languages: English (CET-6 623), German, Latin",
      awards: "- CET-6: 623; TOEFL: 113\n- Second-Class Scholarship, Beijing University of Posts and Telecommunications (Top 10%), 2021 & 2022\n- Meritorious Awards (top 10%), Mathematical Contest in Modeling, 2022\n- Second Prize, University Innovation & Entrepreneurship Competition, BUPT, 2021\n- Champion, National Practical English Contest, Beijing, 2017"
    }
  };

  let currentLang = 'zh';
  let terminalContainer;

  document.addEventListener('DOMContentLoaded', () => {
    terminalContainer = document.querySelector('.terminal-container');
    if (window.initTerminal) {
      window.initTerminal(terminalContainer);
    }
  });

  commandDispatcher.registerCommand(
    'cat',
    async (args) => {
      if (args.length < 1) {
        throw new Error("Usage: cat <section>");
      }
      const section = args[0];
      const content = data[currentLang][section];
      if (!content) {
        return `Section not found: ${section}`;
      }
      return content;
    },
    "Display content of a section."
  );

  commandDispatcher.registerCommand(
    'lang',
    async (args) => {
      if (args.length < 1) {
        throw new Error("Usage: lang <en|zh>");
      }
      const lang = args[0].toLowerCase();
      if (lang !== 'en' && lang !== 'zh') {
        throw new Error("Unsupported language. Use 'en' or 'zh'.");
      }
      currentLang = lang;
      if (terminalContainer && typeof terminalContainer.clearTerminal === 'function') {
        terminalContainer.clearTerminal();
      }
      return lang === 'en' ? 'Language switched to English.' : '语言已切换为中文。';
    },
    "Switch language (en or zh) and clear the screen."
  );
  commandDispatcher.registerCommand(
    'english',
    async () => {
      currentLang = 'en';
      if (terminalContainer && typeof terminalContainer.clearTerminal === 'function') {
        terminalContainer.clearTerminal();
      }
      return 'Language switched to English.';
    },
    'Switch to English and clear the screen.'
  );

  commandDispatcher.registerCommand(
    'chinese',
    async () => {
      currentLang = 'zh';
      if (terminalContainer && typeof terminalContainer.clearTerminal === 'function') {
        terminalContainer.clearTerminal();
      }
      return '语言已切换为中文。';
    },
    '切换到中文并清空屏幕。'
  );
})();
