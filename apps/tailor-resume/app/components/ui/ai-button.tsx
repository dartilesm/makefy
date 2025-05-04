import { MagicButton, MagicButtonProps } from "@makefy/ui";
import { SparklesIcon } from "lucide-react";
import { cn } from "@makefy/ui/lib/utils";
type AIButtonProps = Exclude<MagicButtonProps, "children"> & {
  icon?: React.ReactNode;
  label: string;
};

const defaultIcon = (
  <SparklesIcon className="h-4 w-4 fill-yellow-600 stroke-yellow-600" />
);

export function AIButton({
  icon = defaultIcon,
  label,
  className,
  ...props
}: AIButtonProps) {
  return (
    <MagicButton
      size="icon"
      className={cn(
        "group w-auto min-w-9 overflow-hidden rounded-full px-2 transition-all duration-300 ease-in-out",
        className,
      )}
      containerClassName="w-full flex items-center justify-center gap-0 group-hover:px-2"
      theme="yellow"
      {...props}
    >
      {icon}
      {label && (
        <span className="whitespace-nowrap text-[0px] leading-5 transition-all duration-300 ease-in-out group-hover:w-fit group-hover:pl-2 group-hover:pr-1 group-hover:text-sm">
          {label}
        </span>
      )}
    </MagicButton>
  );
}
