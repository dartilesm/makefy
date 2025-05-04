import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@makefy/ui/globals.css";
import { cn } from "@makefy/ui/lib/utils";
import { ThemeProvider } from "./components/theme-provider";
import { AppSidebar } from "./components/app-sidebar";
import { MakefySidebarWrapper, Toaster } from "@makefy/ui";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tailor Resume",
  description: "Tailor your resume with AI",
  icons: {
    icon: [
      {
        rel: "icon",
        url: "/icon.svg",
        media: "(prefers-color-scheme: dark)",
        type: "image/svg+xml",
      },
      {
        rel: "icon",
        url: "/icon2.svg",
        media: "(prefers-color-scheme: light)",
        type: "image/svg+xml",
      },
      {
        rel: "apple-touch-icon",
        url: "/icon.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "h-screen")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <MakefySidebarWrapper sidebar={<AppSidebar />} direction="col">
            {children}
          </MakefySidebarWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
