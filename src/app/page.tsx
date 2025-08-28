'use client';

import { useState } from 'react';
import WinBoxButton from "../components/WinBoxButton";
import RippleCanvas from "../components/RippleCanvas";

export default function Home() {
  const [lang, setLang] = useState<'en' | 'zh'>('en');

  return (
    <main className="container">
      <RippleCanvas />
      <header>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <h1 className="serif" style={{ margin: 0 }}>
            {lang === 'en' ? 'Hantao Zhou' : '周涵韬'}
          </h1>
          <button onClick={() => setLang((l) => (l === 'en' ? 'zh' : 'en'))} aria-label="Toggle language">
            {lang === 'en' ? '切换到中文' : 'Switch to English'}
          </button>
        </div>
        <p className="mono">
          <code>hantaozhouted@gmail.com</code> · <code>+86 152 1081 2512</code>
        </p>
        {lang === 'en' ? (
          <blockquote>
            Measuring progress by <span className="highlight">impact</span>, not lines of code. <span className="highlight">AI systems</span>, <span className="highlight">LLMs</span>, and <span className="highlight">robotics</span> — from algorithms to production
            <span className="cursor" aria-hidden>▌</span>
          </blockquote>
        ) : (
          <blockquote>
            以<span className="highlight">影响</span>衡量进展，不以代码行数。专注 <span className="highlight">AI 系统</span>、<span className="highlight">LLM</span> 与 <span className="highlight">机器人</span>，从算法到落地
            <span className="cursor" aria-hidden>▌</span>
          </blockquote>
        )}
        <nav aria-label="Primary">
          <ul>
            {lang === 'en' ? (
              <>
                <li><a href="#about">About</a></li>
                <li><a href="#education">Education</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#awards">Awards</a></li>
                <li><a href="#contact">Contact</a></li>
              </>
            ) : (
              <>
                <li><a href="#about">关于</a></li>
                <li><a href="#education">教育</a></li>
                <li><a href="#skills">技能</a></li>
                <li><a href="#experience">经历</a></li>
                <li><a href="#projects">项目</a></li>
                <li><a href="#awards">奖项</a></li>
                <li><a href="#contact">联系</a></li>
              </>
            )}
          </ul>
        </nav>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {lang === 'en' ? (
            <>
              <WinBoxButton
                label="Open About Window"
                title="About Hantao"
                html={`<p>LLM systems engineer focused on performance, reliability, and human‑in‑the‑loop decision‑making for robotics.</p>`}
              />
              <WinBoxButton
                label="Open Contact Window"
                title="Contact"
                html={`<p>Email: <a href="mailto:hantaozhouted@gmail.com">hantaozhouted@gmail.com</a><br/>Phone: +86 152 1081 2512</p>`}
                options={{ width: 360, height: 180 }}
              />
            </>
          ) : (
            <>
              <WinBoxButton
                label="打开关于窗口"
                title="关于周涵韬"
                html={`<p>专注 LLM 系统工程，关注性能、可靠性与人机协同在机器人决策中的落地。</p>`}
              />
              <WinBoxButton
                label="打开联系方式"
                title="联系方式"
                html={`<p>邮箱：<a href="mailto:hantaozhouted@gmail.com">hantaozhouted@gmail.com</a><br/>电话：+86 152 1081 2512</p>`}
                options={{ width: 360, height: 180 }}
              />
            </>
          )}
        </div>
      </header>

      {lang === 'en' ? (
        <>
          <section id="about">
            <h2>About</h2>
            <p>
              I build AI systems that bridge research and production. My recent
              work optimizes multimodal LLMs for robot decision-making across
              model, system, and task layers — improving end-to-end latency,
              throughput, and robustness.
            </p>
          </section>

          <section id="education">
            <h2>Education</h2>
            <table>
              <thead>
                <tr>
                  <th>Institution</th>
                  <th>Degree</th>
                  <th>Period</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>University of Hamburg (DE)</td>
                  <td>M.Sc. Computer Science (AI)</td>
                  <td>2023‑10 – 2025‑11 (exp.)</td>
                  <td>GPA 91/100 (≈1.8/5.0); thesis: Characterization of Non‑Markovian Random Walks</td>
                </tr>
                <tr>
                  <td>Beijing University of Posts and Telecommunications</td>
                  <td>B.Eng. Intelligent Science and Technology</td>
                  <td>2019‑09 – 2023‑06</td>
                  <td>GPA 88.55/100 (Top 10%), multiple 2nd‑class scholarships</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="skills">
            <h2>Skills</h2>
            <h3>Languages & Frameworks</h3>
            <ul>
              <li><span className="highlight">Python</span>, C/C++, JavaScript/TypeScript, Java, Ruby, Lua, Lisp, Matlab, WebAssembly (Emscripten)</li>
              <li>PyTorch, Triton, CUDA, HuggingFace Transformers, scikit‑learn, SciPy, Pandas, NumPy/CuPy, TileLang</li>
              <li>English, German, Latin</li>
            </ul>
            <h3>Tools</h3>
            <ul>
              <li>Linux, macOS, Nix, ROS1/2, Shell (GNU coreutils & BusyBox), Vim/Neovim, Emacs, Tmux</li>
              <li>GitHub/GitLab, Docker, Kubernetes</li>
              <li>LaTeX, Markdown, Typst</li>
            </ul>
          </section>

          <section id="experience">
            <h2>Experience</h2>
            <h3>Midea Group (Shanghai Global Innovation HQ) — Algorithm Engineer</h3>
            <p>2025‑06 – 2025‑12</p>
            <ul>
              <li>Led system‑level acceleration and framework design for multimodal LLMs in robotic decision tasks across model–system–task layers.</li>
              <li>Orchestrated compute scheduling, operator fusion, JIT, memory reuse, batching/pipelining; achieved 7× throughput with lower latency.</li>
              <li>Resolved accuracy drift after Dynamo→Triton backend compilation by optimizing fusion and scheduling strategies.</li>
              <li>Designed a unified decision‑training framework supporting IL, Offline RL, and Online RL with heterogeneous data flows and metrics.</li>
              <li>Drove cross‑team delivery from data collection to deployment and monitoring; standardized tooling and documentation.</li>
            </ul>

            <h3>Juliang Infinity Tech (Beijing) Co., Ltd. — LLM Optimization Expert</h3>
            <p>2025‑03 – 2025‑06</p>
            <ul>
              <li>Optimized large‑scale language models for high‑concurrency inputs; improved responsiveness and stability at 1k+ concurrent requests.</li>
              <li>Refactored model structure to reduce redundant computation with no accuracy loss; {'>'}30% faster inference.</li>
              <li>Built distributed deployment with load balancing for large inputs; {'>'}2× throughput increase.</li>
              <li>Partnered with Eng/Algo to meet strict latency SLOs consistently.</li>
            </ul>
          </section>

          <section id="projects">
            <h2>Projects</h2>
            <h3>Robotics Decision‑Making with Multimodal LLMs — University of Hamburg</h3>
            <p>2024‑09 – 2024‑11</p>
            <ul>
              <li>Designed and implemented a multimodal LLM‑based control and decision system; presented at <span className="highlight">MFMEAI@ICML 2024</span>.</li>
            </ul>

            <h3>Enzymatic Reaction Analysis with Multimodal LLMs — THUNLP, Tsinghua</h3>
            <p>2022‑07 – 2023‑06</p>
            <ul>
              <li>Built a multimodal pipeline to analyze enzymatic chemical reactions using large models; authored under the THUNLP lab.</li>
            </ul>
          </section>

          <section id="awards">
            <h2>Awards & Certificates</h2>
            <ul>
              <li>CET‑6: 623; TOEFL: 113</li>
              <li>2nd‑Class Scholarship, BUPT — 2021, 2022 (Top 10%)</li>
              <li>Mathematical Contest in Modeling (MCM), Meritorious Award — 2022</li>
              <li>University Innovation & Entrepreneurship Competition, 2nd Prize — 2021</li>
              <li>National Practical English Competition, Champion (Beijing) — 2017</li>
            </ul>
          </section>

          <section id="contact">
            <h2>Contact</h2>
            <p>
              Email: <a href="mailto:hantaozhouted@gmail.com">hantaozhouted@gmail.com</a>
              <br />
              Phone: <a href="tel:+8615210812512">+86 152 1081 2512</a>
            </p>
          </section>
        </>
      ) : (
        <>
          <section id="about">
            <h2>关于</h2>
            <p>
              我专注于把 AI 系统从研究推进到生产。近期工作围绕多模态大模型在机器人决策中的落地，从模型、系统到任务三层优化端到端时延、吞吐与鲁棒性。
            </p>
          </section>

          <section id="education">
            <h2>教育经历</h2>
            <table>
              <thead>
                <tr>
                  <th>院校</th>
                  <th>学位</th>
                  <th>时间</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>德国汉堡大学</td>
                  <td>计算机科学（人工智能）硕士</td>
                  <td>2023‑10 – 2025‑11（预计）</td>
                  <td>GPA 91/100（约 1.8/5.0）；论文：非马尔可夫随机游走特性分析</td>
                </tr>
                <tr>
                  <td>北京邮电大学</td>
                  <td>智能科学与技术 工学学士</td>
                  <td>2019‑09 – 2023‑06</td>
                  <td>GPA 88.55/100（专业前 10%），多次校级二等奖学金</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="skills">
            <h2>技能</h2>
            <h3>语言与框架</h3>
            <ul>
              <li>Python、C/C++、JavaScript/TypeScript、Java、Ruby、Lua、Lisp、Matlab、WASM（Emscripten）</li>
              <li>PyTorch、Triton、CUDA、Transformers、scikit‑learn、SciPy、Pandas、NumPy/CuPy、TileLang</li>
              <li>英语、德语、拉丁语</li>
            </ul>
            <h3>工具</h3>
            <ul>
              <li>Linux、macOS、Nix、ROS1/2、Shell（GNU coreutils/BusyBox）、Vim/Neovim、Emacs、Tmux</li>
              <li>GitHub/GitLab、Docker、Kubernetes</li>
              <li>LaTeX、Markdown、Typst</li>
            </ul>
          </section>

          <section id="experience">
            <h2>实习经历</h2>
            <h3>美的集团（上海全球创新总部）— 算法工程师</h3>
            <p>2025‑06 – 2025‑12</p>
            <ul>
              <li>主导多模态大模型在机器人任务中的系统级加速与框架建设，贯穿模型‑系统‑任务三层。</li>
              <li>统筹算力调度、算子融合、即时编译、显存复用与批处理/流水线并行等优化，显著降低时延、提升吞吐与稳定性（吞吐提升 7×）。</li>
              <li>解决 Dynamo 编译到 Triton 后的精度偏差，优化融合与调度策略，平衡精度与性能。</li>
              <li>设计统一的决策训练框架，兼容 IL / Offline RL / Online RL，支持异构数据流与指标。</li>
              <li>跨团队协作落地，从数据到部署与监控形成闭环，沉淀标准化工具链与文档。</li>
            </ul>

            <h3>矩量无限科技（北京）— 大模型优化专家</h3>
            <p>2025‑03 – 2025‑06</p>
            <ul>
              <li>面向高并发输入场景优化大规模语言模型，在千级并发下提升响应速度与稳定性。</li>
              <li>在保证精度的前提下重构模型结构，减少冗余计算，推理速度提升超过 30%。</li>
              <li>搭建分布式集群与负载均衡方案，应对大输入量场景，系统吞吐能力提升至 2× 以上。</li>
              <li>与工程/算法团队协作，稳定满足业务延迟指标。</li>
            </ul>
          </section>

          <section id="projects">
            <h2>项目经历</h2>
            <h3>基于多模态大模型的机器人决策 — 汉堡大学</h3>
            <p>2024‑09 – 2024‑11</p>
            <ul>
              <li>设计并实现多模态 LLM 的控制决策系统，发表于 MFMEAI@ICML 2024。</li>
            </ul>

            <h3>基于多模态大模型的酶促化学反应解析 — 清华大学 THUNLP</h3>
            <p>2022‑07 – 2023‑06</p>
            <ul>
              <li>构建多模态管线解析酶促化学反应，完成研究与实现。</li>
            </ul>
          </section>

          <section id="awards">
            <h2>奖项与证书</h2>
            <ul>
              <li>CET‑6：623；TOEFL：113</li>
              <li>北京邮电大学二等奖学金（前 10%）：2021、2022</li>
              <li>美国大学生数学建模竞赛（MCM）一等奖（Meritorious Awards）：2022</li>
              <li>大学生创新创业大赛二等奖：2021</li>
              <li>全国实用英语竞赛冠军（北京）：2017</li>
            </ul>
          </section>

          <section id="contact">
            <h2>联系</h2>
            <p>
              邮箱：<a href="mailto:hantaozhouted@gmail.com">hantaozhouted@gmail.com</a>
              <br />
              电话：<a href="tel:+8615210812512">+86 152 1081 2512</a>
            </p>
          </section>
        </>
      )}
    </main>
  );
}
