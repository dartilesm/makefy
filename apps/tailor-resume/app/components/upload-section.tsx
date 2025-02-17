"use client";

import { PDFUpload } from "@/app/components/pdf-upload";
import { Textarea, Label, Button, Input, MagicButton, toast } from "@makefy/ui";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  SparklesIcon,
  FileIcon,
  FileTextIcon,
} from "lucide-react";
import { useState } from "react";
import { AnalyzingScreen } from "@/app/components/analyzing-screen";

export type ProfileData = {
  resumeRawContent: string | null;
  jobTitle?: string;
  jobDescription?: string;
};

interface UploadSectionProps {
  onGetSuggestions: ({
    resumeRawContent,
    jobTitle,
    jobDescription,
  }: ProfileData) => void;
}

export function UploadSection({ onGetSuggestions }: UploadSectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    resumeRawContent: null,
    jobTitle: "",
    jobDescription: "",
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // PDF upload handler
  async function handlePDFUpload(file: File) {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to parse PDF");
      }

      const { rawContent: content } = await response.json();
      setProfileData({
        resumeRawContent: content,
      });
    } catch (error) {
      console.error("Error processing PDF:", error);
      toast({
        title: "Error",
        description: "Failed to process the PDF file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGetSuggestions() {
    if (
      !profileData.resumeRawContent ||
      !profileData.jobTitle ||
      !profileData.jobDescription
    ) {
      toast({
        title: "Error",
        description: "Please fill in all the fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Show analyzing screen while processing
    setIsAnalyzing(true);
  }

  function handleAnalysisComplete() {
    onGetSuggestions(profileData);
    setIsLoading(false);
    setIsAnalyzing(false);
  }

  if (isAnalyzing) {
    return <AnalyzingScreen onComplete={handleAnalysisComplete} />;
  }

  return (
    <div className="container mx-auto flex h-full flex-col justify-between gap-8">
      <div className="flex flex-1 flex-col justify-center gap-12">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-xl">
                <FileTextIcon className="text-primary h-8 w-8" />
                <div className="bg-primary absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full">
                  <SparklesIcon className="h-3 w-3 fill-white stroke-white" />
                </div>
              </div>
            </div>
          </div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight">
            AI Resume Optimizer
          </h1>
          <p className="text-muted-foreground mx-auto max-w-xl">
            Upload your resume and let our AI analyze it to provide personalized
            suggestions that will help you stand out for your dream job.
          </p>
        </div>

        <div className="relative mx-auto w-full">
          <div className="grid gap-4 md:grid-cols-2 md:gap-16">
            <div className="border-border bg-card/50 relative overflow-hidden rounded-xl border p-8 shadow-sm backdrop-blur-sm transition-all">
              <div className="from-primary/5 absolute inset-0 bg-gradient-to-b to-transparent" />
              <div className="relative space-y-6">
                <div className="flex items-center gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      Step 1: Upload Resume
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Upload your resume to get started with the optimization
                      process
                    </p>
                  </div>
                </div>
                <PDFUpload onUpload={handlePDFUpload} isLoading={isLoading} />
                <div className="text-muted-foreground mt-2 text-sm">
                  Supported: PDF, DOC, DOCX · Maximum size: 5MB
                </div>
              </div>
            </div>

            {/* Arrow connector (visible only on desktop) */}
            <div className="absolute left-1/2 top-1/2 hidden -translate-y-1/2 md:block">
              <div className="relative -translate-x-1/2 rounded-full p-4">
                <ArrowRightIcon className="text-muted-foreground h-6 w-6" />
              </div>
            </div>

            <div className="border-border bg-card/50 relative overflow-hidden rounded-xl border p-8 shadow-sm backdrop-blur-sm transition-all">
              <div className="from-primary/5 absolute inset-0 bg-gradient-to-t to-transparent md:bg-gradient-to-b" />
              <div className="relative space-y-6">
                <div className="flex items-center gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      Step 2: Enter Job Details
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Provide the job details to tailor your resume accordingly
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle" className="text-sm font-medium">
                      Job Title
                    </Label>
                    <Input
                      id="jobTitle"
                      value={profileData.jobTitle}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          jobTitle: e.target.value,
                        })
                      }
                      placeholder="e.g. Senior Software Engineer"
                      className="bg-background/50"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="jobDescription"
                      className="text-sm font-medium"
                    >
                      Job Description
                    </Label>
                    <Textarea
                      id="jobDescription"
                      value={profileData.jobDescription}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          jobDescription: e.target.value,
                        })
                      }
                      placeholder="Paste the full job description here..."
                      className="bg-background/50 min-h-[200px] resize-none"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-end">
        <Button
          onClick={handleGetSuggestions}
          disabled={
            isLoading ||
            !profileData.resumeRawContent ||
            !profileData.jobTitle ||
            !profileData.jobDescription
          }
          className="gap-2"
        >
          Get Suggestions
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
