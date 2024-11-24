"use client";

import { motion } from "framer-motion";
import { cn } from "@makefy/ui/lib/utils";

interface ToolHeroProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

export function ToolHero({
  title,
  description,
  icon,
  className,
}: ToolHeroProps) {
  return (
    <div className={cn("relative overflow-hidden py-24", className)}>
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" />
        <div className="from-background to-background/60 absolute inset-0 bg-gradient-to-t" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-primary/10 text-primary mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
          >
            {icon}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-foreground mb-4 text-4xl font-bold tracking-tight sm:text-5xl"
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-muted-foreground max-w-2xl text-lg"
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
