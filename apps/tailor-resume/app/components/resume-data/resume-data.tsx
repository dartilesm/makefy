"use client";

import { Form, Skeleton } from "@makefy/ui";
import { useState } from "react";
import { EditResumeFieldDialog } from "../edit-resume-field-dialog";
import { ExperienceSection } from "./experience-section";
import { EducationSection } from "./education-section";
import { PersonalInfoSection } from "./personal-info-section";
import { SummarySection } from "./summary-section";
import { SkillsSection } from "./skills-section";
import { useResume } from "@/app/contexts/resume-context";

export interface EditingField {
  title: string;
  fields: {
    [key: string]: string | undefined;
  };
  path?: string;
}

export function ResumeData() {
  const [editingField, setEditingField] = useState<EditingField | null>(null);
  const { resumeForm } = useResume();
  if (!resumeForm) return null;

  return (
    <>
      <Form {...resumeForm}>
        <div className="space-y-8">
          {resumeForm.formState.isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : (
            <>
              <PersonalInfoSection onEdit={setEditingField} />
              <SummarySection onEdit={setEditingField} />

              {resumeForm.watch("experience")?.length > 0 && (
                <ExperienceSection onEdit={setEditingField} />
              )}

              {resumeForm.watch("education")?.length > 0 && (
                <EducationSection onEdit={setEditingField} />
              )}

              <SkillsSection onEdit={setEditingField} />
            </>
          )}
        </div>
      </Form>

      {!!editingField && (
        <EditResumeFieldDialog
          onOpenChange={(open) => !open && setEditingField(null)}
          editingField={editingField}
        />
      )}
    </>
  );
}
