"use client";

import { ResumeData } from "@/app/components/resume-data/resume-data";
import { ResumeSuggestions } from "@/app/components/resume-suggestions/resume-suggestions";
import { UploadSection } from "@/app/components/upload-section";
import { ResumeDataSchemaType } from "@/schemas/resume-data.schema";
import { ResumeSuggestionsSchemaType } from "@/schemas/resume-suggestions.schema";
import { DeepPartial } from "ai";
import { useState } from "react";

export default function ResumeEnhancer() {
  const [resumeData, setResumeData] =
    useState<DeepPartial<ResumeDataSchemaType>>();
  const [suggestions, setSuggestions] =
    useState<DeepPartial<ResumeSuggestionsSchemaType>>();

  function handleComplete({
    resumeData,
    suggestions,
  }: {
    resumeData: DeepPartial<ResumeDataSchemaType>;
    suggestions: DeepPartial<ResumeSuggestionsSchemaType>;
  }) {
    setResumeData(resumeData);
    setSuggestions(suggestions);
  }

  return (
    <div className="h-full space-y-8 overflow-y-auto p-6">
      {!resumeData && !suggestions && (
        <UploadSection onComplete={handleComplete} />
      )}

      {resumeData && suggestions && (
        <div className="container mx-auto h-full">
          <div className="flex flex-col gap-8 sm:flex-row">
            <section className="space-y-4">
              <ResumeData initialData={resumeData} suggestions={suggestions} />
            </section>

            <section className="space-y-4">
              <ResumeSuggestions suggestions={suggestions} />
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
