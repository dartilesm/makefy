"use client";

import * as React from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";

import { cn } from "@makefy/ui/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const selectTriggerVariants = cva(
  "ring-offset-background placeholder:text-muted-foreground focus:ring-ring group/select-trigger flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        outline:
          "border-border/60 dark:border-border/70 border-2 shadow-none hover:border-gray-300 dark:hover:border-gray-600 focus:ring-gray-400",
        flat: "bg-secondary/90 dark:bg-secondary/90 text-secondary-foreground shadow hover:bg-secondary border-none shadow-none hover:[filter:brightness(0.98)] dark:hover:[filter:brightness(1.3)] focus:ring-gray-800 focus-visible:ring-offset-0",
      },
      variantColor: {
        default: "",
        primary: "",
        warning: "",
        destructive: "",
        success: "",
      },
    },
    compoundVariants: [
      {
        variant: "outline",
        variantColor: "destructive",
        className:
          "border-destructive text-destructive dark:border-destructive dark:text-destructive focus-visible:ring-destructive hover:border-destructive dark:hover:border-destructive",
      },
      {
        variant: "outline",
        variantColor: "success",
        className:
          "border-success text-success dark:border-success dark:text-success focus-visible:ring-success hover:border-success dark:hover:border-success",
      },
      {
        variant: "outline",
        variantColor: "destructive",
        className:
          "border-destructive text-destructive dark:border-destructive dark:text-destructive focus-visible:ring-destructive hover:border-destructive dark:hover:border-destructive",
      },
      {
        variant: "outline",
        variantColor: "success",
        className:
          "border-success text-success dark:border-success dark:text-success focus-visible:ring-success hover:border-success dark:hover:border-success",
      },
      {
        variant: "flat",
        variantColor: "primary",
        className: cn(
          "bg-primary/20 hover:bg-primary/10 text-primary placeholder:text-primary focus-visible:ring-primary hover:border-primary",
          // dark classes
          "dark:bg-primary/30 dark:hover:bg-primary/20 dark:[filter:brightness(1)] dark:hover:[filter:brightness(1)] dark:text-primary dark:placeholder:text-primary dark:hover:border-primary",
        ),
      },
      {
        variant: "flat",
        variantColor: "default",
        className: cn(
          "bg-secondary/80 hover:bg-secondary/90 text-secondary-foreground/70 placeholder:text-secondary-foreground/70 focus-visible:ring-secondary hover:border-secondary",
          // dark classes
          "dark:bg-secondary/80 dark:hover:bg-secondary/50 dark:[filter:brightness(1)] dark:hover:[filter:brightness(1)] dark:text-secondary-foreground/70 dark:placeholder:text-secondary-foreground/70 dark:hover:border-secondary",
        ),
      },
      {
        variant: "flat",
        variantColor: "warning",
        className: cn(
          "bg-warning/20 hover:bg-warning/30 text-warning placeholder:text-warning focus-visible:ring-warning hover:border-warning focus:ring-warning",
          // dark classes
          "dark:bg-warning/30 dark:hover:bg-warning/20 dark:[filter:brightness(1)] dark:hover:[filter:brightness(1)] dark:text-warning dark:placeholder:text-warning dark:hover:border-warning dark:focus:ring-warning",
        ),
      },
      {
        variant: "flat",
        variantColor: "destructive",
        className: cn(
          "bg-destructive/20 hover:bg-destructive/30 text-destructive placeholder:text-destructive focus-visible:ring-destructive hover:border-destructive",
          // dark classes
          "dark:bg-destructive/20 dark:hover:bg-destructive/10 dark:[filter:brightness(1)] dark:hover:[filter:brightness(1)] dark:text-destructive/80 dark:placeholder:text-destructive/80 dark:hover:border-destructive",
        ),
      },
      {
        variant: "flat",
        variantColor: "success",
        className: cn(
          "bg-success/20 hover:bg-success/30 text-success placeholder:text-success focus-visible:ring-success hover:border-success",
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

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> &
    VariantProps<typeof selectTriggerVariants>
>(({ className, children, variant, variantColor, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(selectTriggerVariants({ variant, variantColor }), className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className="h-4 w-4 opacity-50 transition-transform duration-100 group-data-[state=open]/select-trigger:rotate-180" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronUpIcon />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronDownIcon />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "focus:text-border-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-gray-200 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-gray-700",
      className,
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("bg-muted -mx-1 my-1 h-px", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
