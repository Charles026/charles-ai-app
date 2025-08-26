'use client'

import ProjectLayout from "@/components/ProjectLayout"
import Image from 'next/image'
import coverKingsoftDesignSystem from '@/assets/images/kingsoft-design-system/cover-kd.png'
import dsTokenDefine from '@/assets/images/kingsoft-design-system/ds-token-define.webp'
import dsTokenNaming from '@/assets/images/kingsoft-design-system/ds-token-naming.webp'
import dsToken from '@/assets/images/kingsoft-design-system/ds-token.webp'
import icon2x from '@/assets/images/kingsoft-design-system/icon@2x.webp'
import iconSop from '@/assets/images/kingsoft-design-system/iconSop.webp'
import KDWebCode from '@/assets/images/kingsoft-design-system/KDWebCode.webp'
import pluginSop from '@/assets/images/kingsoft-design-system/pluginSop.webp'
import pluginUI from '@/assets/images/kingsoft-design-system/pluginUI.webp'
import subcomponentSheet from '@/assets/images/kingsoft-design-system/subcomponent-sheet.webp'
import subComponent2x from '@/assets/images/kingsoft-design-system/subComponent@2x.webp'
import svgCode from '@/assets/images/kingsoft-design-system/svgCode.webp'
import wps365 from '@/assets/images/kingsoft-design-system/wps365.webp'
import wps365Old from '@/assets/images/kingsoft-design-system/wps365Old.webp'
import inputComponent from '@/assets/images/kingsoft-design-system/input-component.webp'


