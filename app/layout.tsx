import type React from "react";
import type { Metadata } from "next";
import { Abel, Caveat } from "next/font/google";
import "./globals.css";
import MenuButton from "@/components/MenuButton";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

const abel = Abel({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abel",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Sheffield Central - Historical Prints",
  description:
    "Original paintings depicting historical and culturally significant homes and structures from Sheffield, Alabama.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${abel.variable} ${caveat.variable} font-abel`}>
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <main className="min-h-screen relative bg-blue-100 bg-[radial-gradient(ellipse_at_top_left,_rgba(59,130,246,0.8)_0%,_rgba(219,234,254,0.3)_60%,_rgba(219,234,254,0)_100%)]">
          <MenuButton />
          {children}
        </main>
      </body>
    </html>
  );
}

import "./globals.css";
