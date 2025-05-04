"use client";

import { ResumeData } from "@/app/components/resume-data/resume-data";
import { ResumeSuggestions } from "@/app/components/resume-suggestions/resume-suggestions";
import {
  ResumeAnalysisForm,
  ResumeAnalysisFormValues,
} from "@/app/components/resume-analysis-form";
import { ResumeSuggestionsSchemaType } from "@/schemas/resume-suggestions.schema";
import { DeepPartial } from "ai";
import { useState } from "react";
import ResumeToolbar from "./resume-toolbar/resume-toolbar";
import { useForm } from "react-hook-form";
import { ResumeProvider } from "../contexts/resume-context";
import { ResumeDataSchemaType } from "@/schemas/resume-data.schema";

export interface ResumeDataSchemaTypeExtended extends ResumeDataSchemaType {
  aiImprovements: {
    [key: string]: string;
  };
}

export default function ResumeEnhancer() {
  const [data, setData] = useState<{
    resumeData?: DeepPartial<ResumeDataSchemaTypeExtended>;
    suggestions?: DeepPartial<ResumeSuggestionsSchemaType>;
    jobInfo?: ResumeAnalysisFormValues;
  }>({});

  const { resumeData, suggestions, jobInfo } = data;

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
      projects: resumeData?.projects || [],
      awards: resumeData?.awards || [],
      volunteer: resumeData?.volunteer || [],
      aiImprovements: resumeData?.aiImprovements || {},
    },
  });

  function handleComplete({
    resumeData,
    suggestions,
    jobInfo,
  }: {
    resumeData: DeepPartial<ResumeDataSchemaTypeExtended>;
    suggestions: DeepPartial<ResumeSuggestionsSchemaType>;
    jobInfo: ResumeAnalysisFormValues;
  }) {
    setData({ resumeData, suggestions, jobInfo });
    form.reset(resumeData);
  }

  function handleUpdateSuggestions(
    suggestions: DeepPartial<ResumeSuggestionsSchemaType>,
  ) {
    setData({ ...data, suggestions });
  }

  return (
    <div className="h-full space-y-8 overflow-y-auto p-6">
      {!resumeData && !suggestions && (
        <ResumeAnalysisForm onComplete={handleComplete} />
      )}

      {resumeData && suggestions && (
        <ResumeProvider
          resumeForm={form}
          suggestions={suggestions}
          jobInfo={jobInfo}
          setSuggestions={handleUpdateSuggestions}
        >
          <div className="container mx-auto h-full">
            <div className="flex flex-col gap-8 sm:flex-row">
              <section className="space-y-4">
                <ResumeToolbar />
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
