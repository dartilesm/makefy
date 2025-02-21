"use client";

import { ResumeData } from "@/app/components/resume-data/resume-data";
import { ResumeSuggestions } from "@/app/components/resume-suggestions/resume-suggestions";
import { ResumeAnalysisForm } from "@/app/components/resume-analysis-form";
import { ResumeSuggestionsSchemaType } from "@/schemas/resume-suggestions.schema";
import { DeepPartial } from "ai";
import { useState } from "react";
import ResumeToolbar from "./resume-toolbar/resume-toolbar";
import { useForm } from "react-hook-form";
import { ResumeProvider } from "../contexts/resume-context";
import { ResumeDataSchemaType } from "@/schemas/resume-data.schema";
import { Button } from "@makefy/ui";

export interface ResumeDataSchemaTypeExtended extends ResumeDataSchemaType {
  aiImprovements: {
    [key: string]: string;
  };
}

export default function ResumeEnhancer() {
  const [resumeData, setResumeData] =
    useState<DeepPartial<ResumeDataSchemaTypeExtended>>();
  const [suggestions, setSuggestions] =
    useState<DeepPartial<ResumeSuggestionsSchemaType>>();

  const form = useForm<ResumeDataSchemaTypeExtended>({
    defaultValues: {
      personalInfo: {
        fullName: resumeData?.personalInfo?.fullName || "",
        email: resumeData?.personalInfo?.email || "",
        phone: resumeData?.personalInfo?.phone || "",
        location: resumeData?.personalInfo?.location || "",
        website: resumeData?.personalInfo?.website || "",
      },
      summary: resumeData?.summary || "",
      experience: resumeData?.experience || [],
      education: resumeData?.education || [],
      skills: resumeData?.skills || "",
      aiImprovements: resumeData?.aiImprovements || {},
    },
  });

  function handleComplete({
    resumeData,
    suggestions,
  }: {
    resumeData: DeepPartial<ResumeDataSchemaTypeExtended>;
    suggestions: DeepPartial<ResumeSuggestionsSchemaType>;
  }) {
    setResumeData(resumeData);
    setSuggestions(suggestions);
    form.reset(resumeData);
  }

  return (
    <div className="h-full space-y-8 overflow-y-auto p-6">
      <div className="flex items-center gap-2">
        <span>Variant: Solid & Color: Primary</span>
        <Button variant="solid" variantColor="primary">
          Download Resume
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Variant: Solid & Color: Secondary</span>
        <Button variant="solid" variantColor="secondary">
          Download Resume
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Variant: Solid & Color: Warning</span>
        <Button variant="solid" variantColor="warning">
          Download Resume
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Variant: Solid & Color: Destructive</span>
        <Button variant="solid" variantColor="destructive">
          Download Resume
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Variant: Solid & Color: Success</span>
        <Button variant="solid" variantColor="success">
          Download Resume
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Variant: Flat & Color: Primary</span>
        <Button variant="flat" variantColor="primary">
          Download Resume
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Variant: Flat & Color: Secondary</span>
        <Button variant="flat" variantColor="secondary">
          Download Resume
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Variant: Flat & Color: Warning</span>
        <Button variant="flat" variantColor="warning">
          Download Resume
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Variant: Flat & Color: Destructive</span>
        <Button variant="flat" variantColor="destructive">
          Download Resume
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Variant: Flat & Color: Success</span>
        <Button variant="flat" variantColor="success">
          Download Resume
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Variant: Ghost & Color: Primary</span>
        <Button variant="ghost" variantColor="primary">
          Download Resume
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Variant: Ghost & Color: Secondary</span>
        <Button variant="ghost" variantColor="secondary">
          Download Resume
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Variant: Ghost & Color: Warning</span>
        <Button variant="ghost" variantColor="warning">
          Download Resume
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Variant: Ghost & Color: Destructive</span>
        <Button variant="ghost" variantColor="destructive">
          Download Resume
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Variant: Ghost & Color: Success</span>
        <Button variant="ghost" variantColor="success">
          Download Resume
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Variant: Outline & Color: Primary</span>
        <Button variant="outline" variantColor="primary">
          Download Resume
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Variant: Outline & Color: Secondary</span>
        <Button variant="outline" variantColor="secondary">
          Download Resume
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Variant: Outline & Color: Warning</span>
        <Button variant="outline" variantColor="warning">
          Download Resume
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Variant: Outline & Color: Destructive</span>
        <Button variant="outline" variantColor="destructive">
          Download Resume
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span>Variant: Outline & Color: Success</span>
        <Button variant="outline" variantColor="success">
          Download Resume
        </Button>
      </div>
      {!resumeData && !suggestions && (
        <ResumeAnalysisForm onComplete={handleComplete} />
      )}

      {resumeData && suggestions && (
        <ResumeProvider
          resumeForm={form}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
        >
          <div className="container mx-auto h-full">
            <ResumeToolbar />
            <div className="flex flex-col gap-8 sm:flex-row">
              <section className="space-y-4">
                <ResumeData />
              </section>

              <section className="max-w-lg space-y-4">
                <ResumeSuggestions />
              </section>
            </div>
          </div>
        </ResumeProvider>
      )}
    </div>
  );
}
