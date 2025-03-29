import {
  MarkdownViewer,
  Tag,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@makefy/ui";
import { cn } from "@makefy/ui/lib/utils";
import { EyeIcon, PencilIcon, SparklesIcon } from "lucide-react";
import { AIButton } from "./ai-button";

interface AIEnhancedContentProps {
  content: string;
  aiImprovement?: string;
  onEdit?: () => void;
  className?: string;
}

export function AIEnhancedContent({
  content,
  aiImprovement,
  onEdit,
  className,
}: AIEnhancedContentProps) {
  return (
    <div className={cn("relative", className)}>
      {aiImprovement && (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Tag
                variant="outline"
                className={cn([
                  "absolute -top-3 left-1/2 -translate-x-1/2 border-2",
                  { "outline-border": aiImprovement },
                ])}
              >
                AI Enhanced
                <EyeIcon className="ml-1 h-3 w-3" />
              </Tag>
            </TooltipTrigger>
            <TooltipContent className="flex max-w-[300px] flex-col gap-2">
              <div className="flex items-center gap-2 text-sm">
                <SparklesIcon className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium">AI Improvements</span>
              </div>
              <MarkdownViewer
                content={aiImprovement}
                className="text-xs"
                componentsClassName={{
                  ul: "space-y-0",
                  li: "m-0 leading-tight text-muted-foreground",
                }}
              />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      <MarkdownViewer
        variant="muted"
        size="sm"
        className={cn([
          "pr-4",
          {
            "border-border rounded-md border-2 p-3 pr-4": aiImprovement,
          },
        ])}
        componentsClassName={{
          ul: "space-y-0",
          li: "m-0",
        }}
        content={content}
      />
      {onEdit && (
        <AIButton
          label={aiImprovement ? "Edit" : "Rewrite"}
          className="absolute -right-2 -top-3"
          onClick={onEdit}
          icon={
            aiImprovement ? (
              <PencilIcon className="h-4 w-4 stroke-yellow-600" />
            ) : undefined
          }
        />
      )}
    </div>
  );
}
