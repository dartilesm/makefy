import { MagicButton, MagicButtonProps } from "@makefy/ui";
import { SparklesIcon } from "lucide-react";
import { cn } from "@makefy/ui/lib/utils";
interface AIButtonProps extends MagicButtonProps {
    icon: React.ReactNode;
    label: string;
    children: never;
}

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
                "group px-2 transition-all duration-300 ease-in-out overflow-hidden w-auto min-w-9 rounded-full",
                className,
            )}
            containerClassName="w-full flex items-center justify-center gap-0 group-hover:px-2"
            lineColor="#ca8a04"
            borderColor="#3f3002"
            textColor="#f1f5f9"
            shadowColor="#483100"
            backgroundColor="#0e0e0f"
            {...props}
        >
            {icon}
            {label && (
                <span className="text-[0px] leading-5 whitespace-nowrap transition-all duration-300 ease-in-out group-hover:w-fit group-hover:text-sm group-hover:pl-2 group-hover:pr-1">
                    {label}
                </span>
            )}
        </MagicButton>
    );
}
