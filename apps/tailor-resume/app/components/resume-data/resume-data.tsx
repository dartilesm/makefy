"use client";

import { Form, Skeleton } from "@makefy/ui";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EditResumeFieldDialog } from "../edit-resume-field-dialog";
import { ExperienceSection } from "./experience-section";
import { EducationSection } from "./education-section";
import { PersonalInfoSection } from "./personal-info-section";
import { SummarySection } from "./summary-section";
import { SkillsSection } from "./skills-section";
import { ResumeDataSchemaType } from "@/schemas/resume-data.schema";

interface ResumeDataProps {
  initialData?: ResumeDataSchemaType;
  suggestions?: ResumeSuggestionsSchemaType;
}

export interface EditingField {
  title: string;
  fields: {
    [key: string]: string | undefined;
  };
  path?: string;
}

export function ResumeData({ initialData, suggestions }: ResumeDataProps) {
  const [editingField, setEditingField] = useState<EditingField | null>(null);
  const form = useForm<ResumeDataSchemaType>({
    defaultValues: {
      personalInfo: {
        fullName: initialData?.personalInfo?.fullName || "",
        email: initialData?.personalInfo?.email || "",
        phone: initialData?.personalInfo?.phone || "",
        location: initialData?.personalInfo?.location || "",
        website: initialData?.personalInfo?.website || "",
        links: initialData?.personalInfo?.links || [],
      },
      summary: initialData?.summary || "",
      experience: initialData?.experience || [],
      education: initialData?.education || [],
      skills: initialData?.skills || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        personalInfo: {
          fullName: initialData.personalInfo?.fullName || "",
          email: initialData.personalInfo?.email || "",
          phone: initialData.personalInfo?.phone || "",
          location: initialData.personalInfo?.location || "",
          website: initialData.personalInfo?.website || "",
          links: initialData.personalInfo?.links || [],
        },
        summary: initialData.summary || "",
        experience: initialData.experience || [],
        education: initialData.education || [],
        skills: initialData.skills || "",
      });
    }
  }, [form, initialData]);

  return (
    <>
      <Form {...form}>
        <div className="space-y-8">
          {form.formState.isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : (
            <>
              <PersonalInfoSection onEdit={setEditingField} />
              <SummarySection onEdit={setEditingField} />

              {form.watch("experience")?.length > 0 && (
                <ExperienceSection onEdit={setEditingField} />
              )}

              {form.watch("education")?.length > 0 && (
                <EducationSection onEdit={setEditingField} />
              )}

              <SkillsSection onEdit={setEditingField} />
            </>
          )}
        </div>
      </Form>

      <EditResumeFieldDialog
        open={!!editingField}
        onOpenChange={(open) => !open && setEditingField(null)}
        editingField={editingField}
        form={form}
        initialData={initialData}
        suggestions={suggestions}
      />
    </>
  );
}
