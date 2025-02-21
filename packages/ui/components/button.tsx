import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@makefy/ui/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 overflow-hidden relative z-[1] active:scale-[0.98] transition-transform duration-100 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        outline:
          "border border-input bg-background shadow-none hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",

        // New variants
        solid: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        flat: "bg-primary/40 text-primary-foreground shadow hover:bg-primary/50 focus-visible:ring-offset-0",
      },
      variantColor: {
        primary:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 focus:ring-primary focus-visible:ring-primary",
        secondary:
          "bg-secondary/80 text-secondary-foreground shadow-sm hover:bg-secondary focus:ring-secondary focus-visible:ring-secondary",
        warning:
          "bg-warning text-warning-foreground shadow-sm hover:bg-warning/80 focus:ring-warning focus-visible:ring-warning",
        destructive:
          "bg-destructive text-primary-foreground shadow-sm hover:bg-destructive/90 focus:ring-destructive focus-visible:ring-destructive",
        success:
          "bg-success text-success-foreground shadow-sm hover:bg-success/90 focus:ring-success focus-visible:ring-success",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    compoundVariants: [
      {
        variant: "outline",
        variantColor: "primary",
        className:
          "bg-background text-primary/80 hover:bg-transparent border-2 border-primary/80 hover:border-primary hover:text-primary focus:ring-primary focus-visible:ring-primary",
      },
      {
        variant: "outline",
        variantColor: "secondary",
        className:
          "bg-background/50 text-secondary-foreground/80 hover:bg-transparent border-2 border-border/80 hover:border-gray-300 hover:text-secondary-foreground/80 dark:hover:border-gray-600 focus:ring-gray-400 focus-visible:ring-gray-400",
      },
      {
        variant: "outline",
        variantColor: "warning",
        className:
          "bg-background text-warning/80 hover:bg-transparent border-2 border-warning/80 hover:border-warning hover:text-warning focus:ring-warning focus-visible:ring-warning",
      },
      {
        variant: "outline",
        variantColor: "destructive",
        className:
          "bg-background text-destructive/80 hover:bg-transparent border-2 border-destructive/80 hover:border-destructive hover:text-destructive focus:ring-destructive focus-visible:ring-destructive",
      },
      {
        variant: "outline",
        variantColor: "success",
        className:
          "bg-background text-success/80 hover:bg-transparent border-2 border-success/80 hover:border-success hover:text-success focus:ring-success focus-visible:ring-success",
      },
      {
        variant: "ghost",
        variantColor: "primary",
        className:
          "bg-transparent hover:bg-primary/10 text-primary hover:text-primary border-none shadow-none focus:ring-primary focus-visible:ring-primary",
      },
      {
        variant: "ghost",
        variantColor: "secondary",
        className:
          "bg-transparent hover:bg-secondary/10 text-secondary-foreground/80 hover:text-secondary-foreground/80 border-none shadow-none focus:ring-secondary focus-visible:ring-secondary",
      },
      {
        variant: "ghost",
        variantColor: "warning",
        className:
          "bg-transparent hover:bg-warning/10 text-warning hover:text-warning border-none shadow-none focus:ring-warning focus-visible:ring-warning",
      },
      {
        variant: "ghost",
        variantColor: "destructive",
        className:
          "bg-transparent hover:bg-destructive/10 text-destructive hover:text-destructive border-none shadow-none focus:ring-destructive focus-visible:ring-destructive",
      },
      {
        variant: "ghost",
        variantColor: "success",
        className:
          "bg-transparent hover:bg-success/10 text-success hover:text-success border-none shadow-none focus:ring-success focus-visible:ring-success",
      },
      {
        variant: "flat",
        variantColor: "primary",
        className:
          "bg-primary/20 text-primary shadow hover:bg-primary/30 border-none shadow-none focus:ring-primary focus-visible:ring-primary",
      },
      {
        variant: "flat",
        variantColor: "secondary",
        className:
          "bg-secondary/90 dark:bg-secondary/90 text-secondary-foreground shadow hover:bg-secondary border-none shadow-none focus:ring-secondary focus-visible:ring-secondary hover:[filter:brightness(0.98)] dark:hover:[filter:brightness(1.3)]",
      },
      {
        variant: "flat",
        variantColor: "warning",
        className:
          "bg-warning/20 text-warning shadow hover:bg-warning/30 border-none shadow-none focus:ring-warning focus-visible:ring-warning",
      },
      {
        variant: "flat",
        variantColor: "destructive",
        className:
          "bg-destructive/20 text-destructive shadow hover:bg-destructive/30 border-none shadow-none focus:ring-destructive focus-visible:ring-destructive",
      },
      {
        variant: "flat",
        variantColor: "success",
        className:
          "bg-success/20 text-success shadow hover:bg-success/30 border-none shadow-none focus:ring-success focus-visible:ring-success",
      },
    ],
    defaultVariants: {
      variantColor: "primary",
      variant: "solid",
      size: "default",
    },
  },
);

