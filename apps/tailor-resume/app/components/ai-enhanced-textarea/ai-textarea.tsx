"use client";

import { Textarea } from "@makefy/ui";
import { cn } from "@makefy/ui/lib/utils";
import * as React from "react";
import { AITextareaLoading } from "./ai-textarea-loading";

export interface EnhancedTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isLoading?: boolean;
}

const EnhancedTextarea = React.forwardRef<
  HTMLTextAreaElement,
  EnhancedTextareaProps
>(({ className, isLoading = false, ...props }, ref) => {
  return (
    <div className="relative flex flex-col gap-2">
      <div
        className={cn([
          "absolute h-0 w-0 overflow-hidden p-1 transition-[height] duration-300 ease-in-out",
          {
            "bg-background border-input absolute h-full w-full overflow-hidden rounded-md border p-1":
              isLoading,
          },
        ])}
      >
        <AITextareaLoading loading={isLoading} />
      </div>

      <Textarea
        ref={ref}
        {...props}
        className={cn(
          "max-h-64 min-h-64 resize-none transition-[height] duration-300 ease-in-out [field-sizing:content]",
          className,
        )}
      />
    </div>
  );
});

EnhancedTextarea.displayName = "EnhancedTextarea";

export { EnhancedTextarea };
