"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import Navigation from "./Navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-amber-50 border-b border-amber-200 py-4 px-6 relative z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-purple-900">
          Sheffield Central
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-purple-900 hover:text-purple-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </div>

      <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  )
}
