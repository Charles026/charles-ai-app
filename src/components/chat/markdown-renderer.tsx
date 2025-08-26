import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ 
  content, 
  className = "" 
}) => {
  return (
    <div className={`prose prose-slate max-w-none dark:prose-invert prose-headings:mt-4 prose-headings:mb-2 prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-p:my-2 prose-ul:my-2 prose-ol:my-2 ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          // 自定义h2标题渲染
          h2({ children, ...props }) {
            return (
              <h2 className="text-xl font-bold mt-6 mb-3 text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-700 pb-1" {...props}>
                {children}
              </h2>
            );
          },
          // 自定义h3标题渲染
          h3({ children, ...props }) {
            return (
              <h3 className="text-lg font-semibold mt-4 mb-2 text-neutral-800 dark:text-neutral-200" {...props}>
                {children}
              </h3>
            );
          },
          // 自定义h4标题渲染
          h4({ children, ...props }) {
            return (
              <h4 className="text-base font-medium mt-3 mb-2 text-neutral-700 dark:text-neutral-300" {...props}>
                {children}
              </h4>
            );
          },
          // 自定义段落渲染
          p({ children, ...props }) {
            return (
              <p className="my-2 leading-relaxed text-neutral-700 dark:text-neutral-300" {...props}>
                {children}
              </p>
            );
          },
          // 自定义列表渲染
          ul({ children, ...props }) {
            return (
              <ul className="my-2 ml-4 space-y-1 list-disc" {...props}>
                {children}
              </ul>
            );
          },
          ol({ children, ...props }) {
            return (
              <ol className="my-2 ml-4 space-y-1 list-decimal" {...props}>
                {children}
              </ol>
            );
          },
          li({ children, ...props }) {
            return (
              <li className="text-neutral-700 dark:text-neutral-300" {...props}>
                {children}
              </li>
            );
          },
          // 自定义代码块渲染
          code({ className, children }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            return language ? (
              <div className="my-4">
                <SyntaxHighlighter
                  style={oneDark}
                  language={language}
                  PreTag="div"
                  className="rounded-md"
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            );
          },
          // 自定义强调文本渲染
          strong({ children, ...props }) {
            return (
              <strong className="font-bold text-neutral-900 dark:text-neutral-100" {...props}>
                {children}
              </strong>
            );
          },
          // 自定义链接渲染
          a({ children, href, ...props }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
                {...props}
              >
                {children}
              </a>
            );
          },
          // 自定义表格渲染
          table({ children, ...props }) {
            return (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700" {...props}>
                  {children}
                </table>
              </div>
            );
          },
          // 自定义引用块渲染
          blockquote({ children, ...props }) {
            return (
              <blockquote 
                className="border-l-4 border-neutral-300 dark:border-neutral-600 pl-4 italic text-neutral-600 dark:text-neutral-400 my-4"
                {...props}
              >
                {children}
              </blockquote>
            );
          },
          // 自定义分隔线渲染
          hr({ ...props }) {
            return (
              <hr className="my-6 border-neutral-200 dark:border-neutral-700" {...props} />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer; 