import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@makify/ui/globals.css";
import { SidebarProvider, Toaster } from "@makify/ui";
import { ThemeProvider } from "./components/theme-provider";
import { cn } from "@makify/ui/lib/utils";
import PlausibleProvider from "next-plausible";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat with PDF",
  description: "Get insights from your PDFs in seconds",
  icons: {
    icon: [
      {
        rel: "icon",
        url: "/icon1.svg",
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
        url: "/icon1.svg",
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
      <head>
        <PlausibleProvider domain="makify-chat-with-pdf.vercel.app" enabled />
      </head>
      <body className={cn(inter.className, "h-screen")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
