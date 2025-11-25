import React, { useEffect, useRef, useState } from "react";
import {
  Phone,
  X,
  Check,
  Volume2,
  Video,
  MicOff,
  UserPlus,
  Grid3x3,
} from "lucide-react";
import { IoIosAlarm, IoIosKeypad } from "react-icons/io";
import { IoVideocam, IoVolumeHigh } from "react-icons/io5";
import { TbMessageCircleFilled } from "react-icons/tb";
import { BsMicMuteFill, BsPersonFillAdd } from "react-icons/bs";

export default function CallScreen({ activeCall, onDecline, onAccept }) {
  const audioRef = useRef(null);
  const timeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const [callAnswered, setCallAnswered] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    // Play ringtone if available and call not answered
    if (activeCall.ringtone && !callAnswered) {
      const playRingtone = () => {
        if (audioRef.current) {
          audioRef.current.play().catch((err) => {
            console.log("Audio play failed:", err);
          });
        }
      };

      // Play immediately
      playRingtone();

      // Set up interval to play with 3 second gap
      const scheduleNext = () => {
        if (audioRef.current) {
          audioRef.current.onended = () => {
            timeoutRef.current = setTimeout(() => {
              playRingtone();
            }, 3000); // 3 second gap
          };
        }
      };

      scheduleNext();

      // Cleanup
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [activeCall.ringtone, callAnswered]);

  // Timer effect for answered call
  useEffect(() => {
    if (callAnswered) {
      timerIntervalRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);

      return () => {
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
        }
      };
    }
  }, [callAnswered]);

  const handleAccept = () => {
    // Stop ringtone
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setCallAnswered(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const isBackgroundMode = activeCall.mode === "background";

  if (isBackgroundMode) {
    // iOS-style background mode
    return (
      <div className="fixed inset-0 animate-fade-in">
        {/* Hidden audio element for ringtone */}
        {activeCall.ringtone && (
          <audio ref={audioRef} src={activeCall.ringtone} preload="auto" />
        )}

        {/* Background Image - No Blur */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${activeCall.image})` }}
        />

        {/* iOS-style Call Interface */}
        <div className="relative h-full flex flex-col justify-between p-6 text-white">
          {/* Top Section - Caller Name */}
          <div className="w-full text-center pt-15">
            <div className="caller-image-wrapper w-full text-center">
              <h1 className="text-5xl font-light mb-3 drop-shadow-lg">
                {activeCall.name}
              </h1>
              <p className="text-xl opacity-80 drop-shadow-md">
                {callAnswered ? formatTime(callDuration) : "mobile"}
              </p>
            </div>
          </div>

          {/* Bottom Section - Actions */}
          {!callAnswered ? (
            <div className="w-full space-y-16 pb-4">
              {/* Quick Actions - No Button Styling */}
              <div className="flex justify-between gap-20 items-center px-8 m-0">
                <button className="flex flex-col items-center gap-3 w-20 h-20">
                  <IoIosAlarm
                    size={32}
                    className="drop-shadow-lg"
                    fill="white"
                    stroke="white"
                    strokeWidth={2}
                  />
                  <span className="text-sm drop-shadow">Remind Me</span>
                </button>
                <button className="flex flex-col items-center gap-3 w-20 h-20">
                  <TbMessageCircleFilled
                    size={32}
                    className="drop-shadow-lg"
                    fill="white"
                  />
                  <span className="text-sm drop-shadow">Message</span>
                </button>
              </div>

              {/* Main Call Actions */}
              <div className="flex justify-between gap-20 items-center px-8">
                <button
                  onClick={onDecline}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform">
                    <Phone
                      size={32}
                      className="rotate-[135deg]"
                      fill="white"
                      strokeWidth={0.5}
                    />
                  </div>
                  <span className="text-sm drop-shadow">Decline</span>
                </button>

                <button
                  onClick={handleAccept}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform">
                    <Phone size={32} fill="white" strokeWidth={0.5} />
                  </div>
                  <span className="text-sm drop-shadow">Accept</span>
                </button>
              </div>
            </div>
          ) : (
            /* Call Control Buttons - 2x3 Grid */
            <div className="w-full pb-4 px-4">
              <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
                {/* Row 1 */}
                <button className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center active:scale-95 transition-transform backgrop-blur-[5px]">
                    <IoVolumeHigh size={32} className="text-white" />
                  </div>
                  <span className="text-xs drop-shadow">Audio</span>
                </button>

                <button className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center active:scale-95 transition-transform backgrop-blur-[5px]">
                    <IoVideocam size={32} className="text-white" />
                  </div>
                  <span className="text-xs drop-shadow">FaceTime</span>
                </button>

                <button className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center active:scale-95 transition-transform backgrop-blur-[5px]">
                    <BsMicMuteFill size={32} className="text-white" />
                  </div>
                  <span className="text-xs drop-shadow">Mute</span>
                </button>

                {/* Row 2 */}
                <button className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center active:scale-95 transition-transform backgrop-blur-[5px]">
                    <BsPersonFillAdd size={32} className="text-white" />
                  </div>
                  <span className="text-xs drop-shadow">Add</span>
                </button>

                <button
                  onClick={onDecline}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform">
                    <Phone
                      size={32}
                      className="rotate-[135deg]"
                      fill="white"
                      strokeWidth={0.5}
                    />
                  </div>
                  <span className="text-xs drop-shadow">End</span>
                </button>

                <button className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center active:scale-95 transition-transform">
                    <IoIosKeypad size={32} className="text-white" />
                  </div>
                  <span className="text-xs drop-shadow">Keypad</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Profile mode (original style)
  return (
    <div className="fixed inset-0 bg-linear-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-between p-10 animate-fade-in">
      {/* Hidden audio element for ringtone */}
      {activeCall.ringtone && (
        <audio ref={audioRef} src={activeCall.ringtone} preload="auto" />
      )}

      {/* Caller Info */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <img
          src={activeCall.image}
          alt={activeCall.name}
          className="w-48 h-48 rounded-full object-cover border-4 border-white/30 shadow-2xl animate-pulse-slow mb-8"
        />
        <h1 className="text-5xl font-light text-white mb-2">
          {activeCall.name}
        </h1>
        <p className="text-xl text-gray-400">
          {callAnswered ? formatTime(callDuration) : "Incoming Call..."}
        </p>
      </div>

      {/* Call Actions */}
      {!callAnswered ? (
        <div className="flex gap-12 mb-12">
          <button
            onClick={onDecline}
            className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform"
          >
            <X size={32} />
          </button>
          <button
            onClick={handleAccept}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform"
          >
            <Check size={32} />
          </button>
        </div>
      ) : (
        /* Call Control Buttons - 2x3 Grid */
        <div className="mb-12">
          <div className="grid grid-cols-3 gap-8">
            {/* Row 1 */}
            <button className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-gray-700/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Volume2 size={28} className="text-white" />
              </div>
              <span className="text-xs text-gray-300">Audio</span>
            </button>

            <button className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-gray-700/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Video size={28} className="text-white" />
              </div>
              <span className="text-xs text-gray-300">FaceTime</span>
            </button>

            <button className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-gray-700/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <MicOff size={28} className="text-white" />
              </div>
              <span className="text-xs text-gray-300">Mute</span>
            </button>

            {/* Row 2 */}
            <button className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-gray-700/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <UserPlus size={28} className="text-white" />
              </div>
              <span className="text-xs text-gray-300">Add</span>
            </button>

            <button
              onClick={onDecline}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                <Phone
                  size={28}
                  className="rotate-135deg"
                  fill="white"
                  strokeWidth={0.5}
                />
              </div>
              <span className="text-xs text-gray-300">End</span>
            </button>

            <button className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-gray-700/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Grid3x3 size={28} className="text-white" />
              </div>
              <span className="text-xs text-gray-300">Keypad</span>
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
