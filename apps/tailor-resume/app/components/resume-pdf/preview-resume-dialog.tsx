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
import {
  Check,
  Download,
  FileText,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Document, pdfjs, Thumbnail } from "react-pdf";
import { ClassicTemplate } from "./templates/classic-template";
import { ModernTemplate } from "./templates/modern-template";
import { HarvardTemplate } from "./templates/harvard-template";

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
  harvard: {
    component: HarvardTemplate,
    name: "Harvard Template",
    thumbnail: "/templates/harvard-thumb.png",
  },
} as const;

type TemplateType = keyof typeof TEMPLATES;

export function PreviewResumeDialog() {
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateType>("modern");
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resumeForm } = useResume();

  if (!resumeForm || !resumeForm.getValues()) {
    return null;
  }

  const CurrentTemplate = TEMPLATES[selectedTemplate].component;

  function handleTemplateSelect(template: TemplateType) {
    setSelectedTemplate(template);

    const container = containerRef.current;
    if (!container) return;

    // Find the selected button
    const selectedButton = container.querySelector(
      `[data-template="${template}"]`,
    );
    if (!selectedButton) return;

    // Calculate the center position
    const containerHeight = container.clientHeight;
    const buttonHeight = selectedButton.clientHeight;
    const scrollTop =
      selectedButton.offsetTop - (containerHeight - buttonHeight) / 2;

    // Smooth scroll to center the selected template
    container.scrollTo({
      top: Math.max(0, scrollTop),
      behavior: "smooth",
    });
  }

  function updateScrollButtons() {
    const container = containerRef.current;
    if (!container) return;

    console.log(
      "updating scroll buttons",
      container,
      container.scrollTop,
      container.scrollHeight,
      container.clientHeight,
    );
    const hasScrollTop = container.scrollTop > 0;
    const hasScrollBottom =
      container.scrollTop < container.scrollHeight - container.clientHeight;

    setCanScrollUp(hasScrollTop);
    setCanScrollDown(hasScrollBottom);
  }

  function scrollToTemplate(direction: "next" | "prev") {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = 297 + 16; // template height + gap
    const newScrollTop =
      direction === "next"
        ? container.scrollTop + scrollAmount
        : container.scrollTop - scrollAmount;

    container.scrollTo({
      top: newScrollTop,
      behavior: "smooth",
    });
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
        <div className="flex flex-col gap-4">
          <div className="flex max-h-[80vh] flex-1 flex-row gap-4">
            <div className="relative flex min-w-[152px] flex-col">
              {canScrollUp && (
                <button
                  onClick={() => scrollToTemplate("prev")}
                  className="bg-background hover:bg-accent absolute -top-2 left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full shadow-md transition-all"
                  aria-label="Scroll to previous template"
                >
                  <ChevronUp className="h-5 w-5" />
                </button>
              )}

              <div
                ref={containerRef}
                id="template-list"
                className={cn(
                  "flex flex-col gap-4 overflow-y-auto scroll-smooth px-1 py-2",
                  canScrollUp &&
                    canScrollDown &&
                    "[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]",
                  canScrollUp &&
                    !canScrollDown &&
                    "[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_100%)]",
                  !canScrollUp &&
                    canScrollDown &&
                    "[mask-image:linear-gradient(to_bottom,black_0%,black_90%,transparent)]",
                )}
                onScroll={updateScrollButtons}
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
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
                            data-template={key}
                            className={cn(
                              "hover:border-primary focus:ring-primary group relative aspect-[210/297] h-[297px] w-[210px] flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
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

              {canScrollDown && (
                <button
                  onClick={() => scrollToTemplate("next")}
                  className="bg-background hover:bg-accent absolute -bottom-2 left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full shadow-md transition-all"
                  aria-label="Scroll to next template"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              )}
            </div>

            <PDFViewer className="flex-1 rounded-md" showToolbar>
              <CurrentTemplate data={resumeForm.getValues()} />
            </PDFViewer>
          </div>
          <div className="inline-flex justify-end">
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
