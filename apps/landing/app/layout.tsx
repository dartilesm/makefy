import "./globals.css";
import "@makify/ui/globals.css";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/app/components/layout/nav";
import { Suspense } from "react";
import { BackgroundBeamsWithCollision } from "./components/shared/background-beams-with-collision.tsx";

export const metadata = {
  title: "Makify - Tools that make your life easier",
  description:
    "Makify is all you need to make your life easier. It includes such useful tools as a chat with your PDF app, a media file sharing app, and a QR code generator.",
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
      <body className={cx(sfPro.variable, inter.variable)}>
        <Suspense fallback="...">
          <Nav />
        </Suspense>
        <main className="bg-background flex min-h-screen w-full flex-col items-center justify-center py-32">
          <BackgroundBeamsWithCollision className="fixed top-0 h-screen">
            {children}
          </BackgroundBeamsWithCollision>
        </main>
      </body>
    </html>
  );
}
