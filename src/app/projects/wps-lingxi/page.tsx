'use client'
import ProjectLayout from "@/components/ProjectLayout"
import Image from 'next/image'
import './styles.css'
import coverLingxi from '@/assets/images/wps-lingxi/cover-lingxi.png'
import inputStacks from '@/assets/images/wps-lingxi/input-stacks.png'
import inlineMenu from '@/assets/images/wps-lingxi/inline-menu.png'
import inlineContext from '@/assets/images/wps-lingxi/inline-context.png'
import inlineInput from '@/assets/images/wps-lingxi/inline-input.png'
import processStop from '@/assets/images/wps-lingxi/process-stop.png'
import processStopText from '@/assets/images/wps-lingxi/process-stop-text.png'
import processExpanded from '@/assets/images/wps-lingxi/process-expanded.png'
import outputSource from '@/assets/images/wps-lingxi/output-source.png'
import outputDebug from '@/assets/images/wps-lingxi/output-debug.png'
import wpsAiRibbon from '@/assets/images/wps-lingxi/wps-ai-ribbon.png'
import uiSidepane from '@/assets/images/wps-lingxi/ui-sidepane.png'
import lingxiOld from '@/assets/images/wps-lingxi/lingxi-old.png'
import inputHomepage from '@/assets/images/wps-lingxi/input-homepage.png'
import inputPpT from '@/assets/images/wps-lingxi/input-ppt.png'
import copilotPpt from '@/assets/images/wps-lingxi/copilot-ppt.png'
// 视频文件直接从 public 目录引用




