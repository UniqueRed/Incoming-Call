"use client"

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CreateCallForm from './components/CreateCallForm';
import TemplatesGrid from './components/TemplatesGrid';
import CallScreen from './components/CallScreen';
import ImageCropModal from './components/ImageCropModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';

export default function FakeCallApp() {
  const [currentImage, setCurrentImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null); // Store original for re-cropping
  const [tempImage, setTempImage] = useState(null); // For crop modal
  const [showCropModal, setShowCropModal] = useState(false);
  const [callerName, setCallerName] = useState('');
  const [callMode, setCallMode] = useState('profile');
  const [ringtone, setRingtone] = useState(null); // Audio file
  const [ringtoneName, setRingtoneName] = useState('');
  const [templates, setTemplates] = useState([]);
  const [showCallScreen, setShowCallScreen] = useState(false);
  const [activeCall, setActiveCall] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);

  // Load dark mode preference
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

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

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    
    const html = document.documentElement;
    if (newDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target.result;
        setOriginalImage(imageData); // Store original
        setTempImage(imageData);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage, selectedMode) => {
    setCurrentImage(croppedImage);
    setCallMode(selectedMode); // Update call mode based on what was selected in crop modal
    setShowCropModal(false);
    setTempImage(null);
  };

  const handleCropCancel = () => {
    setShowCropModal(false);
    setTempImage(null);
  };

  const handleReCrop = () => {
    if (originalImage) {
      setTempImage(originalImage); // Always use original image
      setShowCropModal(true);
    }
  };

  const handleRingtoneUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if it's an audio file
      if (!file.type.startsWith('audio/')) {
        alert('Please upload an audio file (MP3, WAV, etc.)');
        return;
      }

      // Create a temporary audio element to check duration
      const audio = new Audio();
      const reader = new FileReader();
      
      reader.onload = (event) => {
        audio.src = event.target.result;
        audio.onloadedmetadata = () => {
          if (audio.duration > 30) {
            alert('Ringtone must be 30 seconds or less. Please upload a shorter audio file.');
            return;
          }
          
          // If valid, store the ringtone
          setRingtone(event.target.result);
          setRingtoneName(file.name);
        };
      };
      
      reader.readAsDataURL(file);
    }
  };

  const removeRingtone = () => {
    setRingtone(null);
    setRingtoneName('');
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
      setTemplates(templates.map(t => 
        t.id === editingTemplate.id 
          ? { ...t, name: callerName, image: currentImage, originalImage: originalImage, mode: callMode, ringtone: ringtone, ringtoneName: ringtoneName }
          : t
      ));
      setEditingTemplate(null);
    } else {
      const newTemplate = {
        id: Date.now(),
        name: callerName,
        image: currentImage,
        originalImage: originalImage, // Store original for re-cropping later
        mode: callMode,
        ringtone: ringtone,
        ringtoneName: ringtoneName,
        favorited: false
      };
      setTemplates([...templates, newTemplate]);
    }

    setCurrentImage(null);
    setOriginalImage(null);
    setCallerName('');
    setCallMode('profile');
    setRingtone(null);
    setRingtoneName('');
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
      mode: callMode,
      ringtone: ringtone
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
    setOriginalImage(template.originalImage || template.image); // Use original if available
    setCallerName(template.name);
    setCallMode(template.mode || 'profile');
    setRingtone(template.ringtone || null);
    setRingtoneName(template.ringtoneName || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingTemplate(null);
    setCurrentImage(null);
    setOriginalImage(null);
    setCallerName('');
    setCallMode('profile');
    setRingtone(null);
    setRingtoneName('');
  };

  const toggleFavorite = (id) => {
    setTemplates(templates.map(t => 
      t.id === id ? { ...t, favorited: !t.favorited } : t
    ));
  };

  const deleteTemplate = (id) => {
    const template = templates.find(t => t.id === id);
    setTemplateToDelete(template);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (templateToDelete) {
      setTemplates(templates.filter(t => t.id !== templateToDelete.id));
      setDeleteModalOpen(false);
      setTemplateToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setTemplateToDelete(null);
  };

  const declineCall = () => {
    setShowCallScreen(false);
    setActiveCall(null);
  };

  const acceptCall = () => {
    alert('Call accepted! (Feature coming soon)');
  };

  const sortedTemplates = [...templates].sort((a, b) => {
    if (a.favorited && !b.favorited) return -1;
    if (!a.favorited && b.favorited) return 1;
    return b.id - a.id;
  });

  if (showCallScreen && activeCall) {
    return (
      <CallScreen 
        activeCall={activeCall}
        onDecline={declineCall}
        onAccept={acceptCall}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors">
      <Header templateCount={templates.length} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Create Call Form - Left/Top */}
          <div className="lg:col-span-5 xl:col-span-4">
            <CreateCallForm
              currentImage={currentImage}
              callerName={callerName}
              callMode={callMode}
              ringtone={ringtone}
              ringtoneName={ringtoneName}
              editingTemplate={editingTemplate}
              onImageUpload={handleImageUpload}
              onNameChange={setCallerName}
              onModeChange={setCallMode}
              onRingtoneUpload={handleRingtoneUpload}
              onRemoveRingtone={removeRingtone}
              onStartCall={startCall}
              onSaveTemplate={saveTemplate}
              onCancelEdit={cancelEdit}
              onReCrop={handleReCrop}
            />
          </div>

          {/* Templates Grid - Right/Bottom */}
          <div className="lg:col-span-7 xl:col-span-8">
            <TemplatesGrid
              templates={sortedTemplates}
              onUseTemplate={useTemplate}
              onEditTemplate={editTemplate}
              onToggleFavorite={toggleFavorite}
              onDeleteTemplate={deleteTemplate}
            />
          </div>
        </div>
      </div>

      {/* Crop Modal */}
      {showCropModal && tempImage && (
        <ImageCropModal
          image={tempImage}
          initialMode={callMode}
          onComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && templateToDelete && (
        <DeleteConfirmModal
          templateName={templateToDelete.name}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}