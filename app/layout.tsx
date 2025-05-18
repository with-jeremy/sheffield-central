import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Dancing_Script } from "next/font/google"
import "./globals.css"
import MenuButton from "@/components/MenuButton"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
})

export const metadata: Metadata = {
  title: "Sheffield Central - Historical Prints",
  description:
    "Original paintings depicting historical and culturally significant homes and structures from Sheffield, Alabama.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dancingScript.variable} font-serif`}>
        <main className="min-h-screen relative">
          <MenuButton />
          {children}
        </main>
      </body>
    </html>
  )
}

import './globals.css'