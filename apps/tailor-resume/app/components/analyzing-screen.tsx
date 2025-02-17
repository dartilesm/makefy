"use client";

import { cn } from "@makefy/ui/lib/utils";
import { CheckIcon, SparklesIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSparkles } from "./animated-sparkles";

interface AnalyzingStep {
  id: string;
  label: string;
  delay: number;
  category: "resume" | "job";
}

const steps: AnalyzingStep[] = [
  // Resume analysis steps
  { id: "experience", label: "Experience", delay: 1000, category: "resume" },
  { id: "education", label: "Education", delay: 2000, category: "resume" },
  { id: "skills", label: "Skills", delay: 3000, category: "resume" },
  // Job analysis steps
  { id: "about", label: "About the job", delay: 4000, category: "job" },
  { id: "company", label: "About the company", delay: 5000, category: "job" },
  {
    id: "qualifications",
    label: "Qualifications",
    delay: 6000,
    category: "job",
  },
];

interface AnalyzingScreenProps {
  onComplete?: () => void;
}

export function AnalyzingScreen({ onComplete }: AnalyzingScreenProps) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<string>("init");
  const [visibleSteps, setVisibleSteps] = useState<string[]>([]);
  const [currentCategory, setCurrentCategory] = useState<"resume" | "job">(
    "resume",
  );

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];

    // Initial delay before starting
    const initialTimeout = setTimeout(() => {
      steps.forEach((step) => {
        // Show step
        const showTimeout = setTimeout(() => {
          setVisibleSteps((prev) => [...prev, step.id]);
          if (step.category === "job" && currentCategory === "resume") {
            // Transition to job analysis
            setCurrentCategory("job");
          }
        }, step.delay - 500); // Show slightly before completing

        // Complete step
        const completeTimeout = setTimeout(() => {
          setCompletedSteps((prev) => [...prev, step.id]);
          setCurrentStep(step.id);

          // If this is the last step, call onComplete after a delay
          if (step.id === steps[steps.length - 1]?.id) {
            setTimeout(() => {
              onComplete?.();
            }, 1000);
          }
        }, step.delay);

        timeouts.push(showTimeout, completeTimeout);
      });
    }, 500);

    timeouts.push(initialTimeout);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [onComplete]);

  const currentSteps = steps.filter(
    (step) => step.category === currentCategory,
  );

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="mb-8 flex flex-col items-center space-y-4">
        <div className="relative">
          <AnimatedSparkles />
        </div>
        <div className="text-center">
          <motion.h2
            key={currentCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold"
          >
            {currentCategory === "resume"
              ? "Analyzing your resume..."
              : "Reviewing job description..."}
          </motion.h2>
          <p className="text-muted-foreground text-sm">
            This might take several seconds.
          </p>
        </div>
      </div>

      <div className="h-80 w-full max-w-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            <h3 className="text-muted-foreground mb-4 text-sm font-medium">
              {currentCategory === "resume"
                ? "Resume Analysis"
                : "Job Analysis"}
            </h3>
            <div className="space-y-3">
              {currentSteps.map((step) =>
                visibleSteps.includes(step.id) ? (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors",
                      completedSteps.includes(step.id)
                        ? "border-primary/50 bg-primary/5"
                        : "border-border bg-card",
                      currentStep === step.id && "border-primary",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full",
                        completedSteps.includes(step.id)
                          ? "bg-primary text-primary-foreground"
                          : "border-muted-foreground/30 border",
                      )}
                    >
                      {completedSteps.includes(step.id) ? (
                        <CheckIcon className="h-3 w-3" />
                      ) : (
                        <div
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            currentStep === step.id
                              ? "bg-primary"
                              : "bg-muted-foreground/30",
                          )}
                        />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-sm font-medium",
                        completedSteps.includes(step.id)
                          ? "text-primary"
                          : currentStep === step.id
                            ? "text-foreground"
                            : "text-muted-foreground",
                      )}
                    >
                      {step.label}
                    </span>
                  </motion.div>
                ) : null,
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
