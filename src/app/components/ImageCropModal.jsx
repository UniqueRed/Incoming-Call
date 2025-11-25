"use client"

import React, { useState, useCallback } from 'react';
import { X, Check, RotateCw, ZoomIn, User, Image as ImageIcon } from 'lucide-react';
import Cropper from 'react-easy-crop';

export default function ImageCropModal({ image, initialMode, onComplete, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [callMode, setCallMode] = useState(initialMode);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      onComplete(croppedImage, callMode);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, image, callMode, onComplete]);

  // Use screen aspect ratio for background mode to match exactly
  const aspectRatio = callMode === 'background' ? window.innerWidth / window.innerHeight : 4 / 3;

  return (
    <div className="fixed inset-0 bg-white dark:bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border-b-2 border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-white">Crop Image</h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
            Switch modes to preview
          </p>
        </div>
        <button
          onClick={onCancel}
          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
        >
          <X size={18} />
        </button>
      </div>

      {/* Crop Area */}
      <div className="flex-1 relative bg-zinc-50 dark:bg-zinc-950">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          showGrid={callMode !== 'background'}
          style={{
            containerStyle: {
              backgroundColor: 'transparent',
            },
            cropAreaStyle: callMode === 'background' ? {
              border: 'none',
              boxShadow: 'none',
            } : undefined,
          }}
        />

        {/* iOS Background Mode Preview Overlay */}
        {callMode === 'background' && (
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 text-white">
            {/* Top Section - Caller Name */}
            <div className="w-full text-center pt-20">
              <h1 className="text-4xl font-light mb-3 drop-shadow-lg">Caller Name</h1>
              <p className="text-lg opacity-80 drop-shadow-md">Incoming</p>
            </div>

            {/* Bottom Section - Actions */}
            <div className="w-full space-y-16 pb-4">
              {/* Quick Actions */}
              <div className="flex justify-between gap-20 items-center px-8 m-0">
                <button className="flex flex-col items-center gap-3 w-24 h-24 opacity-70">
                  <div className="w-8 h-8 rounded-full bg-white/30"></div>
                  <span className="text-sm drop-shadow">Remind Me</span>
                </button>
                <button className="flex flex-col items-center gap-3 w-24 h-24 opacity-70">
                  <div className="w-8 h-8 rounded-full bg-white/30"></div>
                  <span className="text-sm drop-shadow">Message</span>
                </button>
              </div>

              {/* Main Call Actions */}
              <div className="flex justify-between gap-20 items-center px-8">
                <button className="flex flex-col items-center gap-3 opacity-70">
                  <div className="w-24 h-24 bg-red-500 rounded-full"></div>
                  <span className="text-sm drop-shadow">Decline</span>
                </button>

                <button className="flex flex-col items-center gap-3 opacity-70">
                  <div className="w-24 h-24 bg-green-500 rounded-full"></div>
                  <span className="text-sm drop-shadow">Accept</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-zinc-900 border-t-2 border-zinc-200 dark:border-zinc-800 p-4 space-y-4">
        {/* Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
            Preview Mode
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setCallMode('profile')}
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
              onClick={() => setCallMode('background')}
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

        {/* Zoom Control */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-zinc-900 dark:text-white flex items-center gap-2">
              <ZoomIn size={16} />
              Zoom
            </label>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">{Math.round(zoom * 100)}%</span>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-white"
          />
        </div>

        {/* Rotation Control */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-zinc-900 dark:text-white flex items-center gap-2">
              <RotateCw size={16} />
              Rotation
            </label>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">{rotation}°</span>
          </div>
          <input
            type="range"
            min={0}
            max={360}
            step={1}
            value={rotation}
            onChange={(e) => setRotation(parseInt(e.target.value))}
            className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-white"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white px-4 py-2.5 rounded-md font-medium transition-colors border-2 border-zinc-200 dark:border-zinc-800"
          >
            Cancel
          </button>
          <button
            onClick={createCroppedImage}
            className="flex-1 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2.5 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Check size={16} />
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper function to create cropped image
async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-safeArea / 2, -safeArea / 2);

  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );

  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        resolve(reader.result);
      };
    }, 'image/jpeg', 0.95);
  });
}

function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
}