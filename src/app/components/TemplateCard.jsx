import React from 'react';
import { Star, Trash2, Edit2, User, Image as ImageIcon } from 'lucide-react';

export default function TemplateCard({ template, onUse, onEdit, onToggleFavorite, onDelete }) {
  return (
    <div className="relative bg-white dark:bg-zinc-900 rounded-md border-2 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 overflow-hidden transition-all group">
      {/* Template Image */}
      <div 
        onClick={() => onUse(template)}
        className="relative cursor-pointer"
      >
        <div className="aspect-4/3 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <img
            src={template.image}
            alt={template.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Mode Badge */}
        <div className="absolute top-2 left-2">
          <div className="bg-black/80 dark:bg-white/90 text-white dark:text-zinc-900 text-xs px-2 py-1 rounded-sm flex items-center gap-1">
            {template.mode === 'background' ? (
              <>
                <ImageIcon size={10} />
                <span className="font-medium">iOS</span>
              </>
            ) : (
              <>
                <User size={10} />
                <span className="font-medium">Profile</span>
              </>
            )}
          </div>
        </div>

        {/* Favorite Badge */}
        {template.favorited && (
          <div className="absolute top-2 right-2">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <Star size={12} className="fill-yellow-600 text-yellow-600" />
            </div>
          </div>
        )}
      </div>

      {/* Template Info */}
      <div 
        onClick={() => onUse(template)}
        className="p-2.5 cursor-pointer border-t-2 border-zinc-200 dark:border-zinc-800"
      >
        <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
          {template.name}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-2 right-2 flex gap-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(template.id);
          }}
          className="w-7 h-7 bg-white/95 dark:bg-zinc-900/95 rounded-sm flex items-center justify-center border-2 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
        >
          <Star
            size={14}
            className={template.favorited ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-400 dark:text-zinc-600'}
          />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(template);
          }}
          className="w-7 h-7 bg-white/95 dark:bg-zinc-900/95 rounded-sm flex items-center justify-center border-2 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
        >
          <Edit2 size={14} className="text-zinc-600 dark:text-zinc-400" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(template.id);
          }}
          className="w-7 h-7 bg-white/95 dark:bg-zinc-900/95 rounded-sm flex items-center justify-center border-2 border-zinc-200 dark:border-zinc-800 hover:border-red-300 dark:hover:border-red-800 transition-colors"
        >
          <Trash2 size={14} className="text-red-500" />
        </button>
      </div>
    </div>
  );
}