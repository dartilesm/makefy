import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@makefy/ui/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Text Tools - TikTok Hook Generator",
  description: "Generate engaging hooks for your TikTok videos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
