"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-4 bg-gray-100 dark:bg-gray-900">
      <p className="text-gray-700 dark:text-gray-300 h-full flex items-center justify-center">
        View the source code on 
        <Link
          href="https://github.com/rutvik-kalathiya/sip-calculator" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
        >
          GitHub
        </Link>
      </p>
    </footer>
  );
}
