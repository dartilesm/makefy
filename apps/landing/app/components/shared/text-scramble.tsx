import { cn } from "@makify/ui/lib/utils";
import React, { useState, useEffect } from "react";

type TextScrambleProps = {
  children: string;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
};

export function TextScramble({
  children,
  as: Component = "p",
  className,
  style,
}: TextScrambleProps) {
  const [text, setText] = useState("");
  const finalText = children;
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setText((prevText) =>
        finalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return finalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );

      if (iteration >= finalText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [children]);

  return (
    <Component className={cn(className)} aria-label={children} style={style}>
      {text}
    </Component>
  );
}
