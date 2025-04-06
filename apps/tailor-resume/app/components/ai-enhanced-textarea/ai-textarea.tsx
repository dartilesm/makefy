"use client";

import { Textarea } from "@makefy/ui";
import { cn } from "@makefy/ui/lib/utils";
import { ControllerRenderProps } from "react-hook-form";
import { AITextareaLoading } from "./ai-textarea-loading";

interface EnhancedTextareaProps {
  field: Partial<ControllerRenderProps<any, any>>;
  isLoading?: boolean;
  isInvalid?: boolean;
}

export function EnhancedTextarea({
  field,
  isLoading = false,
  isInvalid = false,
}: EnhancedTextareaProps) {
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
        {...field}
        aria-invalid={isInvalid}
        className="max-h-64 min-h-64 resize-none transition-[height] duration-300 ease-in-out [field-sizing:content]"
      />
    </div>
  );
}
