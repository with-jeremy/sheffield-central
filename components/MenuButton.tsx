"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import Navigation from "./Navigation"

export default function MenuButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-6 right-6 z-50 w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-purple-900 shadow-md hover:bg-purple-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        aria-label="Toggle menu"
      >
        <Menu size={24} className="text-purple-900" />
      </button>

      <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
