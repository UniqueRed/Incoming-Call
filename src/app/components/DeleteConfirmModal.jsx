import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function DeleteConfirmModal({ templateName, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 rounded-lg border-2 border-zinc-200 dark:border-zinc-800 max-w-sm w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b-2 border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-950 rounded-md flex items-center justify-center">
              <AlertTriangle size={18} className="text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-white">Delete Template</h2>
          </div>
          <button
            onClick={onCancel}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X size={18} className="text-zinc-600 dark:text-zinc-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
            Are you sure you want to delete <span className="font-medium text-zinc-900 dark:text-white">"{templateName}"</span>?
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            This action cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div className="p-4 border-t-2 border-zinc-200 dark:border-zinc-800 flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-md font-medium transition-colors border-2 border-zinc-200 dark:border-zinc-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}