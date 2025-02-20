"use client";

import { EditingField } from "@/app/components/resume-data/resume-data";
import { AIEnhancedContent } from "@/app/components/ui/ai-enhanced-content";
import { useResume } from "@/app/contexts/resume-context";

interface ExperienceSectionProps {
  onEdit: (field: EditingField) => void;
}

export function ExperienceSection({ onEdit }: ExperienceSectionProps) {
  const { resumeForm } = useResume();
  if (!resumeForm) return null;

  const { watch, getValues } = resumeForm;
  const experience = watch("experience");
  const allAiImprovements = getValues("aiImprovements");

  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold">Experience</h2>
      <div className="space-y-4">
        {experience.map((experience, index) => {
          const aiImprovement =
            allAiImprovements?.[`experience.${index}.description`];

          return (
            <div className="space-y-2" key={index}>
              <div
                className="hover:bg-muted/50 group relative space-y-1 rounded-lg py-2"
                onClick={() =>
                  onEdit({
                    title: `Experience at ${experience.company} as ${experience.title}`,
                    fields: {
                      title: experience.title,
                      company: experience.company,
                      startDate: experience.startDate,
                      endDate: experience.endDate,
                    },
                    path: `experience.${index}`,
                  })
                }
              >
                <div className="flex flex-col items-baseline justify-between">
                  <div className="font-medium">{experience.title}</div>
                  <div className="text-sm">{experience.company}</div>
                  <small className="text-muted-foreground text-sm">
                    {experience.startDate} - {experience.endDate}
                  </small>
                </div>
              </div>

              <AIEnhancedContent
                content={experience.description}
                aiImprovement={aiImprovement}
                onEdit={() =>
                  onEdit({
                    title: `Experience at ${experience.company} as ${experience.title}`,
                    fields: {
                      description: experience.description,
                    },
                    path: `experience.${index}`,
                  })
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
