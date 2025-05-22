"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import DashboardPayPalButton from "@/components/DashboardPayPalButton";

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Navigation({ isOpen, onClose }: NavigationProps) {
  // Close menu when pressing escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-sky-700/90 z-50 flex flex-col">
      <div className="flex justify-end p-6">
        <button
          onClick={onClose}
          className="text-white hover:text-amber-200 focus:outline-none"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex flex-col items-center justify-center flex-1">
        <ul className="space-y-8 text-center">
          <li>
            <Link
              href="/"
              onClick={onClose}
              className="text-3xl text-white hover:text-amber-200 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/prints/village"
              onClick={onClose}
              className="text-3xl text-white hover:text-amber-200 transition-colors"
            >
              Village Prints
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              onClick={onClose}
              className="text-3xl text-white hover:text-amber-200 transition-colors"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/prints/contemporary"
              onClick={onClose}
              className="text-3xl text-white hover:text-amber-200 transition-colors"
            >
              Contemporary Prints
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              onClick={onClose}
              className="text-3xl text-white hover:text-amber-200 transition-colors"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
