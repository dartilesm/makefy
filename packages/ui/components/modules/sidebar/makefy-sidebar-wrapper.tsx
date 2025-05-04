import { SidebarProvider } from "@makefy/ui/components/sidebar";
import { cn } from "@makefy/ui/lib/utils";

type MakefySidebarWrapperProps = {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  direction?: "row" | "col";
  className?: string;
};

export function MakefySidebarWrapper({
  children,
  sidebar,
  header,
  direction = "row",
  className,
}: MakefySidebarWrapperProps) {
  return (
    <SidebarProvider
      defaultOpen={false}
      className={cn("flex h-screen w-screen max-w-[100vw]", className)}
      id="makefy-sidebar-wrapper"
    >
      {sidebar}
      <main
        className={cn([
          "flex h-screen flex-1 shrink-0 flex-col",
          // Calculate the remaining width for the main content
          // as the css is not able to calculate it
          "max-w-[calc(100%-(var(--sidebar-width-icon)))]",
        ])}
      >
        {header}
        <div
          className={cn("flex flex-1 overflow-hidden", {
            "flex-col": direction === "col",
            "flex-row": direction === "row",
          })}
        >
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}

MakefySidebarWrapper.displayName = "MakefySidebarWrapper";