export default function KingSoftDesignSystemReportPage() {

  return (
    <ProjectLayout>
      <div className="fixed inset-0 z-10 backdrop-blur-sm">
        <div className="absolute inset-0 overflow-y-auto">
          <main className="px-4 sm:px-8 py-6">
          <div className="max-w-[886px] mx-auto">
            {/* Title */}
            <h1 className="text-3xl font-semibold text-center mt-8">
              KingSoft Design System
            </h1>
          </div>

          {/* KingSoft Design System 封面 */}
          <div className="mt-8 mx-auto w-full sm:w-[1024px] rounded-[40px] overflow-hidden">
            <Image src={coverKingsoftDesignSystem} alt="KingSoft Design System 封面" width={1024} className="w-full h-auto" priority />
          </div>

          <div className="max-w-[886px] mx-auto">
            {/* Section: 项目背景 */}
            <section className="mt-[120px]">
              <h2 className="text-2xl font-semibold text-center">项目概述</h2>
              <div className="mt-8  leading-7 text-base sm:text-base space-y-4">
                <p>
                KDesign 金山办公设计系统主要服务于金山办公旗下办公产品的体验设计和技术实现，并为公司内部的设计、交互、产品、开发、测试等角色提供一站式解决方案，包括组件、指南和工具等，旨在实现金山办公产品体验的一致性，以提升团队协作效率。
                </p>
              </div>
            </section>
          </div>

          {/* WPS 家族感版本面临的问题 */}
          <div className="max-w-[886px] mx-auto">
            <section className="mt-[120px]">
              <h2 className="text-2xl font-semibold text-center">WPS 家族感 UI 面临的问题</h2>
            </section>

            <div className="mt-8 leading-7 text-base sm:text-base">
            <p className="text-lg sm:text-lg font-semibold text-[#76B0FF]">UI 不一致</p>

            <ul className="list-disc list-inside mt-4">
            <li>界面设计混乱：产品线间视觉差异大，缺乏品牌一致性</li>
            <li>交互体验割裂：相似功能操作方式不统一，增加学习成本</li>
            <li>设计规范缺失：缺乏统一设计语言，设计决策随意</li>
            <li>组件复用率低：组件独立开发，重复工作且质量参差</li>
            </ul>
            </div>
          </div>

          {/* 设计系统 WPS 365 设计规范 */}
          <div className="mt-8 mx-auto w-full sm:w-[1024px] rounded-[40px] overflow-hidden">
           <Image src={wps365Old} alt="wps365Old"  width={1024}   className="w-full h-auto" priority />
           </div>

           <div className="max-w-[886px] mx-auto mt-16 ">
        
           <div className="leading-7 text-base sm:text-base">
            <p className="text-lg sm:text-lg font-semibold text-[#76B0FF]">资源冗余、规格不统一</p>
            </div>

    

            <ul className="list-disc list-inside mt-4">
            <li>设计师-设计师：资源管理混乱，重复绘制且命名不规范，复用效率低</li>
            <li>设计师-开发：点对点交付缺乏规范，资源唯一性和信息准确性难保证</li>
            <li>开发-开发：资源管理机制缺失，获取存储冗余，影响开发效率</li>
            </ul>
          </div>

          {/* 设计系统 Icon 定义 */}
          <div className="mt-8 mx-auto w-full sm:w-[1024px] rounded-[40px] overflow-hidden">
           <Image src={icon2x} alt="icon2x" width={1024} className="w-full h-auto" priority />
           </div>


          {/* 我做了什么设计/开发贡献 */}
          <div className="max-w-[886px] mx-auto mt-[120px] ">
            <h2 className="text-2xl font-semibold text-center">我做了什么设计/开发贡献</h2>
            <div className="mt-8 leading-7 text-base sm:text-base">
            <p className="text-lg sm:text-lg font-semibold text-[#76B0FF]">UI 组件库的搭建</p>
            <p className="mt-4">我作为组件框架搭建负责人，以通过引入 Sub-component 构建方式，将复杂的输入框组件拆解为可复用、可组合的模块单元，有效减少了冗余变体，提升了组件复用率与维护效率。同时，针对组件 API 结构进行优化，将原本零散的配置项进行语义归类与能力聚合，提升了交互清晰度与使用理解成本，构建出更灵活可控的组件能力体系。</p>
            </div>
          </div>


          {/* 设计系统 SubComponent 设计规范 */}
          <div className="mt-8 mx-auto w-full sm:w-[1024px] rounded-[40px] overflow-hidden">
           <Image src={inputComponent} alt="inputComponent" width={1024} className="w-full h-auto" priority />
           </div>

          {/* 设计系统 SubComponent 设计规范 */}
          <div className="mt-8 mx-auto w-full sm:w-[1024px] rounded-[40px] overflow-hidden">
           <Image src={subComponent2x} alt="subComponent2x" width={1024} className="w-full h-auto" priority />
           </div> 


          {/* 设计系统 SubComponent 设计规范 */}
          <div className="mt-8 mx-auto w-full sm:w-[1024px] rounded-[40px] overflow-hidden">
           <Image src={subcomponentSheet} alt="subcomponentSheet" width={1024} className="w-full h-auto" priority />
           </div>

          {/* Design Token 构建 */}
          <div className="max-w-[886px] mx-auto mt-16 ">  
           <div className="mt-8 leading-7 text-base sm:text-base">
            <p className="text-lg sm:text-lg font-semibold text-[#76B0FF]">Design Token 构建</p>
            <p className="mt-4">参与主导设计变量体系的构建与实施，建立了一套完整的 Design Token 系统，涵盖颜色、字体、间距、圆角等核心设计元素。通过语义化命名和层级化管理，实现了跨平台（Web、移动端、桌面端）的设计一致性，显著提升了设计系统的可维护性和扩展性。</p>
            </div>
          </div>


          {/* 设计系统 Token 定义 */}
          <div className="mt-8 mx-auto w-full sm:w-[1024px] rounded-[40px] overflow-hidden">
           <Image src={dsTokenDefine} alt="dsTokenDefine" width={1024} className="w-full h-auto" priority />
           </div>

          {/* 设计系统 Token 使用 */}
          <div className="mt-8 mx-auto w-full sm:w-[1024px] rounded-[40px] overflow-hidden">
           <Image src={dsToken} alt="dsToken" width={1024} className="w-full h-auto" priority />
           </div>

          {/* 设计系统 Token 命名 */}
          <div className="mt-8 mx-auto w-full sm:w-[1024px] rounded-[40px] overflow-hidden">
           <Image src={dsTokenNaming} alt="dsTokenNaming" width={1024} className="w-full h-auto" priority />
           </div> 



           {/* Icon 构建 */}
          <div className="max-w-[886px] mx-auto mt-16 ">  
           <div className="mt-8 leading-7 text-base sm:text-base">
            <p className="text-lg sm:text-lg font-semibold text-[#76B0FF]">Icon SOP： 从 Figma 到多端组件的标准化交付路径</p>
            <p className="mt-4">为提升图标资产在设计与开发间的交付效率与一致性，我重点参与构建了 KD 图标构建标准流程（SOP）。流程起始于设计侧，在 Figma 中维护图标组件，通过图标插件生成可导出的 SVG 资源。所有图标代码由插件统一推送至 Git 仓库（KD Icon Git），通过构建脚本转译为适配多端框架的组件形式（如 React、Vue2、Vue3、QT）。开发侧基于组件库同步更新，在业务开发中按需调用，统一接入产品体系，最终完成入库管理。
             该流程实现了图标的&ldquo;一次设计，多端复用&rdquo;，有效清理整治了近万个冗余图标资源，全面提升了图标调用的可控性与可溯源性，确保资产版本统一、更新高效。</p>
            </div>
          </div>

          {/* 设计系统 Icon 使用 */}
          <div className="mt-8 mx-auto w-full sm:w-[1024px] rounded-[40px] overflow-hidden">
           <Image src={iconSop} alt="iconSop" width={1024} className="w-full h-auto" priority />
           </div>



          {/* 设计系统 Plugin 设计规范 */}
          <div className="mt-8 mx-auto w-full sm:w-[1024px] rounded-[40px] overflow-hidden">
           <Image src={pluginSop} alt="pluginSop" width={1024} className="w-full h-auto" priority />
           </div>

          {/* 设计系统 Plugin UI 设计规范 */}
          <div className="mt-8 mx-auto w-full sm:w-[1024px] rounded-[40px] overflow-hidden">
           <Image src={pluginUI} alt="pluginUI" width={1024} className="w-full h-auto" priority />
           </div>

          {/* 设计系统 SVG 代码 */}
          <div className="mt-8 mx-auto w-full sm:w-[1024px] rounded-[40px] overflow-hidden">
          <Image src={svgCode} alt="svgCode" width={1024} className="w-full h-auto" priority />
          </div>



            {/* Icon 构建 */}
            <div className="max-w-[886px] mx-auto mt-16 ">  
           <div className="mt-8 leading-7 text-base sm:text-base">
            <p className="text-lg sm:text-lg font-semibold text-[#76B0FF]">KDesign 文档撰写和官网开发</p>
            <p className="mt-4">选用 Docusaurus 作为文档框架，并开发了 KDesign 文档官网，为设计师和开发提供详细的组件使用指南和最佳实践。</p>
            </div>
          </div>



          {/* 设计系统 Plugin UI 设计规范 */}
          <div className="mt-8 mx-auto w-full sm:w-[1024px] rounded-[40px] overflow-hidden">
           <video src="/videos/kd.mp4" autoPlay loop muted playsInline className="w-full h-auto" />
           </div>

          {/* 设计系统 Web 代码 */}
          <div className="mt-8 mx-auto w-full sm:w-[1024px] rounded-[40px] overflow-hidden">
           <Image src={KDWebCode} alt="KDWebCode" width={1024} className="w-full h-auto" priority />
           </div>



            {/* 我做了什么设计/开发贡献 */}
            <div className="max-w-[886px] mx-auto mt-[120px] ">
            <h2 className="text-2xl font-semibold text-center">总结</h2>
            <div className="mt-8 leading-7 text-base sm:text-base">
            <p className="mt-4">我们通过构建 <span className="text-[#76B0FF] font-semibold">87 项标准化组件</span> 和 <span className="text-[#76B0FF] font-semibold">图标工程化项目（清理近万个冗余图标）</span>，显著提升了设计和开发效率，为 WPS 家族产品带来统一的用户体验。围绕家族感展开全产品线视觉体验升级，通过统一的界面语言，让用户在新版本首页、新建、组件界面等关键流程中感受到一致的设计体验。以&ldquo;秩序&rdquo;为核心，建立标准化的层次规范和控件规范，为全平台产品提供统一的设计标准，确保设计语言的一致性。</p>
            </div>
          </div>

          {/* 设计系统 WPS 365 设计规范 */}
          <div className="mt-8 mb-16 mx-auto w-full sm:w-[1024px] rounded-[40px] overflow-hidden">
           <Image src={wps365} alt="wps365" width={1024} className="w-full h-auto" priority />
           </div>


    


          </main>
        </div>
      </div>
    </ProjectLayout>
  )
}
