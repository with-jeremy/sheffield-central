"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Navigation from "./Navigation";

export default function MenuButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-6 right-6 z-50 w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-sky-600 shadow-md hover:bg-sky-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
        aria-label="Toggle menu"
      >
        <Menu size={24} className="text-sky-600" />
      </button>

      <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
