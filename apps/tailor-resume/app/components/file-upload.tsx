"use client";

import { Button } from "@makefy/ui";
import { useCallback, useState } from "react";
import { useDropzone, Accept } from "react-dropzone";
import { X } from "lucide-react";

interface FileUploadProps {
  // File handling callbacks
  onFileSelect: (file: File) => Promise<void>;
  onFileRemove?: () => void;

  // File configuration
  accept?: Accept;
  maxSize?: number;

  // UI state
  selectedFile?: File | null;
  isLoading?: boolean;

  // Custom messages
  dragMessage?: string;
  dropMessage?: string;
  replaceMessage?: string;
  browseButtonText?: string;
}

export function FileUpload({
  onFileSelect,
  onFileRemove,
  accept = {
    "application/pdf": [".pdf"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
  },
  maxSize = 5 * 1024 * 1024, // 5MB default
  selectedFile = null,
  isLoading = false,
  dragMessage = "Drag and drop your file here",
  dropMessage = "Drop your file here",
  replaceMessage = "Click or drag and drop to replace file",
  browseButtonText = "Browse Files",
}: FileUploadProps) {
  const [currentSelectedFile, setCurrentSelectedFile] = useState<File | null>(
    selectedFile,
  );

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file) {
          onFileSelect(file);
          setCurrentSelectedFile(file);
        }
      }
    },
    [onFileSelect],
  );

  const handleRemoveFile = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onFileRemove?.();
      setCurrentSelectedFile(null);
    },
    [onFileRemove],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept,
    maxSize,
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
        {currentSelectedFile ? (
          <>
            <div className="bg-primary/10 flex items-center gap-2 rounded-md px-3 py-2">
              <span className="text-sm font-medium">
                {currentSelectedFile.name}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0"
                onClick={handleRemoveFile}
                disabled={isLoading}
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-muted-foreground text-xs">{replaceMessage}</p>
          </>
        ) : (
          <>
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
                {isDragActive ? dropMessage : dragMessage}
              </p>
              <p className="text-muted-foreground text-xs">or</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                disabled={isLoading}
              >
                {browseButtonText}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
