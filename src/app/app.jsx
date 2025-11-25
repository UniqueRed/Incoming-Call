"use client"

import React, { useState, useEffect } from 'react';
import { Star, Trash2, Phone, X, Check, Upload, Save, Edit2, Camera, User, Image as ImageIcon } from 'lucide-react';
import { IoIosAlarm } from "react-icons/io";
import { TbMessageCircleFilled } from "react-icons/tb";

export default function FakeCallApp() {
  const [currentImage, setCurrentImage] = useState(null);
  const [callerName, setCallerName] = useState('');
  const [callMode, setCallMode] = useState('profile'); // 'profile' or 'background'
  const [templates, setTemplates] = useState([]);
  const [showCallScreen, setShowCallScreen] = useState(false);
  const [activeCall, setActiveCall] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);

  // Load templates from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('fakeCallTemplates');
    if (saved) {
      setTemplates(JSON.parse(saved));
    }
  }, []);

  // Save templates to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('fakeCallTemplates', JSON.stringify(templates));
  }, [templates]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCurrentImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveTemplate = () => {
    if (!currentImage) {
      alert('Please upload an image first!');
      return;
    }
    if (!callerName.trim()) {
      alert('Please enter a caller name!');
      return;
    }

    if (editingTemplate) {
      // Update existing template
      setTemplates(templates.map(t => 
        t.id === editingTemplate.id 
          ? { ...t, name: callerName, image: currentImage, mode: callMode }
          : t
      ));
      setEditingTemplate(null);
    } else {
      // Create new template
      const newTemplate = {
        id: Date.now(),
        name: callerName,
        image: currentImage,
        mode: callMode,
        favorited: false
      };
      setTemplates([...templates, newTemplate]);
    }

    // Reset form
    setCurrentImage(null);
    setCallerName('');
    setCallMode('profile');
  };

  const startCall = () => {
    if (!currentImage) {
      alert('Please upload an image first!');
      return;
    }
    if (!callerName.trim()) {
      alert('Please enter a caller name!');
      return;
    }

    const callData = {
      name: callerName,
      image: currentImage,
      mode: callMode
    };
    
    setActiveCall(callData);
    setShowCallScreen(true);
  };

  const useTemplate = (template) => {
    setActiveCall(template);
    setShowCallScreen(true);
  };

  const editTemplate = (template) => {
    setEditingTemplate(template);
    setCurrentImage(template.image);
    setCallerName(template.name);
    setCallMode(template.mode || 'profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingTemplate(null);
    setCurrentImage(null);
    setCallerName('');
  };

  const toggleFavorite = (id) => {
    setTemplates(templates.map(t => 
      t.id === id ? { ...t, favorited: !t.favorited } : t
    ));
  };

  const deleteTemplate = (id) => {
    if (window.confirm('Delete this template?')) {
      setTemplates(templates.filter(t => t.id !== id));
    }
  };

  const declineCall = () => {
    setShowCallScreen(false);
    setActiveCall(null);
  };

  const acceptCall = () => {
    alert('Call accepted! (Feature coming soon)');
  };

  // Sort templates: favorited first, then by date
  const sortedTemplates = [...templates].sort((a, b) => {
    if (a.favorited && !b.favorited) return -1;
    if (!a.favorited && b.favorited) return 1;
    return b.id - a.id;
  });

  if (showCallScreen && activeCall) {
    const isBackgroundMode = activeCall.mode === 'background';

    if (isBackgroundMode) {
      // iOS-style background mode
      return (
        <div className="fixed inset-0 animate-fade-in">
          {/* Background Image - No Blur */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${activeCall.image})` }}
          />

          {/* iOS-style Call Interface */}
          <div className="relative h-full flex flex-col justify-between p-6 text-white">
            {/* Top Section - Caller Name */}
            <div className="w-full text-center pt-20">
              <h1 className="text-4xl font-light mb-3 drop-shadow-lg">{activeCall.name}</h1>
              <p className="text-lg opacity-80 drop-shadow-md">Incoming</p>
            </div>

            {/* Bottom Section - Actions */}
            <div className="w-full space-y-16 pb-12">
              {/* Quick Actions - No Button Styling */}
              <div className="flex justify-center gap-20 px-4">
                <button className="flex flex-col items-center gap-3">
                  <IoIosAlarm size={32} className="drop-shadow-lg" fill="white" stroke="white" strokeWidth={2}/>
                  <span className="text-sm drop-shadow">Remind Me</span>
                </button>
                <button className="flex flex-col items-center gap-3">
                  <TbMessageCircleFilled size={32} className="drop-shadow-lg" fill="white"/>
                  <span className="text-sm drop-shadow">Message</span>
                </button>
              </div>

              {/* Main Call Actions */}
              <div className="flex justify-center gap-20 items-center px-8">
                <button
                  onClick={declineCall}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform">
                    <Phone size={26} className="rotate-[135deg]" fill="white" strokeWidth={0.5}/>
                  </div>
                  <span className="text-sm drop-shadow">Decline</span>
                </button>

                <button
                  onClick={acceptCall}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform">
                    <Phone size={26} fill="white" strokeWidth={0.5}/>
                  </div>
                  <span className="text-sm drop-shadow">Accept</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Profile mode (original style)
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-between p-10 animate-fade-in">
        {/* Caller Info */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <img
            src={activeCall.image}
            alt={activeCall.name}
            className="w-48 h-48 rounded-full object-cover border-4 border-white/30 shadow-2xl animate-pulse-slow mb-8"
          />
          <h1 className="text-5xl font-light text-white mb-2">{activeCall.name}</h1>
          <p className="text-xl text-gray-400">Incoming Call...</p>
        </div>

        {/* Call Actions */}
        <div className="flex gap-12 mb-12">
          <button
            onClick={declineCall}
            className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform"
          >
            <X size={32} />
          </button>
          <button
            onClick={acceptCall}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform"
          >
            <Check size={32} />
          </button>
        </div>

        <p className="text-gray-500 text-sm">📱 Ringing...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Modern Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Phone className="text-white" size={20} />
              </div>
              <h1 className="text-xl font-bold text-slate-900">FakeCall</h1>
            </div>
            <div className="text-sm text-slate-500">
              {templates.length} template{templates.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Create Call Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          {editingTemplate && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
              <span className="text-sm text-blue-700 font-medium">Editing template</span>
              <button
                onClick={cancelEdit}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          )}

          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            {editingTemplate ? 'Edit Template' : 'Create Call'}
          </h2>

          {/* Image Upload Area */}
          <div className="mb-4">
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label htmlFor="imageInput" className="cursor-pointer">
              <div className="relative group">
                {currentImage ? (
                  <div className="relative">
                    <img
                      src={currentImage}
                      alt="Preview"
                      className="w-full h-56 object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="text-white" size={32} />
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-56 bg-slate-100 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300 group-hover:border-blue-500 group-hover:bg-blue-50 transition-all">
                    <Upload className="text-slate-400 group-hover:text-blue-500 mb-2" size={40} />
                    <span className="text-sm text-slate-600 group-hover:text-blue-600 font-medium">
                      Upload photo
                    </span>
                  </div>
                )}
              </div>
            </label>
          </div>

          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Caller Name
            </label>
            <input
              type="text"
              value={callerName}
              onChange={(e) => setCallerName(e.target.value)}
              placeholder="e.g., John Pork"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Call Mode Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Call Style
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setCallMode('profile')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  callMode === 'profile'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <User size={24} className={callMode === 'profile' ? 'text-blue-600' : 'text-slate-400'} />
                  <span className={`text-sm font-medium ${
                    callMode === 'profile' ? 'text-blue-700' : 'text-slate-600'
                  }`}>
                    Profile
                  </span>
                  <span className="text-xs text-slate-500">Large photo</span>
                </div>
              </button>

              <button
                onClick={() => setCallMode('background')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  callMode === 'background'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <ImageIcon size={24} className={callMode === 'background' ? 'text-blue-600' : 'text-slate-400'} />
                  <span className={`text-sm font-medium ${
                    callMode === 'background' ? 'text-blue-700' : 'text-slate-600'
                  }`}>
                    Background
                  </span>
                  <span className="text-xs text-slate-500">iOS style</span>
                </div>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={startCall}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 active:scale-98"
            >
              <Phone size={20} />
              Start Call Now
            </button>

            <button
              onClick={saveTemplate}
              className="w-full bg-slate-100 text-slate-700 px-6 py-4 rounded-xl font-semibold hover:bg-slate-200 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Save size={20} />
              {editingTemplate ? 'Update Template' : 'Save as Template'}
            </button>
          </div>
        </div>

        {/* Templates Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Your Templates</h2>
            {templates.length > 0 && (
              <span className="text-sm text-slate-500">
                Tap to call
              </span>
            )}
          </div>

          {templates.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Save className="text-slate-400" size={24} />
              </div>
              <h3 className="text-slate-900 font-medium mb-2">No templates yet</h3>
              <p className="text-slate-500 text-sm">
                Save your first template to quickly access calls later
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {sortedTemplates.map((template) => (
                <div
                  key={template.id}
                  className="relative bg-white rounded-xl border-2 border-slate-200 overflow-hidden"
                >
                  {/* Template Image */}
                  <div 
                    onClick={() => useTemplate(template)}
                    className="relative cursor-pointer active:opacity-75 transition-opacity"
                  >
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-40 object-cover"
                    />
                    {/* Mode Badge */}
                    <div className="absolute top-2 left-2">
                      <div className="bg-black/60 backdrop-blur text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        {template.mode === 'background' ? (
                          <>
                            <ImageIcon size={12} />
                            <span>iOS</span>
                          </>
                        ) : (
                          <>
                            <User size={12} />
                            <span>Profile</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div 
                    onClick={() => useTemplate(template)}
                    className="p-3 cursor-pointer active:bg-slate-50 transition-colors"
                  >
                    <p className="text-sm font-semibold text-slate-900 truncate mb-1">
                      {template.name}
                    </p>
                  </div>

                  {/* Action Buttons - Always Visible */}
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(template.id);
                      }}
                      className="w-9 h-9 bg-white/95 backdrop-blur rounded-lg flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                    >
                      <Star
                        size={16}
                        className={template.favorited ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}
                      />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        editTemplate(template);
                      }}
                      className="w-9 h-9 bg-white/95 backdrop-blur rounded-lg flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                    >
                      <Edit2 size={16} className="text-slate-600" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTemplate(template.id);
                      }}
                      className="w-9 h-9 bg-white/95 backdrop-blur rounded-lg flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>

                  {/* Favorite Badge */}
                  {template.favorited && (
                    <div className="absolute top-2 right-2">
                      <div className="w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                        <Star size={14} className="fill-white text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        .active\:scale-98:active {
          transform: scale(0.98);
        }
        .active\:scale-95:active {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
}