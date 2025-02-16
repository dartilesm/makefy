import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  MarkdownViewer,
} from "@makefy/ui";
import { SparklesIcon } from "lucide-react";

interface SuggestionsAccordionProps {
  content: string;
}

export function SuggestionsAccordion({ content }: SuggestionsAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem
        value="suggestions"
        className="rounded-md border-none bg-gradient-to-r from-violet-50 to-pink-50 dark:from-violet-950/50 dark:to-pink-950/50"
      >
        <AccordionTrigger className="flex gap-2 px-4 py-2 text-sm font-medium text-violet-700 hover:no-underline dark:text-violet-300">
          <div className="flex items-center gap-2">
            <SparklesIcon className="h-4 w-4 shrink-0 fill-violet-500 dark:fill-violet-400" />
            <span>AI improvements</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pt-2">
          <MarkdownViewer
            content={content}
            className="text-sm dark:text-gray-300"
            componentsClassName={{
              ul: "space-y-2",
              p: "mb-2",
              li: "leading-relaxed",
            }}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
