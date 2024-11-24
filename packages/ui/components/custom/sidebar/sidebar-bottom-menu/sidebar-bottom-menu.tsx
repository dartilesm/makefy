import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@makefy/ui/components/sidebar";

type SidebarBottomMenuProps = {
  children: React.ReactNode;
};

export function SidebarBottomMenu({ children }: SidebarBottomMenuProps) {
  return (
    <SidebarGroup className="mt-auto">
      <SidebarGroupContent>
        <SidebarMenu>{children}</SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
