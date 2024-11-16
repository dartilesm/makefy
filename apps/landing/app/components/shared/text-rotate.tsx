import { cn } from "@makify/ui/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

type TextRotateProps = {
  children: string;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
};

export const TextRotate = ({
  children,
  as: Component = "span",
  className,
  style,
}: TextRotateProps) => {
  return (
    <Component className={cn(className, "relative")} style={style}>
      <AnimatePresence mode="popLayout">
        <span className="opacity-0">{children}</span>
        <motion.span
          className="absolute left-0 inline-block bg-inherit bg-gradient-to-br from-inherit to-inherit bg-clip-text text-inherit"
          key={children}
          initial={{ y: 20, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -20, opacity: 0, scale: 0.8 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </Component>
  );
};
