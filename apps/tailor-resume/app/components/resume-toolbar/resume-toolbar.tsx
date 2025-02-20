import { Button } from "@makefy/ui";
import { Download, FileText, Share2 } from "lucide-react";
import DownloadResumeButton from "../resume-pdf/download-resume-button";

function ResumeToolbar() {
  return (
    <div className="bg-card mb-6 flex items-center justify-between rounded-lg border p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-2">
        <h2 className="text-card-foreground text-lg font-semibold">
          Resume Actions
        </h2>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => {
            // TODO: Implement templates feature
          }}
        >
          <FileText className="h-4 w-4" />
          Templates
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => {
            // TODO: Implement share feature
          }}
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>

        <DownloadResumeButton />
      </div>
    </div>
  );
}

export default ResumeToolbar;
