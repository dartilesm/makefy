"use client";

import { EditingField } from "@/app/components/resume-data/resume-data";
import { useResume } from "@/app/contexts/resume-context";
import { AIEnhancedContent } from "../ui/ai-enhanced-content";

interface SummarySectionProps {
  onEdit: (field: EditingField) => void;
}

export function SummarySection({ onEdit }: SummarySectionProps) {
  const { resumeForm } = useResume();
  if (!resumeForm) return null;

  const { watch, getValues } = resumeForm;
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
