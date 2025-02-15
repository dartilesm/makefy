"use client";

import { EditingField } from "@/app/components/resume-data/resume-data";
import { AIButton } from "@/app/components/ui/ai-button";
import { ResumeDataSchemaType } from "@/schemas/resume-data.schema";
import { MarkdownViewer } from "@makefy/ui";
import { useFormContext } from "react-hook-form";

interface SkillsSectionProps {
  onEdit: (field: EditingField) => void;
}

export function SkillsSection({ onEdit }: SkillsSectionProps) {
  const { watch } = useFormContext<ResumeDataSchemaType>();
  const skills = watch("skills");

  if (!skills?.length) return null;

  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold">Skills</h2>
      <div className="relative flex justify-between">
        <MarkdownViewer variant="muted" size="sm" content={skills} />
        <div className="relative w-10">
          <AIButton
            label="Rewrite"
            className="absolute right-0 top-0"
            onClick={() =>
              onEdit({
                title: "Skills",
                fields: { skills: skills as unknown as string },
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
