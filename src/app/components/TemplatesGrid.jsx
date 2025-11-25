import React from 'react';
import TemplateCard from './TemplateCard';
import { Save } from 'lucide-react';

export default function TemplatesGrid({
  templates,
  onUseTemplate,
  onEditTemplate,
  onToggleFavorite,
  onDeleteTemplate
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border-2 border-zinc-200 dark:border-zinc-800 p-5 transition-colors">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-0.5">Templates</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {templates.length > 0 ? 'Tap to call' : 'Saved calls appear here'}
        </p>
      </div>

      {templates.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-800 rounded-md flex items-center justify-center mx-auto mb-3">
            <Save className="text-zinc-400 dark:text-zinc-600" size={24} />
          </div>
          <h3 className="text-sm font-medium text-zinc-900 dark:text-white mb-1">No templates</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto">
            Save your first template
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onUse={onUseTemplate}
              onEdit={onEditTemplate}
              onToggleFavorite={onToggleFavorite}
              onDelete={onDeleteTemplate}
            />
          ))}
        </div>
      )}
    </div>
  );
}