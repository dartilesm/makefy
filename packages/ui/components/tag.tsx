"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@makefy/ui/lib/utils";

const tagVariants = cva(
  "inline-flex items-center justify-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary hover:bg-primary/20",
        success: "bg-success/10 text-success hover:bg-success/20",
        warning: "bg-warning/10 text-warning hover:bg-warning/20",
        error: "bg-destructive/10 text-destructive hover:bg-destructive/20",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-6",
        sm: "h-5 px-1.5",
        lg: "h-7 px-3",
      },
      interactive: {
        true: "cursor-pointer",
        false: "cursor-default",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      interactive: false,
    },
  },
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  /** Makes the tag dismissible with a close button */
  dismissible?: boolean;
  /** Callback when dismiss button is clicked */
  onDismiss?: () => void;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      variant,
      size,
      interactive,
      dismissible,
      onDismiss,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : undefined}
        className={cn(
          tagVariants({ variant, size, interactive }),
          dismissible && "pr-1",
          className,
        )}
        {...props}
      >
        {children}
        {dismissible && (
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground focus:ring-ring ml-1 rounded-full outline-none transition-colors focus:ring-2 focus:ring-offset-2"
            onClick={onDismiss}
            aria-label="Dismiss"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </span>
    );
  },
);
Tag.displayName = "Tag";

export { Tag, tagVariants };
