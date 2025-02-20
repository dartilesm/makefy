"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@makefy/ui";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { Download, FileText } from "lucide-react";
import { useState } from "react";
import { ModernTemplate } from "./templates/modern-template";
import { ClassicTemplate } from "./templates/classic-template";
import { useResume } from "@/app/contexts/resume-context";

const TEMPLATES = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
} as const;

type TemplateType = keyof typeof TEMPLATES;

export function PreviewResumeDialog() {
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateType>("modern");
  const { resumeForm } = useResume();

  if (!resumeForm || !resumeForm.getValues()) {
    return null;
  }

  const Template = TEMPLATES[selectedTemplate];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <FileText className="h-4 w-4" />
          Preview PDF
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Resume Preview</DialogTitle>
        </DialogHeader>
        <div className="flex h-[80vh] flex-col gap-4">
          <div className="flex items-center justify-end gap-4">
            <Select
              value={selectedTemplate}
              onValueChange={(value) =>
                setSelectedTemplate(value as TemplateType)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="modern">Modern Template</SelectItem>
                <SelectItem value="classic">Classic Template</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <PDFViewer className="flex-1 rounded-md">
            <Template data={resumeForm.getValues()} />
          </PDFViewer>
          <div className="flex justify-end">
            <PDFDownloadLink
              document={<Template data={resumeForm.getValues()} />}
              fileName="resume.pdf"
            >
              {({ loading }) => (
                <Button className="gap-2">
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
