import { PreviewResumeDialog } from "@/components/resume-pdf/preview-resume-dialog";

function ResumeToolbar() {
  return (
    <div className="bg-card mb-6 flex items-center justify-between rounded-lg border p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-2">
        <PreviewResumeDialog />
      </div>
    </div>
  );
}

export default ResumeToolbar;
