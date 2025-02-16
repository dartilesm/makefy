import { MarkdownViewer } from "@makefy/ui";
import { DeepPartial } from "ai";

interface SuggestionSectionProps {
  title: string;
  content: string;
}

export function SuggestionSection({
  title,
  content,
}: DeepPartial<SuggestionSectionProps>) {
  if (!content) return null;

  return (
    <div>
      <h3 className="mb-2 font-medium leading-snug">{title}</h3>
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
