"use client";

import { useResume } from "@/app/contexts/resume-context";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Skeleton,
} from "@makefy/ui";
import { cn } from "@makefy/ui/lib/utils";
import { BlobProvider, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Check, Download, FileText } from "lucide-react";
import { useState } from "react";
import { Document, pdfjs, Thumbnail } from "react-pdf";
import { ClassicTemplate } from "./templates/classic-template";
import { ModernTemplate } from "./templates/modern-template";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const TEMPLATES = {
  modern: {
    component: ModernTemplate,
    name: "Modern Template",
    thumbnail: "/templates/modern-thumb.png",
  },
  classic: {
    component: ClassicTemplate,
    name: "Classic Template",
    thumbnail: "/templates/classic-thumb.png",
  },
} as const;

type TemplateType = keyof typeof TEMPLATES;

export function PreviewResumeDialog() {
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateType>("modern");
  const { resumeForm } = useResume();

  if (!resumeForm || !resumeForm.getValues()) {
    return null;
  }

  const CurrentTemplate = TEMPLATES[selectedTemplate].component;

  function handleTemplateSelect(template: TemplateType) {
    setSelectedTemplate(template);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2" variant="flat">
          <FileText className="h-4 w-4" />
          Preview PDF
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Resume Preview</DialogTitle>
        </DialogHeader>
        <div className="flex h-[80vh] flex-col gap-4">
          <div className="flex flex-1 flex-row gap-4">
            <div className="flex min-w-[152px] flex-col gap-4">
              {Object.entries(TEMPLATES).map(([key, template]) => {
                const Template = template.component;
                return (
                  <BlobProvider
                    key={key}
                    document={<Template data={resumeForm.getValues()} />}
                  >
                    {({ blob, url }) => {
                      if (!url) return null;
                      return (
                        <button
                          onClick={() =>
                            handleTemplateSelect(key as TemplateType)
                          }
                          className={cn(
                            "hover:border-primary focus:ring-primary group relative aspect-[210/297] h-[297px] w-[210px] overflow-hidden rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
                            selectedTemplate === key
                              ? "border-primary"
                              : "border-border",
                          )}
                          aria-label={`Select ${template.name}`}
                          tabIndex={0}
                        >
                          {url && (
                            <Document
                              file={url}
                              loading={
                                <Skeleton className="h-[297px] w-[210px]" />
                              }
                            >
                              <Thumbnail
                                pageNumber={1}
                                loading={null}
                                className="[&_canvas]:!h-full [&_canvas]:!w-full"
                              />
                            </Document>
                          )}
                          {selectedTemplate === key && (
                            <div className="bg-primary/20 absolute inset-0 flex items-center justify-center">
                              <Check className="text-primary h-6 w-6" />
                            </div>
                          )}
                          <div className="bg-background/90 absolute bottom-0 left-0 right-0 p-2 text-xs font-medium">
                            {template.name}
                          </div>
                        </button>
                      );
                    }}
                  </BlobProvider>
                );
              })}
            </div>
            <PDFViewer className="flex-1 rounded-md" showToolbar>
              <CurrentTemplate data={resumeForm.getValues()} />
            </PDFViewer>
          </div>
          <div className="flex justify-end">
            <PDFDownloadLink
              document={<CurrentTemplate data={resumeForm.getValues()} />}
              fileName="resume.pdf"
            >
              {({ loading }) => (
                <Button
                  className="gap-2"
                  variant="outline"
                  variantColor="secondary"
                >
                  <Download className="h-4 w-4" />
                  {loading ? "Generating..." : "Download PDF"}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
