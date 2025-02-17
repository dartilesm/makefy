"use client";

import { cn } from "@makefy/ui/lib/utils";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSparkles } from "./animated-sparkles";
import { ResumeSuggestionsSchemaType } from "@/schemas/resume-suggestions.schema";
import { DeepPartial } from "ai";
import { ResumeDataSchemaType } from "@/schemas/resume-data.schema";

const resumeStepMap: Partial<Record<keyof ResumeDataSchemaType, string>> = {
  experience: "Experience",
  education: "Education",
  skills: "Skills",
};

const jobStepMap: Partial<Record<keyof ResumeSuggestionsSchemaType, string>> = {
  keyJobQualifications: "Qualifications",
  areasToExpand: "Areas to expand",
};

const resumeSteps = ["Experience", "Education", "Skills"];
const jobSteps = ["Qualifications", "Areas to expand"];

interface AnalyzingScreenProps {
  suggestions?: DeepPartial<ResumeSuggestionsSchemaType>;
  resumeData?: DeepPartial<ResumeDataSchemaType>;
}

export function AnalyzingScreen({
  suggestions,
  resumeData,
}: AnalyzingScreenProps) {
  const [resumeVisibleSteps, setResumeVisibleSteps] = useState<
    typeof resumeSteps
  >([]);
  const [jobVisibleSteps, setJobVisibleSteps] = useState<typeof jobSteps>([]);

  useEffect(() => {
    setVisibleSteps("resume");
  }, [resumeData]);

  useEffect(() => {
    setVisibleSteps("job");
  }, [suggestions]);

  function setVisibleSteps(steps: "resume" | "job") {
    const dataObj = steps === "resume" ? resumeData : suggestions;
    const stepsMap = steps === "resume" ? resumeStepMap : jobStepMap;

    const areVisibleStepsComplete =
      resumeSteps.length === resumeVisibleSteps.length &&
      jobSteps.length === jobVisibleSteps.length;

    const isDataObjEmpty = !dataObj || Object.keys(dataObj).length === 0;

    if (isDataObjEmpty || areVisibleStepsComplete) return;

    Object.keys(dataObj).forEach((key) => {
      const step =
        stepsMap[
          key as keyof ResumeDataSchemaType & keyof ResumeSuggestionsSchemaType
        ];

      const isStepAlreadyVisible =
        resumeVisibleSteps.includes(step) || jobVisibleSteps.includes(step);

      if (step && !isStepAlreadyVisible) {
        console.log({ step });
        if (steps === "resume")
          setResumeVisibleSteps((prev) => [...prev, step]);
        else setJobVisibleSteps((prev) => [...prev, step]);
      }
    });
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="mb-8 flex flex-col items-center space-y-4">
        <div className="relative">
          <AnimatedSparkles />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold">Analyzing your application...</h2>
          <p className="text-muted-foreground text-sm">
            This might take several seconds.
          </p>
        </div>
      </div>

      <div className="grid w-full max-w-4xl gap-8 px-4 md:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-muted-foreground mb-4 text-sm font-medium">
            Resume Analysis
          </h3>
          {resumeVisibleSteps.length > 0 && (
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {resumeSteps
                  .filter((step) => resumeVisibleSteps.includes(step))
                  .map((step) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, height: 0, y: -20 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: 20 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors",
                        "border-primary/50 bg-primary/5",
                      )}
                    >
                      <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full">
                        <CheckIcon className="h-3 w-3" />
                      </div>
                      <span className="text-primary text-sm font-medium">
                        {step}
                      </span>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="text-muted-foreground mb-4 text-sm font-medium">
            Job Fit Analysis
          </h3>
          {jobVisibleSteps.length > 0 && (
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {jobSteps
                  .filter((step) => jobVisibleSteps.includes(step))
                  .map((step) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, height: 0, y: -20 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: 20 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors",
                        "border-primary/50 bg-primary/5",
                      )}
                    >
                      <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full">
                        <CheckIcon className="h-3 w-3" />
                      </div>
                      <span className="text-primary text-sm font-medium">
                        {step}
                      </span>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
