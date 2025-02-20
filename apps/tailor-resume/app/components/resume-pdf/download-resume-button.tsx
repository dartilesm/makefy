import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumeDocument from "./resume-document";
import { useFormContext } from "react-hook-form";
import { ResumeDataSchemaTypeExtended } from "../resume-data/resume-data";
import { Button } from "@makefy/ui";
import { Download } from "lucide-react";

function DownloadResumeButton() {
  const form = useFormContext<ResumeDataSchemaTypeExtended>();

  if (!form || !form.getValues()) {
    return null;
  }

  return (
    <PDFDownloadLink
      document={<ResumeDocument data={form.getValues()} />}
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
