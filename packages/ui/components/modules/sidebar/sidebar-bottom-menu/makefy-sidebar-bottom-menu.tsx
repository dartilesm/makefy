import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@makefy/ui/components/sidebar";
import { MakefySidebarBottomMenuFeedbackItem } from "./makefy-sidebar-bottom-feedback-item";
import { MakefySidebarBottomMenuThemeItem } from "./makefy-sidebar-bottom-theme-item";

type MakefySidebarBottomMenuProps = {
  children: React.ReactNode;
};

export function MakefySidebarBottomMenu({
  children,
}: MakefySidebarBottomMenuProps) {
  return (
    <SidebarGroup className="mt-auto">
      <SidebarGroupContent>
        <SidebarMenu>{children}</SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

MakefySidebarBottomMenu.displayName = "MakefySidebarBottomMenu";

MakefySidebarBottomMenu.FeedbackItem = MakefySidebarBottomMenuFeedbackItem;
MakefySidebarBottomMenu.ThemeItem = MakefySidebarBottomMenuThemeItem;
