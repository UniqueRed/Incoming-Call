import React from 'react';
import { Phone, Moon, Sun } from 'lucide-react';

export default function Header({ templateCount, darkMode, onToggleDarkMode }) {
  return (
    <div className="border-b-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-zinc-900 dark:bg-white rounded-md flex items-center justify-center">
              <Phone className="text-white dark:text-zinc-900" size={16} strokeWidth={2.5} />
            </div>
            <h1 className="text-base font-semibold text-zinc-900 dark:text-white">FakeCall</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              {templateCount}
            </div>
            <button
              onClick={onToggleDarkMode}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="text-zinc-400" size={18} />
              ) : (
                <Moon className="text-zinc-600" size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}