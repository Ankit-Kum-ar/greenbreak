import React from "react";
import { CheckCircle2 } from "lucide-react";

interface PocketStageProps {
  environment: string;
  formattedTime: string;
  isCompleted: boolean;
  onReturnToDesk: () => void;
}

export function PocketStage({
  environment,
  formattedTime,
  isCompleted,
  onReturnToDesk,
}: PocketStageProps) {
  return (
    <div className="min-h-screen bg-[#0B0C0E] text-neutral-100 flex flex-col items-center justify-between p-6 sm:p-12 select-none">
      {/* Minimalist Top Bar */}
      <div className="w-full max-w-lg flex items-center justify-between text-neutral-500 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#B9FF66] animate-ping" />
          <span className="text-[#B9FF66] font-bold">OLED POCKET MODE</span>
        </div>
        <span>{environment}</span>
      </div>

      {/* Big Pulsing Countdown Timer */}
      <div className="flex flex-col items-center text-center space-y-6 my-auto">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#B9FF66]/10 blur-3xl animate-pulse" />
          <div className="font-mono text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-[#B9FF66] drop-shadow-[0_0_40px_rgba(185,255,102,0.3)]">
            {formattedTime}
          </div>
        </div>

        <div className="space-y-2 max-w-md">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {isCompleted ? "Break Completed! 🌿" : "Screen Locked. Look into Sunlight."}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            {isCompleted
              ? "Step back inside to log your sensory observation and unlock your nature badge."
              : "Put this device in your pocket or walk outside. Focus your gaze 20+ meters into natural daylight."}
          </p>
        </div>
      </div>

      {/* Back at Desk Button */}
      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={onReturnToDesk}
          className={`w-full py-4 sm:py-5 rounded-[20px] font-bold text-sm sm:text-base transition-all cursor-pointer flex items-center justify-center gap-2 ${
            isCompleted
              ? "bg-[#B9FF66] hover:bg-[#a6f04d] text-[#191A23] shadow-xl shadow-[#B9FF66]/20 font-black"
              : "bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800"
          }`}
        >
          <CheckCircle2 className="h-5 w-5 text-[#B9FF66]" />
          <span>I'm Back at My Desk (Debrief)</span>
        </button>
      </div>
    </div>
  );
}
