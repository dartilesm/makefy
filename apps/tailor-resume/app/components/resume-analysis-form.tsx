"use client";

import {
  FileIcon,
  ArrowRightIcon,
  FileTextIcon,
  SparklesIcon,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  Label,
  Button,
} from "@makefy/ui";
import { useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import { AnalyzingScreen } from "@/app/components/analyzing-screen";
import { ResumeSuggestionsSchemaType } from "@/schemas/resume-suggestions.schema";
import { resumeSuggestionsSchema } from "@/schemas/resume-suggestions.schema";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { DeepPartial } from "ai";
import { resumeDataSchema } from "@/schemas/resume-data.schema";
import { ResumeDataSchemaType } from "@/schemas/resume-data.schema";
import { toast } from "@makefy/ui";
import { FileUpload } from "@/app/components/file-upload";

interface ResumeAnalysisFormValues {
  resume: File | null;
  jobTitle: string;
  jobDescription: string;
}

interface ResumeAnalysisFormProps {
  onComplete: ({
    resumeData,
    suggestions,
  }: {
    resumeData: DeepPartial<ResumeDataSchemaType>;
    suggestions: DeepPartial<ResumeSuggestionsSchemaType>;
  }) => void;
  isLoading?: boolean;
}

export function ResumeAnalysisForm({
  onComplete,
  isLoading = false,
}: ResumeAnalysisFormProps) {
  const form = useForm<ResumeAnalysisFormValues>({
    defaultValues: {
      resume: null,
      jobTitle: "",
      jobDescription: "",
    },
  });

  async function handlePDFUpload(file: File) {
    form.setValue("resume", file);
    form.trigger("resume");
  }

  function handleFileRemove() {
    form.resetField("resume");
    console.log("file removed");
  }

  const {
    object: resumeData,
    submit: getStructuredData,
    isLoading: isResumeLoading,
  } = useObject<ResumeDataSchemaType>({
    api: "/api/get-structured-resume-data",
    schema: resumeDataSchema,
    onFinish: handleGetSuggestions,
  });

  const {
    object: suggestions,
    submit: getSuggestions,
    isLoading: isSuggestionsLoading,
  } = useObject<ResumeSuggestionsSchemaType>({
    api: "/api/resume-suggestion",
    schema: resumeSuggestionsSchema,
  });

  useEffect(() => {
    if (
      resumeData &&
      suggestions &&
      !isSuggestionsLoading &&
      !isResumeLoading
    ) {
      onComplete({ resumeData, suggestions });
    }
  }, [resumeData, suggestions, isSuggestionsLoading, isResumeLoading]);

  async function handleResumeStructuredData(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();
    if (!form.getValues().resume) {
      toast({
        title: "Error",
        description: "Please fill in all the fields",
        variant: "destructive",
      });
      return;
    }

    await getStructuredData({
      resumeRawContent: await form.getValues().resume?.text(),
    });
  }

  async function handleGetSuggestions({
    object: resumeData,
    error,
  }: {
    object?: DeepPartial<ResumeDataSchemaType>;
    error?: Error;
  }) {
    console.log({ resumeData, error });
    if (
      !resumeData ||
      !form.getValues().jobTitle ||
      !form.getValues().jobDescription
    ) {
      toast({
        title: "Error",
        description: "Please fill in all the fields",
        variant: "destructive",
      });
      return;
    }

    await getSuggestions({
      resumeRawContent: resumeData,
      jobTitle: form.getValues().jobTitle,
      jobDescription: form.getValues().jobDescription,
    });
  }

  if (isSuggestionsLoading || isResumeLoading) {
    return (
      <AnalyzingScreen suggestions={suggestions} resumeData={resumeData} />
    );
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
          <Form {...form}>
            <form
              onSubmit={handleResumeStructuredData}
              className="flex flex-col gap-4"
            >
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
                          Upload your resume to get started with the
                          optimization process
                        </p>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="resume"
                      rules={{ required: "Resume is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <FileUpload
                              onFileSelect={handlePDFUpload}
                              onFileRemove={handleFileRemove}
                              isLoading={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                          Provide the job details to tailor your resume
                          accordingly
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="jobTitle"
                        rules={{ required: "Job title is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="e.g. Senior Software Engineer"
                                className="bg-background/50"
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="jobDescription"
                        rules={{ required: "Job description is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Description</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Paste the full job description here..."
                                className="bg-background/50 min-h-[200px] resize-none"
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col items-end">
                <Button
                  type="submit"
                  disabled={
                    isLoading ||
                    form.formState.isSubmitting ||
                    !form.formState.isValid
                  }
                  className="gap-2"
                >
                  Get Suggestions
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
