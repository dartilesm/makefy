"use client";

import { ResumeData } from "@/app/components/resume-data/resume-data";
import { ResumeSuggestions } from "@/app/components/resume-suggestions/resume-suggestions";
import { ProfileData, UploadSection } from "@/app/components/upload-section";
import {
  resumeDataSchema,
  ResumeDataSchemaType,
} from "@/schemas/resume-data.schema";
import {
  resumeSuggestionsSchema,
  ResumeSuggestionsSchemaType,
} from "@/schemas/resume-suggestions.schema";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { toast } from "@makefy/ui";

export default function ResumeEnhancer() {
  // AI object handlers
  const { object: resumeData, submit: getStructuredData } =
    useObject<ResumeDataSchemaType>({
      api: "/api/get-structured-resume-data",
      schema: resumeDataSchema,
    });

  const { object: suggestions, submit: getSuggestions } =
    useObject<ResumeSuggestionsSchemaType>({
      api: "/api/resume-suggestion",
      schema: resumeSuggestionsSchema,
    });

  // Get suggestions handler
  async function handleGetSuggestions(profileData: ProfileData) {
    if (!validateInput(profileData)) {
      return;
    }

    try {
      await processResume(profileData);
    } catch (error) {
      handleError(error);
    }
  }

  // Helper functions for better organization
  function validateInput(profileData: ProfileData) {
    if (!profileData.jobDescription?.trim()) {
      toast({
        title: "Error",
        description: !profileData.jobDescription?.trim()
          ? "Please enter a job description"
          : "Please upload a resume first",
        variant: "destructive",
      });
      return false;
    }
    return true;
  }

  async function processResume({
    resumeRawContent,
    jobTitle,
    jobDescription,
  }: ProfileData) {
    if (!resumeRawContent || !jobTitle || !jobDescription) return;
    await getStructuredData({ resumeRawContent });
    await getSuggestions({
      resumeRawContent,
      jobTitle: jobTitle,
      jobDescription: jobDescription,
    });
  }

  function handleError(error: unknown) {
    console.error("Error getting suggestions:", error);
    toast({
      title: "Error",
      description: "Failed to get suggestions",
      variant: "destructive",
    });
  }

  return (
    <div className="h-full space-y-8 overflow-y-auto p-6">
      {!resumeData && !suggestions && (
        <UploadSection onGetSuggestions={handleGetSuggestions} />
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
