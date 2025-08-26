'use client'
import ProjectLayout from "@/components/ProjectLayout"

export default function ProjectPage() {
  return (
    <ProjectLayout>
      <div className="fixed inset-0 z-10 backdrop-blur-sm ">
        <div className="absolute inset-0 overflow-y-auto">
          <div className="flex flex-col items-center text-white">
      {/* 页面最顶大标题 */}
      <div className="w-full px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center mt-[80px] mb-[70px]">
        <h1 className="text-center mb-[28px]" style={{ fontSize:32 , fontWeight: 700 }}>Prototyping in WPS</h1>
        <p className="text-center max-w-[1000px]">Protopie 是我最得力的原型设计工具，它让我能够快速构建交互原型并持续迭代优化。在 WPS，我制作了大量原型设计，这里精选了一些最具代表性的案例。这些原型主要使用 Protopie 完成，少数复杂交互则通过 JavaScript 实现。</p>
      </div>
      {/* 版心内容 */}
      <div className="mx-auto px-4 sm:px-6 md:px-8 w-full" style={{ maxWidth: 1000 }}>
        {/* 阶段/章节 */}
        <section className="mb-[70px] flex flex-col gap-[28px]">
          
        <figure className="flex flex-col gap-2">
            <video className="border border-neutral-800/60 rounded-xl w-full"
              src="/videos/quote.mp4"
              width={1200}
              height={400}
              controls
              muted
              playsInline
            />
            <figcaption className="text-sm text-neutral-300">WPS Copilot 片段引用概念</figcaption>
          </figure>


          <figure className="flex flex-col gap-2">
            <video className="border border-neutral-800/60 rounded-xl w-full"
              src="/videos/lingxi-concept.mp4"
              width={1200}
              height={400}
              controls
              muted
              playsInline
            />
            <figcaption className="text-sm text-neutral-300">灵犀 Concept</figcaption>
          </figure>



          <figure className="flex flex-col gap-2">
            <video className="border border-neutral-800/60 rounded-xl w-full"
              src="/videos/data.mp4"
              width={1200}
              height={400}
              controls
              muted
              playsInline
            />
            <figcaption className="text-sm text-neutral-300">WPS AI 表格数据分析</figcaption>
          </figure>

          <figure className="flex flex-col items-center gap-2">
            <video  className="rounded-[24px] border border-neutral-800/60 w-[320px] h-auto object-cover object-center mt-[16px]"
              src="/videos/rtc.mp4"
              width={320}
              height="auto"
              controls
              playsInline
            />
            <figcaption className="text-sm text-neutral-300">WPS 移动 RTC</figcaption>
          </figure>

          <figure className="flex flex-col items-center gap-2">
            <video  className="rounded-[24px] border border-neutral-800/60 w-[320px] h-auto object-cover object-center mt-[16px]"
              src="/videos/note.mp4"
              width={320}
              height="auto"
              controls
              muted
              playsInline
            />
            <figcaption className="text-sm text-neutral-300">WPS 移动录音笔记</figcaption>
          </figure>

          <figure className="flex flex-col items-center gap-2">
            <video  className="rounded-[24px] border border-neutral-800/60 w-[320px] h-auto object-cover object-center mt-[16px]"
              src="/videos/voice.mp4"
              controls
              muted
              playsInline
            />
            <figcaption className="text-sm text-neutral-300">WPS 录音笔记</figcaption>
          </figure>

          <figure className="flex flex-col gap-2">
              <video className="border border-neutral-800/60 rounded-xl w-full"
                src="/videos/ap多彩.mp4"
                width={1200}
                height={400}
                controls
                muted
                playsInline
              />
            <figcaption className="text-sm text-neutral-300">金山文档 AP</figcaption>
          </figure>
        </section>
      </div>
          </div>
        </div>
      </div>
    </ProjectLayout>
  );
}

