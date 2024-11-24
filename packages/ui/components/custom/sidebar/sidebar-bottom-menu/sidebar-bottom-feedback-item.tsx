"use client";

import { SidebarMenuButton } from "@makefy/ui/components/sidebar";
import { MessageSquareIcon } from "lucide-react";
import { forwardRef } from "react";

type SidebarBottomMenuFeedbackItemProps = React.ComponentProps<"button"> & {
  className?: string;
  onClick?: () => void;
};

export const SidebarBottomMenuFeedbackItem = forwardRef<
  HTMLButtonElement,
  SidebarBottomMenuFeedbackItemProps
>(function SidebarBottomMenuFeedbackButton(
  { className, onClick = () => null, ...props },
  ref,
) {
  return (
    <SidebarMenuButton
      {...props}
      tooltip="Feedback"
      onClick={onClick}
      ref={ref}
      className={className}
    >
      <MessageSquareIcon className="h-4 w-4" />
      Feedback
    </SidebarMenuButton>
  );
});
