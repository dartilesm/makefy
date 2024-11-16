import "./globals.css";
import "@makefy/ui/globals.css";
import { sfPro, inter } from "./fonts";
import Nav from "@/app/components/layout/nav";
import { BackgroundBeamsWithCollision } from "./components/shared/background-beams-with-collision.tsx";
import { cn } from "@makefy/ui/lib/utils";
import { Toaster } from "@makefy/ui";
import PlausibleProvider from "next-plausible";

export const metadata = {
  title: "Makefy - Tools that make your life easier",
  description:
    "Makefy is all you need to make your life easier. It includes such useful tools as a chat with your PDF app, a media file sharing app, and a QR code generator.",
  icons: {
    icon: [
      {
        rel: "icon",
        url: "/icon2.svg",
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
        url: "/icon2.svg",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <PlausibleProvider domain="makefy.app" enabled />
      </head>
      <body className={cn(sfPro.variable, inter.variable)}>
        <Nav />
        <Toaster />
        <main className="bg-background flex min-h-screen w-full flex-col items-center justify-center py-32">
          <BackgroundBeamsWithCollision className="fixed top-0 h-screen">
            {children}
          </BackgroundBeamsWithCollision>
        </main>
      </body>
    </html>
  );
}
