import { useResume } from "@/app/contexts/resume-context";
import { Button } from "@makefy/ui";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import ResumeDocument from "./resume-document";

function DownloadResumeButton() {
  const { resumeForm } = useResume();

  if (!resumeForm || !resumeForm.getValues()) {
    return null;
  }

  return (
    <PDFDownloadLink
      document={<ResumeDocument data={resumeForm.getValues()} />}
      fileName="resume.pdf"
    >
      {({ loading }) => (
        <Button size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          {loading ? "Generating..." : "Download PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}

export default DownloadResumeButton;
