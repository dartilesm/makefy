"use client";

import { Button, MarkdownViewer } from "@makefy/ui";
import { Edit2Icon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { ResumeFormData, EditingField } from "@/app/components/resume-data/resume-data";
import { AIButton } from "@/app/components/ui/ai-button";
interface SummarySectionProps {
    onEdit: (field: EditingField) => void;
}

export function SummarySection({ onEdit }: SummarySectionProps) {
    const { watch } = useFormContext<ResumeFormData>();
    const summary = watch("summary");

    if (!summary) return null;

    return (
        <div>
            <h2 className="mb-2 text-2xl font-semibold">Summary</h2>
            <div className="relative flex justify-between">
                <MarkdownViewer
                    variant="muted"
                    size="sm"
                    componentsClassName={{
                        ul: "space-y-0",
                        li: "m-0",
                    }}
                    content={summary}
                />
                <div className="relative w-10">
                    <AIButton
                        label="Rewrite"
                        className="absolute right-0 top-0"
                        onClick={() => onEdit({ title: "Summary", fields: { summary } })}
                    />
                </div>
            </div>
        </div>
    );
} 