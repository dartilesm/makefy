"use client";

import {
  Button,
  MarkdownViewer,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  Tag,
  TooltipContent,
} from "@makefy/ui";
import { Edit2Icon, EyeIcon, SparklesIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  EditingField,
  ResumeDataSchemaTypeExtended,
} from "@/app/components/resume-data/resume-data";
import { AIButton } from "@/app/components/ui/ai-button";
import { cn } from "@makefy/ui/lib/utils";
import { AIEnhancedContent } from "../ui/ai-enhanced-content";
interface SummarySectionProps {
  onEdit: (field: EditingField) => void;
}

export function SummarySection({ onEdit }: SummarySectionProps) {
  const { watch, getValues } = useFormContext<ResumeDataSchemaTypeExtended>();
  const summary = watch("summary");
  const allAiImprovements = getValues("aiImprovements");
  const aiImprovement = allAiImprovements?.[`summary`];

  if (!summary) return null;

  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold">Summary</h2>
      <AIEnhancedContent
        content={summary}
        aiImprovement={aiImprovement}
        onEdit={() => onEdit({ title: "Summary", fields: { summary } })}
      />
    </div>
  );
}
