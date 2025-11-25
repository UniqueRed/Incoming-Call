import React from 'react';
import { Phone, Upload, Save, Camera, User, Image as ImageIcon, Crop, Music, X } from 'lucide-react';

export default function CreateCallForm({
  currentImage,
  callerName,
  callMode,
  ringtone,
  ringtoneName,
  editingTemplate,
  onImageUpload,
  onNameChange,
  onModeChange,
  onRingtoneUpload,
  onRemoveRingtone,
  onStartCall,
  onSaveTemplate,
  onCancelEdit,
  onReCrop
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border-2 border-zinc-200 dark:border-zinc-800 p-5 lg:sticky lg:top-20 transition-colors">
      {editingTemplate && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/50 rounded-md flex items-center justify-between border-2 border-blue-200 dark:border-blue-900">
          <span className="text-sm text-blue-900 dark:text-blue-100 font-medium">Editing</span>
          <button
            onClick={onCancelEdit}
            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="mb-5">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-0.5">
          {editingTemplate ? 'Edit' : 'New Call'}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {editingTemplate ? 'Update template' : 'Configure call'}
        </p>
      </div>

      {/* Image Upload Area */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
          Photo
        </label>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={onImageUpload}
          className="hidden"
        />
        <label htmlFor="imageInput" className="cursor-pointer block">
          {currentImage ? (
            <div className="space-y-2">
              <div className="relative overflow-hidden rounded-md border-2 border-zinc-200 dark:border-zinc-800">
                <img
                  src={currentImage}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('imageInput').click();
                  }}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-800 rounded-md text-sm font-medium text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                >
                  <Camera size={16} />
                  Change
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onReCrop();
                  }}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-800 rounded-md text-sm font-medium text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                >
                  <Crop size={16} />
                  Crop
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full h-48 bg-zinc-100 dark:bg-zinc-800 rounded-md flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
              <Upload className="text-zinc-400 dark:text-zinc-600 mb-2" size={28} />
              <span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                Upload
              </span>
            </div>
          )}
        </label>
      </div>

      {/* Name Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
          Name
        </label>
        <input
          type="text"
          value={callerName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="John Pork"
          className="w-full px-3 py-2 border-2 border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:border-transparent transition-colors"
        />
      </div>

      {/* Call Mode Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
          Style
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onModeChange('profile')}
            className={`p-2.5 rounded-md border-2 transition-colors ${
              callMode === 'profile'
                ? 'border-zinc-900 dark:border-white bg-zinc-50 dark:bg-zinc-800'
                : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <User size={18} className={callMode === 'profile' ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'} />
              <span className={`text-xs font-medium ${
                callMode === 'profile' ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400'
              }`}>
                Profile
              </span>
            </div>
          </button>

          <button
            onClick={() => onModeChange('background')}
            className={`p-2.5 rounded-md border-2 transition-colors ${
              callMode === 'background'
                ? 'border-zinc-900 dark:border-white bg-zinc-50 dark:bg-zinc-800'
                : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <ImageIcon size={18} className={callMode === 'background' ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-600'} />
              <span className={`text-xs font-medium ${
                callMode === 'background' ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400'
              }`}>
                Background
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Ringtone Upload */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
          Ringtone <span className="text-zinc-500 dark:text-zinc-400 font-normal">(optional)</span>
        </label>
        <input
          type="file"
          id="ringtoneInput"
          accept="audio/*"
          onChange={onRingtoneUpload}
          className="hidden"
        />
        {ringtone ? (
          <div className="flex items-center gap-2 p-2.5 bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-800 rounded-md">
            <Music size={16} className="text-zinc-600 dark:text-zinc-400 shrink-0" />
            <span className="text-sm text-zinc-900 dark:text-white truncate flex-1">
              {ringtoneName}
            </span>
            <button
              onClick={onRemoveRingtone}
              className="shrink-0 w-6 h-6 flex items-center justify-center rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <X size={14} className="text-zinc-600 dark:text-zinc-400" />
            </button>
          </div>
        ) : (
          <label
            htmlFor="ringtoneInput"
            className="cursor-pointer flex items-center justify-center gap-2 p-2.5 bg-white dark:bg-zinc-900 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-md hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
          >
            <Music size={16} className="text-zinc-400 dark:text-zinc-600" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
              Upload (max 30s)
            </span>
          </label>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={onStartCall}
          className="w-full bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2.5 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Phone size={16} />
          Start Call
        </button>

        <button
          onClick={onSaveTemplate}
          className="w-full bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white px-4 py-2.5 rounded-md font-medium transition-colors flex items-center justify-center gap-2 border-2 border-zinc-200 dark:border-zinc-800"
        >
          <Save size={16} />
          {editingTemplate ? 'Update' : 'Save'}
        </button>
      </div>
    </div>
  );
}