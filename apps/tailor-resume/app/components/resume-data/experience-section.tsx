"use client";

import { Button, MarkdownViewer } from "@makefy/ui";
import { Edit2Icon } from "lucide-react";
import { ResumeFormData, EditingField } from "@/app/components/resume-data/resume-data";
import { AIButton } from "@/app/components/ui/ai-button";
import { useFormContext } from "react-hook-form";

interface ExperienceSectionProps {
    onEdit: (field: EditingField) => void;
}

export function ExperienceSection({ onEdit }: ExperienceSectionProps) {
    const { watch } = useFormContext<ResumeFormData>();
    const experience = watch("experience");

    return (
        <div>
            <h2 className="mb-2 text-2xl font-semibold">Experience</h2>
            <div className="space-y-4">
                {
                    experience.map((experience, index) => (
                        <div className="space-y-2">
                            <div
                                className="hover:bg-muted/50 group relative space-y-1 rounded-lg py-2"
                                key={index}
                                onClick={() =>
                                    onEdit({
                                        title: `Experience at ${experience.company} as ${experience.title}`,
                                        fields: {
                                            title: experience.title,
                                            company: experience.company,
                                            startDate: experience.startDate,
                                            endDate: experience.endDate
                                        },
                                        path: `experience.${index}`,
                                    })
                                }
                            >
                                <div className="flex flex-col items-baseline justify-between">
                                    <div className="font-medium">{experience.title}</div>
                                    <div className="text-sm">
                                        {experience.company}
                                    </div>
                                    <small className="text-muted-foreground text-sm">
                                        {experience.startDate} - {experience.endDate}
                                    </small>
                                </div>
                            </div>
                            <div className="relative flex justify-between">
                                <MarkdownViewer
                                    variant="muted"
                                    size="sm"
                                    componentsClassName={{
                                        ul: "space-y-0",
                                        li: "m-0",
                                    }}
                                    content={experience.description}
                                />
                                <div className="relative w-10">
                                    <AIButton
                                        label="Rewrite"
                                        className="absolute right-0 top-0"
                                        onClick={() => onEdit({
                                            title: `Experience at ${experience.company} as ${experience.title}`,
                                            fields: {
                                                description: experience.description
                                            },
                                            path: `experience.${index}`
                                        })}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
} 