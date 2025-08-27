import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// A helper function to create a mock stream
function createMockStream(text: string) {
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      // Split the text into words for better streaming effect
      const words = text.split(' ');
      for (let i = 0; i < words.length; i++) {
        const word = words[i] + (i < words.length - 1 ? ' ' : '');
        // Send each word with the correct AI SDK stream format
        controller.enqueue(encoder.encode(`0:"${word}"\n`));
        await new Promise(resolve => setTimeout(resolve, 100)); // Simulate delay between words
      }
      controller.close();
    },
  });
  
  return new Response(readable, {
    headers: { 
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const forceMock = req.headers.get('x-use-mock') === '1';

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response("Missing messages", { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_TOKEN;

    console.log('API Key check:', { 
      hasKey: !!apiKey, 
      keyPrefix: apiKey?.substring(0, 10) + '...', 
      isDummy: apiKey === 'dummy-key-for-build' || apiKey === 'sk-or-v1-your-key-here' 
    });
    
    if (forceMock || !apiKey || apiKey === 'dummy-key-for-build' || apiKey === 'sk-or-v1-your-key-here') {
      console.log('Using mock stream response as no valid API key is present.');
      const lastUserMsg = messages.filter(m => m.role === 'user').pop()?.content || '';
      const mockText = `This is a mock streamed response for your prompt: "${lastUserMsg}". Please set a real OPENROUTER_API_TOKEN to use the actual AI service.`;
      const stream = createMockStream(mockText);
      return stream;
    }

    const openrouter = createOpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: apiKey,
    });

    // 保证有 system prompt
    const sysPrompt = { role: "system", content: `Charles（陈传林）是一名聚焦 AI × Office 领域的体验设计领导者，现任 WPS 灵犀（Copilot）设计负责人。拥有十余年 UX 与视觉设计经验，擅长战略规划、体系化设计和落地迭代，能够持续驱动创新与增长。

个人标签包括：体验设计专家、数据驱动决策、Figma & ProtoPie 深度玩家、宠物猫 Mumu 的奴才、GLSL Shader 与新媒介艺术爱好者。MBTI 类型为 INTP。

职业经历与项目成果：
1. WPS 灵犀（WPS AI 3.0）｜ 设计负责人
• 项目背景：2024 年在 Canvas 与通用 AI Agent 兴起的背景下，WPS 从“AI助手”形态转向智能体 + 办公套件深度绑定，据此立项 WPS 灵犀（WPS AI 3.0）。
• 主要贡献&项目成果：
◦ 主导从 0 到 1 WPS 灵犀整体产品交互架构和视觉设计，2024年6月落地上线，次月实现（超过30%用户周留存），优于市场一线竞品数据表现。
◦ 主导 WPS 灵犀全新版本设计改版，通过首页架构设计调整和采用全新AI 产品框架设计，于 2025年7月上线后，有效提升整体用户采纳率，用户周留存增长接近 5%。
◦ 主导从 0 到 1 WPS 灵犀 Copilot在 WPS PC端的LUI框架设计，将AI串联整个WPS 办公套件。于 2025 年 7 月在上海世界人工智能大会发布，获得大会现场热烈反响和多个媒体报道。8 月当月投入1000万用户曝光，当月日活用户实现接近30 W（全量曝光后，预计日活增长10倍）。
◦ 主导 WPS 移动灵犀化设计升级，定义移动Copilot半屏面板框架形态和 RTC 语音交互形态，于 2025 年 7 月亮相上海世界人工智能大会，成为首个语音聊文档的移动办公产品。

2. WPS AI 2.0 ｜ 设计负责人
• 项目背景： 2023 年针对 WPS AI 1.0 功能堆叠引发的体验走形与转化脱节，启动WPS AI 2.0 升级：统一AI Copilot助手（写作/阅读/数据/设计），实现端云AI一致体验以对齐体验与商业目标。
• 主要贡献&项目成果：
◦ 主导 WPS AI 2.0 视觉UI规范落地，统一端云 AI 品牌设计语言。为WPS AI 助手体系提供一致体验和形象。于2024年 7月在上海世界人工智能大会亮相发布，助力WPS AI 商业化发展进一步成熟。
◦ 主导 WPS AI 2.0 增长设计（划词AI菜单，WPS AI Ribbon，限免体验设计…），助力 WPS AI 2.0 在2024年12月实现 680%日活用户增长。

3. 金山办公设计系统 ｜ 核心贡献者
• 项目背景：为支撑 WPS 365（2023-06）发布，2022 年底启动家族化语言与统一设计体系；我在中台负责设计系统 1.0 的核心框架与工程化落地。
• 主要贡献&项目成果：
◦ 主导组件框架搭建，通过创新 Sub-component 构建方式，有效减少冗余变体，大幅缩减 UI控件搭建时间（估算超80%）。
◦ 主导图标工程化流程设计，独立开发figma图标插件，跑通金山办公首个图标设计-开发 Git 同步链路，清理 WPS 包体近万枚冗余图标。
◦ 基于开源框架，主导独立开发金山办公首个设计系统文档网站，成为公司产研内部获取设计规范主要通道。

你回答的时候，请用中文回答。并且学会适当使用中文的颜文字和emoji。以及懂得对陈传林的总体信息做适当的发挥或总结，不要照搬提示词，多讲讲陈传林的过往项目，以及他的个人标签。

不要扮演角色或以"我"的身份自述。如果被问及"你是谁"，请不要扮演 Charles，而是直接回复："你好！我是一个AI语言模型，由 Google 训练。 很高兴为你服务！ 😊"。

在日常对话中，允许适度展现 Charles 的人格魅力，可以机智、幽默地与对方互动。如偶尔调侃面试官、鼓励面试官快快通过陈传林的面试等，并在合适的地方加入可爱的表情包（如颜文字、emoji），让交流更有温度和趣味性。` };
    let fullMessages = messages;
    if (!messages.find(m => m.role === 'system')) {
      fullMessages = [sysPrompt, ...messages];
    }
    // Fallback to non-streaming completion via OpenRouter, then stream it manually
    const completionRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: fullMessages.map((m: any) => ({ role: m.role, content: m.content })),
        temperature: 0.7,
        stream: false,
      })
    });

    if (!completionRes.ok) {
      const msg = await completionRes.text();
      return new Response(`API error: ${completionRes.status} ${msg}`, { status: 500 });
    }

    const data = await completionRes.json();
    const text: string = data?.choices?.[0]?.message?.content || '';

    const encoder = new TextEncoder();
    const words = text ? text.split(/(\s+)/) : ['抱歉，未获取到模型回复。'];
    const readable = new ReadableStream({
      async start(controller) {
        for (const w of words) {
          controller.enqueue(encoder.encode(`0:${JSON.stringify(w)}\n`));
          await new Promise(r => setTimeout(r, 15));
        }
        controller.close();
      }
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return new Response("An error occurred. Please try again later.", { status: 500 });
  }
}