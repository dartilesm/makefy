import { MarkdownViewer } from "@makefy/ui";

interface SuggestionSectionProps {
    title: string;
    items: string[];
}

export function SuggestionSection({ title, items }: SuggestionSectionProps) {
    if (!items?.length) return null;

    return (
        <div>
            <h3 className="mb-2 font-medium">{title}</h3>
            <ul className="text-muted-foreground list-disc space-y-1 pl-4 text-sm">
                {items.map((item, i) => (
                    <li key={i}>
                        <MarkdownViewer variant="muted" size="sm" content={item} />
                    </li>
                ))}
            </ul>
        </div>
    );
} 