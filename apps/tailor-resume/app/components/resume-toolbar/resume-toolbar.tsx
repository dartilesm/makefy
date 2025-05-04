import { PreviewResumeDialog } from "@/components/resume-pdf/preview-resume-dialog";
import { EmailResumeDialog } from "./email-resume-dialog";
import { Button } from "@makefy/ui";
import { MailIcon, ShareIcon } from "lucide-react";

function ResumeToolbar() {
  return (
    <div className="bg-card mb-6 flex items-center justify-end gap-4 rounded-lg border p-4 shadow-sm transition-all hover:shadow-md">
      {/* Mail button */}
      <div className="flex items-center gap-2">
        <EmailResumeDialog
          trigger={
            <Button
              className="gap-2"
              variant="ghost"
              variantColor="secondary"
              size="sm"
            >
              <MailIcon className="h-4 w-4" />
              Mail
            </Button>
          }
        />
      </div>
      {/* Share button */}
      <div className="flex items-center gap-2">
        <Button
          className="gap-2"
          variant="ghost"
          variantColor="secondary"
          size="sm"
        >
          <ShareIcon className="h-4 w-4" />
          Share
        </Button>
      </div>
      {/* Preview button */}
      <div className="flex items-center gap-2">
        <PreviewResumeDialog />
      </div>
    </div>
  );
}

export default ResumeToolbar;
