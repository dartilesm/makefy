import { Header } from "@/components/header/header";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@makefy/ui";
import { cn } from "@makefy/ui/lib/utils";
import type { User } from "@makefy/supabase/types";
import { Metadata } from "next";
import { createSupabaseServer } from "@makefy/supabase/server";

export const metadata: Metadata = {
  title: "Chats",
};

export default async function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <SidebarProvider
      defaultOpen={false}
      className="flex h-screen w-screen max-w-[100vw] flex-row"
    >
      <AppSidebar userInfo={user as User} />
      <div
        className={cn([
          "flex h-screen flex-1 shrink-0 flex-col",
          // Calculate the remaining width for the main content
          // as the css is not able to calculate it
          "max-w-[calc(100%-(var(--sidebar-width-icon)))]",
        ])}
      >
        <Header />
        <main className="flex flex-1 flex-row overflow-hidden">{children}</main>
      </div>
    </SidebarProvider>
  );
}
