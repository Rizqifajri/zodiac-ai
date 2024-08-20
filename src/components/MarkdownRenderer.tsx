// src/MarkdownRenderer.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import CodeBlock from './CodeBlock';


interface MarkdownRendererProps {
  className?: string;
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ className, content }) => {
  return (
      <ReactMarkdown
        className={className}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code: CodeBlock as any,
        }}
      >{content}</ReactMarkdown>
  );
};

export default MarkdownRenderer;
