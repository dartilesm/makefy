import { MagicButton } from "@makefy/ui";
import { SparklesIcon } from "lucide-react";
import { TEXT_STYLE } from "@/constants/text-style";

const AI_FORMAT_STYLES = [
  {
    label: "Rewrite it",
    loadingLabel: "Rewriting...",
    style: TEXT_STYLE.REWRITE,
  },
  {
    label: "Shorten it",
    loadingLabel: "Shortening...",
    style: TEXT_STYLE.SHORTEN,
  },
  {
    label: "Make it formal",
    loadingLabel: "Making it formal...",
    style: TEXT_STYLE.FORMAL,
  },
  {
    label: "Make it casual",
    loadingLabel: "Making it casual...",
    style: TEXT_STYLE.CASUAL,
  },
];

interface FormatStyleButtonsProps {
  onImprove: (style: TEXT_STYLE) => void;
  loadingStates: Record<TEXT_STYLE, boolean>;
  currentLoadingState?: string;
  isLoading: boolean;
}

export function FormatStyleButtons({
  onImprove,
  loadingStates,
  currentLoadingState,
  isLoading,
}: FormatStyleButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {AI_FORMAT_STYLES.map(({ label, loadingLabel, style }) => (
        <MagicButton
          key={style}
          size="sm"
          onClick={() => onImprove(style)}
          className="flex gap-2"
          theme="yellow"
          animate={loadingStates[style]}
          disabled={currentLoadingState !== style && isLoading}
          type="button"
        >
          <SparklesIcon className="h-4 w-4 fill-yellow-600 stroke-yellow-600" />
          <span>{loadingStates[style] ? loadingLabel : label}</span>
        </MagicButton>
      ))}
    </div>
  );
}