export default function WpsLingxiReportPage() {
  return (
    <ProjectLayout>
      <div className="fixed inset-0 z-10 backdrop-blur-sm">
        <div className="absolute inset-0 overflow-y-auto">
          <main className="px-4 sm:px-8 py-6 text-white">
          <div className="max-w-[886px] mx-auto mt-8">
            {/* Title */}
            <h1 className="wps-lingxi-title">
              WPS 灵犀
            </h1>
            <p className="mt-3 text-base sm:text-base text-left">
              陈传林主导了全新 WPS 灵犀的设计，涉及 AI Agent、LUI + Canvas 等技术，WPS 灵犀 Copilot 已在 WPS PC 客户端运行。
            </p>
          </div>

          {/* WPS 灵犀封面 */}
          <div className="mt-8 mx-auto relative w-full sm:w-[1024px] aspect-[2/1] rounded-[40px] overflow-hidden">
            <Image src={coverLingxi} alt="WPS 灵犀封面" fill className="object-cover" placeholder="blur" sizes="(max-width: 1024px) 100vw, 1024px" priority />
          </div>

          <div className="max-w-[886px] mx-auto">
            {/* Section: 项目背景 */}
            <section className="mt-[120px]">
              <h2 className="text-2xl font-semibold text-center">项目背景</h2>
              <div className="mt-8  leading-7 text-base sm:text-base space-y-4">
                <p>
                2024 年在 Canvas 与通用 AI Agent 兴起的背景下，WPS 从“AI助手”形态转向Agent + 办公套件深度绑定，据此立项 WPS 灵犀（WPS AI 3.0）。
                </p>
              </div>
            </section>
          </div>

          {/* WPS AI 1.0 占位 UI 控件集合 */}
          <div className="mt-8 mx-auto relative w-full sm:w-[1024px] aspect-[2/1] rounded-[40px] overflow-hidden bg-neutral-800/50 flex items-center justify-center">
            <Image src={wpsAiRibbon} alt="wpsAiRibbon" className="w-full h-auto" />
          </div>


          {/* Section: 洞察：WPS 用户怎么用 AI */} 
          <div className="max-w-[886px] mx-auto">
            <section className="mt-[120px]">
              <h2 className="text-2xl font-semibold text-center">洞察：WPS 用户怎么用 AI</h2>
              <ol className="list-decimal mt-8 text-base leading-7 space-y-1 pl-4">
               <li className='mt-4'>
                <span className='font-semibold '>意图入口分散，触达低，与任务心智不匹配</span> <br />
               <p className='text-neutral-300'>用户找入口耗时、跳出率高；用户从“要做什么”到“去哪做”缺少直达路径，一个任务里的多枚 AI 意图被分散到不同入口，触达非常低。</p>
               </li>
               <li className='mt-4'>
                <span className='font-semibold'>用户偏好可编辑、带格式的中间产物</span> <br />
                <p className='text-neutral-300'>一次成稿不如“结构正确、样式对齐、变量就位”的骨架更有用——便于快速完善与协作，显著降低返工成本。</p>
                </li>
               <li className='mt-4'>
                <span className='font-semibold'>创作是长过程，控制感优先于单次质量</span> <br />
                <p className='text-neutral-300'>长文档/跨组件即长上下文多轮协作；需就地编辑、过程可视化与可溯源，才能稳住节奏与信心。</p>
                </li> 
              </ol>

            </section>  
          </div>

          {/* Illustration for 框架 section at 1024px container 
          <div className="mt-8 mx-auto relative w-full sm:w-[1024px] aspect-[2/1] rounded-[40px] overflow-hidden bg-neutral-800/50 flex items-center justify-center">
            <span className="text-base">占位</span>
          </div>
          */}

          {/* Section: 发现真正的WPS AI用户旅程 */}
          <div className="max-w-[886px] mx-auto">
            <section className="mt-[120px]">
              <h2 className=" text-2xl font-semibold text-center">真正的 WPS AI 用户旅程</h2>
            </section>
            </div>

            {/* 用户旅程表格 */}
            <div className="mt-8 mx-auto w-full sm:w-[1024px]">
              <div className="bg-neutral-800/30 rounded-[40px] p-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm rounded-xl overflow-hidden">
                    <thead>
                      <tr className="border-b border-neutral-600">
                        <th className="text-center py-3 px-2 text-white font-semibold  rounded-tl-xl">阶段</th>
                        <th className="text-center py-3 px-2 text-white font-semibold bg-neutral-600/20">启动</th>
                        <th className="text-center py-3 px-2 text-white font-semibold">生成</th>
                        <th className="text-center py-3 px-2 text-white font-semibold bg-neutral-600/20">编辑</th>
                        <th className="text-center py-3 px-2 text-white font-semibold">跨组件协作</th>
                        <th className="text-center py-3 px-2 text-white font-semibold bg-neutral-600/20 rounded-tr-xl">交付</th>
                      </tr>
                    </thead>
                    <tbody className="text-neutral-300">
                      <tr className="border-b border-neutral-700">
                        <td className="py-3 px-2 text-center font-medium text-white ">行为</td>
                        <td className="py-3 px-2 text-center bg-neutral-600/20">打开 / 找入口</td>
                        <td className="py-3 px-2 text-center">发指令</td>
                        <td className="py-3 px-2 text-center bg-neutral-600/20">多次修改</td>
                        <td className="py-3 px-2 text-center">文档 ↔ PPT ↔ 表格</td>
                        <td className="py-3 px-2 text-center bg-neutral-600/20">预览 / 修正</td>
                      </tr>
                      <tr className="border-b border-neutral-700">
                        <td className="py-3 px-2 text-center font-medium text-white ">痛点</td>
                        <td className="py-3 px-2 text-center bg-neutral-600/20">入口分散 / 路长</td>
                        <td className="py-3 px-2 text-center">一次生成不符 / 返工</td>
                        <td className="py-3 px-2 text-center bg-neutral-600/20">工具切换多 / 断流</td>
                        <td className="py-3 px-2 text-center">体验与格式不一致</td>
                        <td className="py-3 px-2 text-center bg-neutral-600/20">修正耗时 / 易错</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-2 text-center font-medium text-white  rounded-bl-xl">机会点：灵犀介入</td>
                        <td className="py-3 px-2 text-center text-blue-300 bg-neutral-600/20">(灵犀主站)<br/>Chat+ 意图分发</td>
                        <td className="py-3 px-2 text-center text-blue-300">(灵犀主站) <br/>启发式中间产物</td>
                        <td className="py-3 px-2 text-center text-blue-300 bg-neutral-600/20">(灵犀 Copilot)<br/>LUI 边聊边改</td>
                        <td className="py-3 px-2 text-center text-blue-300">(灵犀 Copilot)<br/>跨组件协作</td>
                        <td className="py-3 px-2 text-center text-blue-300 bg-neutral-600/20 rounded-br-xl">(灵犀 Copilot 指令遵循) <br/>样式保留 / 智能优化</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>


          {/* Section: 体验目标 */}
          <div className="max-w-[886px] mx-auto">
            <section className="mt-[120px]">
              <h2 className="text-2xl font-semibold text-center">体验目标</h2>
              <div className="mt-8 leading-7 text-base sm:text-base">
              我们把“AI做得更快/更稳/更顺”的模糊期待，落成可被验证的体验目标：
              <ul className="list-disc mt-3 text-base leading-7 space-y-1">
                <li className='text-neutral-300'><span className='font-semibold text-white'>启动更轻</span>。聚合五类高频意图为直达入口，提供起手式引导，缩短“想做什么→去哪做”的距离。</li>
                <li className='text-neutral-300'><span className='font-semibold text-white'>生成更可控</span>。在多数场景里，用户可以直接沿着“框架→细化”继续，而不是推翻重来</li>
                <li className='text-neutral-300'><span className='font-semibold text-white'>编辑不中断</span>。组件内 Copilot 在场协作，长上下文持久，过程可视化与可溯源，减少跨工具往返。</li>
              </ul>
              </div>
            </section>
            </div>


                {/* Section: 度量口径 
                <div className="max-w-[886px] mx-auto">
                <section className="mt-[120px]">
                  <h2 className="text-2xl font-semibold text-center">度量口径</h2>
                </section>
                </div>
                */}

                {/* 度量口径表格 
                <div className="mt-8 mx-auto w-full sm:w-[1024px]" >
                  <div className="bg-neutral-800/30 rounded-[40px] p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-neutral-600">
                            <th className="text-center py-3 px-4 text-white font-semibold w-1/3">启动更轻</th>
                            <th className="text-center py-3 px-4 text-white font-semibold w-1/3">生成更可控</th>
                            <th className="text-center py-3 px-4 text-white font-semibold w-1/3">编辑不中断</th>
                          </tr>
                        </thead>
                        <tbody className="text-neutral-300">
                          <tr className="border-b border-neutral-700">
                            <td className="py-3 px-4 text-center">起步阶段跳出率降低</td>
                            <td className="py-3 px-4 text-center">中间产物采纳率提升</td>
                            <td className="py-3 px-4 text-center">跨工具切换次数降低</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 text-center">首轮采纳率提升</td>
                            <td className="py-3 px-4 text-center">返工轮次降低</td>
                            <td className="py-3 px-4 text-center">长会话留存率提升</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                */}



          {/* Section: 设计方案 */}
          <div className="max-w-[886px] mx-auto">
            <section className="mt-[120px]">
              <h2 className="text-2xl font-semibold text-center">设计方案</h2>
              <div className="mt-8 leading-7 text-base sm:text-base">
              我们将 AI 从“工具箱”重构为“生产线的两条路径”——主站负责从 0→1 的框架优先创作，组件内 Copilot 负责从 1→10 的在场协作。
              <br />
              由此，入口聚合让启动更轻；框架优先带来生成更可控；组件绑定保障编辑不中断。
              </div>
            </section>
          </div>


          {/* 灵犀主站改版 */}
          <div className="max-w-[886px] mx-auto">
            <section className="mt-[120px]">
              <h2 className="text-2xl font-semibold">灵犀主站改版</h2>
              <div className="mt-4 leading-7 font-semibold text-base sm:text-base">
              旧版灵犀首页的三个主要问题：<br />
              <ol className="list-decimal mt-3 text-base leading-7 space-y-3 pl-4 text-neutral-300">
              <li><span className="font-semibold text-white">最近创作无法接力/转下一步</span> <br />
              只是“记录列表”，没有一键续写、转下一步或跨组件接力。
                </li> 
              <li><span className="font-semibold text-white">意图推荐不命中场景，教育价值低</span> <br />
              推荐与当前语境脱节，停留在泛化能力标签；场景不匹配、内容太泛；既不指导操作，也不建立心智。
              </li>

              <li><span className="font-semibold text-white">巨幅 Banner 不承载任务</span> <br />
               占据首屏黄金位却不提供导航或操作；主任务让位于装饰，首屏效率被稀释。
               </li>
              </ol>

              </div>
            </section>
          </div>

          {/* 灵犀旧版问题占位 */}
          <div className="mt-8 mx-auto relative w-full sm:w-[1024px] aspect-[2/1] rounded-[40px] overflow-hidden bg-neutral-800/50 flex items-center justify-center">
            <Image src={lingxiOld} alt="lingxiOld" className="w-full h-auto" />
          </div>

          <div className="max-w-[886px] mx-auto">
            <section className="mt-16">
              <div className="mt-4 leading-7 text-base sm:text-base">
              最初首页入口分散，后期收敛为 Chat + 核心意图分发。
              </div>

              <ol className="list-decimal mt-3 text-base leading-7 space-y-3 pl-4 text-neutral-300">
              <li><span className="font-semibold text-white">单一起手</span> <br />
              只保留 Chat 作为默认入口，避免“去哪做”的选择成本。
              </li>

              <li><span className="font-semibold text-white">意图卡片</span> <br />
              核心创作与文档解读被前置为卡片，减少选择成本，直达起手。
              </li>
              </ol>
            </section>
          </div>

            
          {/* 灵犀新版首页占位 */}
          <div className="mt-8 mx-auto relative w-full sm:w-[1024px] aspect-[2/1] rounded-[40px] overflow-hidden bg-neutral-800/50 flex items-center justify-center">
          <Image src={inputHomepage} alt="inputHomepage" className="w-full h-auto" />
          </div>



          {/* 灵犀新版首页占位 */}
          <div className="mt-8 mx-auto relative w-full sm:w-[1024px] aspect-[2/1] rounded-[40px] overflow-hidden bg-neutral-800/50 flex items-center justify-center">
            <Image src={inputPpT} alt="inputPpT" className="w-full h-auto" />
            </div>

          {/* 灵犀Copilot */}
          <div className="max-w-[886px] mx-auto">
            <section className="mt-[120px]">
              <h2 className="text-lg font-semibold">灵犀Copilot</h2> 
              <div className="mt-4 leading-7 text-base sm:text-base">
              灵犀不是“另一个 Copilot”，而是深度绑定 WPS 套件的在场智能体：在场、懂上下文、可接力。
              </div>
            </section>
          </div>


          {/* 文字组件弹出Copilot侧边栏 */}
          <div className="mt-8 mx-auto relative w-full sm:w-[1024px] aspect-[2/1] rounded-[40px] overflow-hidden bg-neutral-800/50 flex items-center justify-center">
              <Image src={coverLingxi} alt="coverLingxi" className="w-full h-auto" />
          </div>

          {/* ppt组件弹出Copilot侧边栏 */}
          <div className="mt-8 mx-auto relative w-full sm:w-[1024px] aspect-[2/1] rounded-[40px] overflow-hidden bg-neutral-800/50 flex items-center justify-center">
          <Image src={copilotPpt} alt="copilotPpt" className="w-full h-auto" />
          </div>

          {/* Copilot侧边栏控件合集，文字，表格，PPT中侧边栏的UI */} 
          <div className="mt-8 mx-auto relative w-full sm:w-[1024px] aspect-[2/1] rounded-[40px] overflow-hidden bg-neutral-800/50 flex items-center justify-center">
          <Image src={uiSidepane} alt="uiSidepane" className="w-full h-auto" />
          </div>




          {/* 灵犀Copilot */}
          <div className="max-w-[886px] mx-auto">
            <section className="mt-16">
              <h2 className="text-lg font-semibold">灵犀 Inline AI</h2> 
              <div className="mt-4 leading-7 text-base sm:text-base">
              Inline AI 与 Copilot 的在场协作。
              </div>
            </section>
          </div>

           {/* inlineInput */}
           <div className="mt-8 mx-auto relative w-full sm:w-[1024px] aspect-[2/1] rounded-[40px] overflow-hidden bg-neutral-800/50 flex items-center justify-center">
           <Image src={inlineInput} alt="inlineInput" className="w-full h-auto" />
           </div>

           {/* 双列图片展示 */}
           <div className="mt-8 mx-auto w-full sm:w-[1024px] grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden">
               <Image src={inlineMenu} alt="inlineMenu" fill className="object-cover" />
             </div>
             <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden">
               <Image src={inlineContext} alt="inlineContext" fill className="object-cover" />
             </div>
           </div>

           {/* AI UX 的设计要点 */}
           <div className="max-w-[886px] mx-auto">
            <section className="mt-[120px]">
              <h2 className="text-lg font-semibold ">AI UX 的设计要点</h2>
              <div className="mt-4 leading-7 text-base sm:text-base">
              <span className="font-semibold text-[#76B0FF]">起手式：AI输入框的设计。</span>
              选取嗅探。上传文件。个性参数设定。
              </div>
              <ol className="list-decimal mt-3 text-base leading-7 space-y-3 pl-4 text-neutral-300">
              <li><span className="font-semibold text-white">单一入口</span> <br />
              只保留一个输入框说“要做什么”；其它能力用「+」和技能按钮收纳（上传参考/意图切换/参数设定）。
              </li>

              <li><span className="font-semibold text-white">选取嗅探</span> <br />
              支持“选区 / 文件 / 知识库”，并在输入框下方推荐问题，降低跑题概率。
              </li>
              </ol>
            </section>
           </div>

           {/* 起手式，AI输入框的设计。选取嗅探。上传文件。个性参数设定。 */}
           <div className="mt-8 mx-auto relative w-full sm:w-[1024px] aspect-[2/1] rounded-[40px] overflow-hidden">
           <Image src={inputStacks} alt="inputStacks" fill className="object-cover" />
           </div>

           {/* 生成过程的可视化 */}
           <div className="max-w-[886px] mx-auto mt-6">
              <div className="mt-16 leading-7  text-base sm:text-base">
              <span className="font-semibold text-[#76B0FF]">生成过程的可视化。</span>
              <br />
              大语言模型返回结果总是需要一些时间，利用等待阶段可视化“AI在做什么”（步骤/进度/耗时/可中断），让用户预判结果是否对路，降低焦虑，提升信任与可控感。
              </div>
             
           </div>
           

           {/* 生成过程的可视化 */}
           <div className="mt-8 mx-auto relative w-full sm:w-[1024px] aspect-[2/1] rounded-[40px] overflow-hidden">
           <video src="/videos/loading-loop.mp4" autoPlay loop muted playsInline className="w-full h-auto" />
           </div>


           {/* 双列图片展示 */}
           <div className="mt-8 mx-auto w-full sm:w-[1024px] grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden">
               <Image src={processStop} alt="processStop" fill className="object-cover" />
             </div>
             <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden">
               <Image src={processStopText} alt="processStopText" fill className="object-cover" />
             </div>
           </div>

           {/* 生成过程的可视化 */}
           <div className="mt-8 mx-auto relative w-full sm:w-[1024px] aspect-[2/1] rounded-[40px] overflow-hidden">
           <Image src={processExpanded} alt="processExpanded" fill className="object-cover" />
           </div>

           {/* 结果对比、溯源 */}
           <div className="max-w-[886px] mx-auto mt-6">
              <div className="mt-16 leading-7 text-base  font-semibold sm:text-base">
              <span className="font-semibold text-[#76B0FF]">结果对比、溯源。</span>
              <br />
              让结果可核验、可比较、可回退：同时展示简要推理链与明确来源，便于自查真伪，降低幻觉风险，提升信任与可控感。
              </div>

              
           </div>
          {/* 双列图片展示 */}
          <div className="mt-8 mx-auto w-full sm:w-[1024px] grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden">
               <Image src={outputDebug} alt="outputDebug" fill className="object-cover" />
             </div>
             <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden">
               <Image src={outputSource} alt="outputSource" fill className="object-cover" />
             </div>
           </div>


           {/* 结果 */}
           <div className="max-w-[886px] mx-auto">
            <section className="mt-[120px]">
              <h2 className="text-2xl font-semibold text-center">结果</h2>
              <div className="mt-8 leading-7 text-base sm:text-base">
              主站改版后，意图分流把用户从“纯 Chat”有效引到“创作/协作”路径——纯 Chat 占比由过往的高位（&gt;70%）显著下降，创作类意图占比与有效结果采纳率同步提升，核心用户留存呈上行。<br />
              <br />
              用户反馈中，用户多数认为新版的灵犀主站界面更简洁，各类更好找。总体评价较为正向。
              <br />
              <br />
              WPS PC 端的灵犀 LUI 于 2025 年 7 月在上海世界人工智能大会发布，获得大会现场热烈反响和多个媒体报道。8 月当月日活用户实现接近 30W（全量曝光后，预计DAU将增长至300W）。
              </div>
            </section>
          </div>

           {/* 反思与未来 */}
           <div className="max-w-[886px] mx-auto">
            <section className="mt-[120px]">
              <h2 className="text-2xl font-semibold text-center">反思与未来</h2>
              <div className="mt-8 leading-7 text-base sm:text-base">
              把 AI 放在生产线里，并不意味着“交给它就完了”。在生成质量上，我们仍看到模型带来的波动；为此我们在界面里加入“范例提示/意图分解”来降低输入歧义，和算法团队一起迭代。对新用户来说，“对话式编辑”是一种新心智，我们用渐进式引导建立信心。 <br />
              <br />
              展望下一步：让一致性变成可复用的设计体系（同入口、同语法、同反馈的规则库），把多模态输入（截图、选区嗅探，语音交互）接入 LUI；并把能力延展到会议、知识库等协作场景，让“不中断的生产”发生在更多地方。
              </div>
              <div className="text-2xl font-semibold my-12"> <div className="inline-block pr-3">试试用WPS灵犀进行创作</div>  <a href="https://lingxi.wps.cn/" target="_blank" className="text-[#76B0FF] hover:underline hover:text-[#769dff]">https://lingxi.wps.cn/</a></div>
            </section>
          </div>
        </main>
      </div>
    </div>
    </ProjectLayout>
  )
}

