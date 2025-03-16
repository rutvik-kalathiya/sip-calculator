"use client";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function NavBar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md transition-all">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-white">
          InvestIQ
        </Link>

        {/* Dark Mode Toggle */}
        <button
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-all"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <Sun size={20} className="text-yellow-500" />
          ) : (
            <Moon size={20} className="text-gray-600" />
          )}
        </button>
      </div>
    </nav>
  );
}
