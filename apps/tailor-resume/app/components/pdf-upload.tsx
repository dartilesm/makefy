"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@makefy/ui";
import { FileIcon, Loader2Icon, UploadIcon } from "lucide-react";

interface PDFUploadProps {
  onUpload: (file: File) => void;
  isLoading?: boolean;
}

export function PDFUpload({ onUpload, isLoading = false }: PDFUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        onUpload(file);
      }
    },
    [onUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    disabled: isLoading,
  });

  return (
    <Card
      {...getRootProps()}
      className={`hover:border-primary/50 cursor-pointer border-dashed transition-colors ${
        isLoading ? "opacity-50" : ""
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-4 p-10">
        <input {...getInputProps()} />
        {isLoading ? (
          <Loader2Icon className="text-muted-foreground h-10 w-10 animate-spin" />
        ) : isDragActive ? (
          <UploadIcon className="text-muted-foreground h-10 w-10 animate-bounce" />
        ) : (
          <FileIcon className="text-muted-foreground h-10 w-10" />
        )}
        <p className="text-muted-foreground text-center text-sm">
          {isLoading
            ? "Processing PDF..."
            : isDragActive
              ? "Drop your resume PDF here"
              : "Drag & drop your resume PDF here, or click to select"}
        </p>
      </div>
    </Card>
  );
}
