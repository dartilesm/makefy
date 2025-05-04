import * as React from "react";

import { cn } from "@makefy/ui/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "border-input file:text-foreground placeholder:text-muted-foreground focus:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        outline:
          "border-border/60 dark:border-border/70 border-2 shadow-none hover:border-gray-300 dark:hover:border-gray-600",
        flat: "bg-secondary text-secondary-foreground shadow border-none shadow-none [filter:brightness(0.9)] dark:[filter:brightness(2)] hover:[filter:brightness(0.85)] dark:hover:[filter:brightness(2.2)] placeholder:text-secondary-foreground/50",
      },
      variantColor: {
        default: "focus:ring-secondary focus-visible:ring-secondary",
        primary: "focus:ring-primary focus-visible:ring-primary",
        warning: "focus:ring-warning focus-visible:ring-warning",
        destructive: "focus:ring-destructive focus-visible:ring-destructive",
        success: "focus:ring-success focus-visible:ring-success",
      },
    },
    compoundVariants: [
      {
        variant: "outline",
        variantColor: "destructive",
        className:
          "border-destructive text-destructive dark:border-destructive dark:text-destructive hover:border-destructive dark:hover:border-destructive",
      },
      {
        variant: "outline",
        variantColor: "success",
        className:
          "border-success text-success dark:border-success dark:text-success hover:border-success dark:hover:border-success",
      },
      {
        variant: "flat",
        variantColor: "primary",
        className: cn(
          "bg-primary/20 hover:bg-primary/10 text-primary placeholder:text-primary hover:border-primary",
          // dark classes
          "dark:bg-primary/30 dark:hover:bg-primary/20 dark:[filter:brightness(1)] dark:hover:[filter:brightness(1)] dark:text-primary dark:placeholder:text-primary dark:hover:border-primary",
        ),
      },
      {
        variant: "flat",
        variantColor: "default",
        className: cn(
          "bg-secondary/80 hover:bg-secondary/90 text-secondary-foreground/70 placeholder:text-secondary-foreground/70 hover:border-secondary",
          // dark classes
          "dark:bg-secondary/80 dark:hover:bg-secondary/50 dark:[filter:brightness(1)] dark:hover:[filter:brightness(1)] dark:text-secondary-foreground/70 dark:placeholder:text-secondary-foreground/70 dark:hover:border-secondary",
        ),
      },
      {
        variant: "flat",
        variantColor: "warning",
        className: cn(
          "bg-warning/20 hover:bg-warning/30 text-warning placeholder:text-warning hover:border-warning",
          // dark classes
          "dark:bg-warning/30 dark:hover:bg-warning/20 dark:[filter:brightness(1)] dark:hover:[filter:brightness(1)] dark:text-warning dark:placeholder:text-warning dark:hover:border-warning",
        ),
      },
      {
        variant: "flat",
        variantColor: "destructive",
        className: cn(
          "bg-destructive/20 hover:bg-destructive/30 text-destructive placeholder:text-destructive hover:border-destructive",
          // dark classes
          "dark:bg-destructive/20 dark:hover:bg-destructive/10 dark:[filter:brightness(1)] dark:hover:[filter:brightness(1)] dark:text-destructive/80 dark:placeholder:text-destructive/80 dark:hover:border-destructive",
        ),
      },
      {
        variant: "flat",
        variantColor: "success",
        className: cn(
          "bg-success/20 hover:bg-success/30 text-success placeholder:text-success hover:border-success",
          // dark classes
          "dark:bg-success/30 dark:hover:bg-success/20 dark:[filter:brightness(1)] dark:hover:[filter:brightness(1)] dark:text-success dark:placeholder:text-success dark:hover:border-success",
        ),
      },
    ],
    defaultVariants: {
      variant: "outline",
      variantColor: "default",
    },
  },
);
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, variantColor, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariants({ variant, variantColor }),
          // Invalid styles
          "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive aria-[invalid=true]:text-destructive aria-[invalid=true]:focus-visible:ring-destructive",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
0;
