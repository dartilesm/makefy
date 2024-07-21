import { cn } from "@makify/ui/lib/utils";
import { motion } from "framer-motion";
import { CheckIcon, ClockIcon, SparklesIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { loadingPdfLinkMessages } from "./constants/loading-messages";

type NewDocumentLoadingStateProps = {
  loadingMessages: typeof loadingPdfLinkMessages;
};

export function NewDocumentLoadingState({
  loadingMessages,
}: NewDocumentLoadingStateProps) {
  const loadingTextRefs = useRef<HTMLDivElement[] | null[]>([]);

  useEffect(() => {
    const lastActiveIndex = loadingMessages.findIndex(
      (step) => !step.completed,
    );
    console.log(lastActiveIndex);
    if (loadingTextRefs.current[lastActiveIndex]) {
      loadingTextRefs.current[lastActiveIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [loadingMessages]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <SparklesIcon className="text-primary h-8 w-8" />
      <div className="relative">
        <div className="from-background pointer-events-none absolute inset-x-0 top-0 z-10 h-4 bg-gradient-to-b to-transparent" />
        <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 z-10 h-4 bg-gradient-to-t to-transparent" />
        <motion.div
          className="flex h-20 flex-col gap-[6px] overflow-hidden"
          layoutScroll
        >
          {loadingMessages.map((step, index) => (
            <>
              {index === 0 && <div className="block min-h-5 w-full" />}
              <motion.div
                layout
                className="flex w-full justify-center space-x-4"
                animate={{
                  scale:
                    step.active ||
                    (index === loadingMessages.length - 1 && step.completed)
                      ? 1
                      : 0.75,
                  opacity:
                    step.active ||
                    (index === loadingMessages.length - 1 && step.completed)
                      ? 1
                      : 0.3,
                }}
                transition={{ duration: 0.5 }}
                initial={{
                  scale: index === 0 ? 1 : 0.75,
                  opacity: index === 0 ? 1 : 0.3,
                }}
                ref={(el) => {
                  loadingTextRefs.current[index] = el;
                }}
              >
                <div>
                  {step.completed ? (
                    <CheckIcon className="h-5 w-5" />
                  ) : (
                    <ClockIcon className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium">{step.text}</h4>
                </div>
              </motion.div>
              {index === loadingMessages.length - 1 && (
                <div className="block min-h-5 w-full" />
              )}
            </>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
