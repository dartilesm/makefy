import {
  Sidebar,
  MakefySidebarAppSwitcher,
  MakefySidebarBottomMenu,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@makefy/ui";
import Logo from "@/public/logo.svg";

export function AppSidebar() {
  return (
    <Sidebar className="z-20" collapsible="icon">
      <SidebarHeader className="transition-all duration-300 group-data-[collapsible=icon]:py-3">
        <MakefySidebarAppSwitcher
          icon={<Logo className="fill-accent h-auto w-5" />}
          name="Text Tools"
          href="/"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarMenu>
            {/* <SidebarMenuItem>
              <SidebarMenuButton>
                <Plus />
                <span>New conversation</span>
              </SidebarMenuButton>
            </SidebarMenuItem> */}
          </SidebarMenu>
        </SidebarGroup>
        <MakefySidebarBottomMenu>
          <MakefySidebarBottomMenu.FeedbackItem />
          <MakefySidebarBottomMenu.ThemeItem theme="system" />
        </MakefySidebarBottomMenu>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
