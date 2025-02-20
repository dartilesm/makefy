"use client";

import {
  EditingField,
  ResumeDataSchemaTypeExtended,
} from "@/app/components/resume-data/resume-data";
import { useFormContext } from "react-hook-form";
import { AIEnhancedContent } from "../ui/ai-enhanced-content";

interface SkillsSectionProps {
  onEdit: (field: EditingField) => void;
}

export function SkillsSection({ onEdit }: SkillsSectionProps) {
  const { watch, getValues } = useFormContext<ResumeDataSchemaTypeExtended>();
  const skills = watch("skills");
  const allAiImprovements = getValues("aiImprovements");
  const aiImprovement = allAiImprovements?.[`skills`];

  if (!skills?.length) return null;

  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold">Skills</h2>
      <AIEnhancedContent
        content={skills}
        aiImprovement={aiImprovement}
        onEdit={() => onEdit({ title: "Skills", fields: { skills } })}
      />
    </div>
  );
}
