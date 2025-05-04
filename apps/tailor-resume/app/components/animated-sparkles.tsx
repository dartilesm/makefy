"use client";

import { cn } from "@makefy/ui/lib/utils";
import { motion } from "framer-motion";
import { SparkleIcon } from "@makefy/ui/icons/sparkle";

const SparkleIconAnimated = motion(SparkleIcon);

interface AnimatedSparklesProps {
  className?: string;
}

export function AnimatedSparkles({ className }: AnimatedSparklesProps) {
  return (
    <div className={cn("relative h-16 w-16", className)}>
      {/* Main sparkle */}
      <SparkleIconAnimated
        className="text-primary absolute bottom-2 h-10 w-10"
        animate={{ scale: 1, opacity: 1 }}
        initial={{ scale: 0, opacity: 0 }}
        transition={{
          repeat: Infinity,
          duration: 0.5,
          repeatDelay: 0.5,
          repeatType: "reverse",
        }}
      />
      <SparkleIconAnimated
        className="text-primary absolute bottom-0 right-0 h-6 w-6"
        animate={{ scale: 1, opacity: 1 }}
        initial={{ scale: 0, opacity: 0 }}
        transition={{
          delay: 0.25,
          repeat: Infinity,
          duration: 0.5,
          repeatDelay: 0.5,
          repeatType: "reverse",
        }}
      />
      <SparkleIconAnimated
        className="text-primary absolute right-2 top-2 h-5 w-5"
        animate={{ scale: 1, opacity: 1 }}
        initial={{ scale: 0, opacity: 0 }}
        transition={{
          delay: 0.5,
          repeat: Infinity,
          duration: 0.5,
          repeatDelay: 0.5,
          repeatType: "reverse",
        }}
      />
    </div>
  );
}
