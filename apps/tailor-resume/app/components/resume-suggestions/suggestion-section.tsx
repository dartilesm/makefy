import { MarkdownViewer } from "@makefy/ui/components/markdown-viewer";
import { cn } from "@makefy/ui/lib/utils";

interface SuggestionSectionProps {
  title: string;
  content?: string;
  icon?: string;
  className?: string;
}

export function SuggestionSection({
  title,
  content,
  icon,
  className,
}: SuggestionSectionProps) {
  if (!content) return null;

  return (
    <div className={cn(className)}>
      <div className="mb-3 flex items-center gap-3">
        {icon && <span className="text-xl">{icon}</span>}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <MarkdownViewer
        size="sm"
        componentsClassName={{
          p: "leading-tight text-muted-foreground",
          li: "m-0 leading-snug text-muted-foreground",
        }}
        content={content}
      />
    </div>
  );
}