const rippleVariants = cva(
  "absolute block h-5 w-5 rounded-full bg-current opacity-100 -z-[1] animate-ripple",
  {
    variants: {
      variant: {
        default: "bg-primary/80 [filter:brightness(1.3)]",
        destructive: "bg-destructive/80 [filter:brightness(0.8)]",
        outline:
          "bg-background/80 [filter:brightness(0.8)] dark:[filter:brightness(2.5)]",
        secondary:
          "bg-secondary/80 [filter:brightness(0.8)] dark:[filter:brightness(1.5)]",
        ghost:
          "bg-secondary/80 [filter:brightness(0.8)] dark:[filter:brightness(1.5)]",
        link: "bg-transparent opacity-0",
        solid: "bg-primary/80 [filter:brightness(1.3)]",
        flat: "bg-primary/30 [filter:brightness(0.8)]",
      },
      variantColor: {
        primary: "bg-primary/80 [filter:brightness(1.3)]",
        secondary:
          "bg-secondary/80 [filter:brightness(0.8)] dark:[filter:brightness(1.5)]",
        warning:
          "bg-warning/80 [filter:brightness(0.8)] dark:[filter:brightness(0.6)]",
        destructive: "bg-destructive/80 [filter:brightness(0.8)]",
        success: "bg-success/80 [filter:brightness(0.8)]",
      },
    },
    compoundVariants: [
      {
        variant: ["outline", "ghost"],
        variantColor: "primary",
        className: "bg-primary/20 [filter:brightness(0.8)]",
      },
      {
        variant: ["outline", "ghost"],
        variantColor: "secondary",
        className: "bg-secondary-foreground/20",
      },
      {
        variant: ["outline", "ghost"],
        variantColor: "warning",
        className: "bg-warning/20",
      },
      {
        variant: ["outline", "ghost"],
        variantColor: "destructive",
        className: "bg-destructive/20",
      },
      {
        variant: ["outline", "ghost"],
        variantColor: "success",
        className: "bg-success/20",
      },
      {
        variant: "flat",
        variantColor: "primary",
        className: "bg-primary/30",
      },
      {
        variant: "flat",
        variantColor: "destructive",
        className: "bg-destructive/30",
      },
    ],
    defaultVariants: {
      variantColor: "primary",
      variant: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      variantColor,
      asChild = false,
      children,
      ...props
    },
    ref,
  ) => {
    const [coords, setCoords] = React.useState<{
      left: number | string;
      top: number | string;
      transform?: string;
    }>({
      left: -1,
      top: -1,
    });
    const [isRippling, setIsRippling] = React.useState(false);

    React.useEffect(() => {
      if (coords.left !== -1 && coords.top !== -1) {
        setIsRippling(true);
        setTimeout(() => setIsRippling(false), 300);
      } else setIsRippling(false);
    }, [coords]);

    React.useEffect(() => {
      if (!isRippling) setCoords({ left: -1, top: -1 });
    }, [isRippling]);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
      const isKeyboard = event.screenX === 0 && event.screenY === 0;

      const rect = event.currentTarget.getBoundingClientRect();

      const left = isKeyboard ? "auto" : event.clientX - rect.left;
      const top = isKeyboard ? "auto" : event.clientY - rect.top;

      setCoords({ left, top });
      props.onClick?.(event);
    }

    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, variantColor, className }),
        )}
        ref={ref}
        {...props}
        onClick={handleClick}
      >
        {isRippling && (
          <span
            className={cn(rippleVariants({ variant, variantColor }))}
            style={coords}
          />
        )}
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
