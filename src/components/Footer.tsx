"use client";

import profileData from "@/data/profileData.json";

export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-gray-100 dark:border-dark-border">
      <div className="max-w-6xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} {profileData.personal.name}. All
          rights reserved.
        </p>
        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          Built with Next.js &middot; Powered by AI
        </p>
      </div>
    </footer>
  );
}
