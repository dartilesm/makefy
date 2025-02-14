"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@makefy/ui/lib/utils";
import { useEffect, useRef, useState } from "react";

function getBackground({
  borderColor,
  lineColor: defaultLineColor,
  animate,
}: {
  borderColor?: string;
  lineColor?: string;
  animate?: boolean;
}) {
  const lineColor = animate ? defaultLineColor : borderColor;

  return `conic-gradient(from calc(var(--r2) - 80deg) at var(--x) 15px,transparent 0,${lineColor} 20%,transparent 25%), ${borderColor}`;
}

const magicButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const buttonSpanBorderAnimation = cva(
  "pointer-events-none flex h-full flex-nowrap items-center gap-2 rounded-full font-medium text-sm w-full inline-flex items-center",
  {
    variants: {
      size: {
        default: "px-4 py-2",
        sm: "px-3 text-xs",
        lg: "px-8",
        icon: "w-9",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const buttonThemeVariants = {
  blue: {
    borderColor: "#1e3468",
    lineColor: "#5486ff",
    backgroundColor: "#120d0e",
    textColor: "#5486ff",
    shadowColor: "#112178",
  },
  yellow: {
    borderColor: "#3f3002",
    lineColor: "#ca8a04",
    textColor: "#f1f5f9",
    shadowColor: "#483100",
    backgroundColor: "#0e0e0f",
  },
};

export interface MagicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof magicButtonVariants> {
  asChild?: boolean;
  animate?: boolean;
  borderColor?: string;
  lineColor?: string;
  backgroundColor?: string;
  textColor?: string;
  shadowColor?: string;
  containerClassName?: string;
  theme?: keyof typeof buttonThemeVariants;
}

const MagicButton = React.forwardRef<HTMLButtonElement, MagicButtonProps>(
  (
    {
      className,
      containerClassName,
      size,
      asChild = false,
      animate = false,
      borderColor,
      lineColor,
      backgroundColor,
      textColor,
      shadowColor,
      theme = "blue",
      ...props
    },
    ref,
  ) => {
    const [buttonSize, setButtonSize] = useState<
      Record<"width" | "minWidth", number | null>
    >({ width: null, minWidth: null });
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const Comp = asChild ? Slot : "button";
    const { children, ...restOfProps } = props;

    useEffect(getButtonWidth, [children]);

    function getButtonWidth() {
      const buttonWidth = buttonRef.current?.getBoundingClientRect().width || 0;
      const buttonMinWidth = buttonWidth * 0.15;
      setButtonSize({ width: buttonWidth - 20, minWidth: buttonMinWidth });
    }

    const currentBorderColor =
      borderColor || buttonThemeVariants[theme].borderColor;
    const currentLineColor = lineColor || buttonThemeVariants[theme].lineColor;
    const currentBackgroundColor =
      backgroundColor || buttonThemeVariants[theme].backgroundColor;
    const currentTextColor = textColor || buttonThemeVariants[theme].textColor;
    const currentShadowColor =
      shadowColor || buttonThemeVariants[theme].shadowColor;

    return (
      <Comp
        className={cn(
          magicButtonVariants({ size, className }),
          "cursor-pointer rounded-full p-0.5 hue-rotate-[190deg] invert transition-all hover:[box-shadow:var(--magical-button-shadow)] dark:hue-rotate-0 dark:invert-0",
          animate && "animate-button-border transform-gpu",
        )}
        ref={(el) => {
          buttonRef.current = el;
          if (typeof ref === "function") {
            ref(el);
          } else if (ref) {
            ref.current = el;
          }
        }}
        style={
          {
            background: getBackground({
              borderColor: currentBorderColor,
              lineColor: currentLineColor,
              animate,
            }),
            "--magical-button-shadow": `0 0 20px 3px ${currentShadowColor}`,
            "--button-border-translation-x": buttonSize.width
              ? `${buttonSize.width}px`
              : undefined,
            "--button-border-min-translation-x": buttonSize.minWidth
              ? `${buttonSize.minWidth}px`
              : undefined,
          } as React.CSSProperties
        }
        {...restOfProps}
      >
        <span
          className={cn(
            buttonSpanBorderAnimation({ size, className: containerClassName }),
          )}
          style={{
            color: currentTextColor,
            backgroundColor: currentBackgroundColor,
          }}
        >
          {children}
        </span>
      </Comp>
    );
  },
);
MagicButton.displayName = "Button";

export { MagicButton, magicButtonVariants };
