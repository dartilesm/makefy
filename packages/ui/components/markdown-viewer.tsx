"use client";

import { cn } from "@makefy/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, { JSX } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const markdownVariants = cva(
  "prose dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
  {
    variants: {
      size: {
        sm: "text-sm",
        default: "text-base",
        lg: "text-lg",
      },
      variant: {
        default: "",
        muted: "text-muted-foreground",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  },
);

export interface MarkdownViewerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof markdownVariants> {
  content: string;
  components?: React.ComponentProps<typeof Markdown>["components"];
  componentsClassName?: Partial<Record<keyof JSX.IntrinsicElements, string>>;
}

function getDefaultComponents(
  componentsClassName: MarkdownViewerProps["componentsClassName"],
): React.ComponentProps<typeof Markdown>["components"] {
  return {
    // Text elements
    p: ({ className, ...props }) => (
      <p
        className={cn("mb-4 leading-7", componentsClassName?.p, className)}
        {...props}
      />
    ),
    h1: ({ className, ...props }) => (
      <h1
        className={cn(
          "mb-4 mt-6 text-2xl font-bold tracking-tight",
          componentsClassName?.h1,
          className,
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          "mb-3 mt-5 text-xl font-semibold tracking-tight",
          componentsClassName?.h2,
          className,
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          "mb-3 mt-4 text-lg font-semibold tracking-tight",
          componentsClassName?.h3,
          className,
        )}
        {...props}
      />
    ),

    // Lists
    ul: ({ className, ...props }) => (
      <ul
        className={cn(
          "mb-4 list-disc space-y-2 pl-6",
          componentsClassName?.ul,
          className,
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn(
          "mb-4 list-decimal space-y-2 pl-6",
          componentsClassName?.ol,
          className,
        )}
        {...props}
      />
    ),
    li: ({ className, ...props }) => (
      <li
        className={cn("leading-7", componentsClassName?.li, className)}
        {...props}
      />
    ),

    // Links and emphasis
    a: ({ className, ...props }) => (
      <a
        className={cn(
          "text-primary underline-offset-4 hover:underline",
          componentsClassName?.a,
          className,
        )}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    strong: ({ className, ...props }) => (
      <strong
        className={cn("font-bold", componentsClassName?.strong, className)}
        {...props}
      />
    ),
    em: ({ className, ...props }) => (
      <em
        className={cn("italic", componentsClassName?.em, className)}
        {...props}
      />
    ),

    // Code blocks
    pre: ({ className, ...props }) => (
      <pre
        className={cn(
          "bg-muted mb-4 overflow-x-auto rounded-lg p-4 text-sm",
          componentsClassName?.pre,
          className,
        )}
        {...props}
      />
    ),
    code: ({ className, ...props }) => (
      <code
        className={cn(
          "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm",
          componentsClassName?.code,
          className,
        )}
        {...props}
      />
    ),

    // Blockquotes
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          "border-primary [&>*]:text-muted-foreground mt-6 border-l-2 pl-6 italic",
          componentsClassName?.blockquote,
          className,
        )}
        {...props}
      />
    ),

    // Tables
    table: ({ className, ...props }) => (
      <div className="my-6 w-full overflow-y-auto">
        <table
          className={cn("w-full", componentsClassName?.table, className)}
          {...props}
        />
      </div>
    ),
    tr: ({ className, ...props }) => (
      <tr
        className={cn(
          "border-b transition-colors",
          componentsClassName?.tr,
          className,
        )}
        {...props}
      />
    ),
    th: ({ className, ...props }) => (
      <th
        className={cn(
          "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
          componentsClassName?.th,
          className,
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td
        className={cn(
          "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
          componentsClassName?.td,
          className,
        )}
        {...props}
      />
    ),
  };
}

const MarkdownViewer = React.forwardRef<HTMLDivElement, MarkdownViewerProps>(
  (
    {
      className,
      content,
      size,
      variant,
      components = {},
      componentsClassName = {},
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(markdownVariants({ size, variant, className }))}
        {...props}
      >
        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            ...getDefaultComponents(componentsClassName),
            ...components,
          }}
        >
          {content}
        </Markdown>
      </div>
    );
  },
);
MarkdownViewer.displayName = "MarkdownViewer";

export { markdownVariants, MarkdownViewer };
