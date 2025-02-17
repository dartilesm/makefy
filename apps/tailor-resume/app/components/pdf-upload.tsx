"use client";

import { Button } from "@makefy/ui";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface PDFUploadProps {
  onUpload: (file: File) => Promise<void>;
  isLoading: boolean;
}

export function PDFUpload({ onUpload, isLoading }: PDFUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onUpload(acceptedFiles[0]);
      }
    },
    [onUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
    disabled: isLoading,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-muted-foreground/25 bg-muted/50 hover:bg-muted/80 relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-4 text-center transition-colors ${
        isDragActive ? "border-primary bg-primary/5" : ""
      } ${isLoading ? "cursor-not-allowed opacity-60" : ""}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2">
        <svg
          className="text-muted-foreground/50 h-10 w-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
          <path d="M12 12v9" />
          <path d="m8 17 4-4 4 4" />
        </svg>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">
            {isDragActive
              ? "Drop your resume here"
              : "Drag and drop your resume here"}
          </p>
          <p className="text-muted-foreground text-xs">or</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            disabled={isLoading}
          >
            Browse Files
          </Button>
        </div>
      </div>
    </div>
  );
}
