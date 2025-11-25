import React from 'react';
import { Phone, X, Check } from 'lucide-react';
import { IoIosAlarm } from "react-icons/io";
import { TbMessageCircleFilled } from "react-icons/tb";

export default function CallScreen({ activeCall, onDecline, onAccept }) {
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
          <div className="w-full text-center pt-15">
            <h1 className="text-4xl font-light mb-3 drop-shadow-lg">{activeCall.name}</h1>
            <p className="text-lg opacity-80 drop-shadow-md">Incoming</p>
          </div>

          {/* Bottom Section - Actions */}
          <div className="w-full space-y-16 pb-4">
            {/* Quick Actions - No Button Styling */}
            <div className="flex justify-between gap-20 items-center px-8 m-0">
              <button className="flex flex-col items-center gap-3 w-24 h-24">
                <IoIosAlarm size={32} className="drop-shadow-lg" fill="white" stroke="white" strokeWidth={2}/>
                <span className="text-sm drop-shadow">Remind Me</span>
              </button>
              <button className="flex flex-col items-center gap-3 w-24 h-24">
                <TbMessageCircleFilled size={32} className="drop-shadow-lg" fill="white"/>
                <span className="text-sm drop-shadow">Message</span>
              </button>
            </div>

            {/* Main Call Actions */}
            <div className="flex justify-between gap-20 items-center px-8">
              <button
                onClick={onDecline}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform">
                  <Phone size={40} className="rotate-135deg" fill="white" strokeWidth={0.5}/>
                </div>
                <span className="text-sm drop-shadow">Decline</span>
              </button>

              <button
                onClick={onAccept}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform">
                  <Phone size={40} fill="white" strokeWidth={0.5}/>
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
    <div className="fixed inset-0 bg-linear-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-between p-10 animate-fade-in">
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
          onClick={onDecline}
          className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform"
        >
          <X size={32} />
        </button>
        <button
          onClick={onAccept}
          className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform"
        >
          <Check size={32} />
        </button>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}