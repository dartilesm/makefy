"use client";

import { Button } from "@makefy/ui";
import { Edit2Icon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { ResumeFormData, EditingField } from "@/app/components/resume-data/resume-data";

interface EducationSectionProps {
    onEdit: (field: EditingField) => void;
}

export function EducationSection({ onEdit }: EducationSectionProps) {
    const { watch } = useFormContext<ResumeFormData>();
    const education = watch("education");

    return (
        <div>
            <h2 className="mb-2 text-2xl font-semibold">Education</h2>
            <div className="space-y-4">
                {education.map((education, index) => (
                    <div
                        key={index}
                        className="hover:bg-muted/50 group relative cursor-pointer rounded-lg py-2"
                        onClick={() =>
                            onEdit({
                                title: `Education at ${education.school}`,
                                fields: {
                                    degree: education.degree,
                                    school: education.school,
                                    year: education.year,
                                },
                                path: `education.${index}`,
                            })
                        }
                    >
                        <div className="flex items-baseline justify-between">
                            <div className="font-medium">{education.degree}</div>
                            <div className="text-muted-foreground text-sm">
                                {education.school}
                                {education.year && ` • ${education.year}`}
                            </div>
                        </div>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100"
                        >
                            <Edit2Icon className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
} 