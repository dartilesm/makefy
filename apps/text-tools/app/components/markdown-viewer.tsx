"use client";

import { cn } from "@makefy/ui/lib/utils";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export function MarkdownViewer({ content, className }: MarkdownViewerProps) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      className={cn("prose dark:prose-invert max-w-none", className)}
      components={{
        // Text elements
        p: ({ children }) => <p className="mb-4 text-sm">{children}</p>,
        h1: ({ children }) => (
          <h1 className="mb-4 mt-6 text-2xl font-bold">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="mb-3 mt-5 text-xl font-bold">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-3 mt-4 text-lg font-bold">{children}</h3>
        ),

        // Lists
        ul: ({ children }) => (
          <ul className="mb-4 list-disc space-y-2 pl-6">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-4 list-decimal space-y-2 pl-6">{children}</ol>
        ),
        li: ({ children }) => <li className="text-sm">{children}</li>,

        // Links and emphasis
        a: ({ children, href }) => (
          <a
            href={href}
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        strong: ({ children }) => (
          <strong className="font-bold">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,

        // Code blocks
        pre: ({ children }) => (
          <pre className="bg-muted mb-4 overflow-x-auto rounded-lg p-4">
            {children}
          </pre>
        ),
        code: ({ children }) => (
          <code className="bg-muted rounded-md px-1.5 py-0.5 text-sm">
            {children}
          </code>
        ),

        // Blockquotes
        blockquote: ({ children }) => (
          <blockquote className="border-primary mb-4 border-l-4 pl-4 italic">
            {children}
          </blockquote>
        ),

        // Tables
        table: ({ children }) => (
          <div className="mb-4 overflow-x-auto">
            <table className="divide-border min-w-full divide-y">
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th className="bg-muted px-4 py-2 text-left text-sm font-medium">
            {children}
          </th>
        ),
        td: ({ children }) => <td className="px-4 py-2 text-sm">{children}</td>,
      }}
    >
      {content}
    </Markdown>
  );
}
