import React from "react";
import { Lock } from "lucide-react";
import { MissionData } from "@/types/break";

interface MissionStageProps {
  mission: MissionData;
  duration: number;
  environment: string;
  onLockScreen: () => void;
}

export function MissionStage({
  mission,
  duration,
  environment,
  onLockScreen,
}: MissionStageProps) {
  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-12">
      <div className="bg-[#FFFFFF] border border-[#191A23] rounded-[45px] p-8 sm:p-12 shadow-positivus space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#191A23]/10 pb-6">
          <span className="bg-[#B9FF66] text-[#191A23] text-xs font-bold px-3 py-1 rounded-[7px] border border-[#191A23]/10 uppercase tracking-wide">
            Active Outdoor Quest
          </span>
          <span className="text-xs font-bold text-neutral-600 bg-[#F3F3F3] border border-[#191A23]/10 px-3 py-1.5 rounded-full">
            {duration} Minutes • {environment}
          </span>
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-[#191A23] tracking-tight">
            {mission.title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Commit these 3 sensory observations to memory. No screens, no maps, no headphones.
          </p>
        </div>

        {/* 3 Steps */}
        <div className="space-y-4">
          {mission.steps.map((step, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-5 rounded-[24px] bg-[#F3F3F3] border border-[#191A23]/10"
            >
              <div className="h-8 w-8 rounded-full bg-[#B9FF66] text-[#191A23] border border-[#191A23] flex items-center justify-center font-black text-sm shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <div className="text-sm sm:text-base text-[#191A23] font-semibold leading-relaxed">
                {step}
              </div>
            </div>
          ))}
        </div>

        {/* Lock Screen CTA */}
        <div className="pt-4">
          <button
            type="button"
            onClick={onLockScreen}
            className="w-full py-5 bg-[#191A23] hover:bg-[#B9FF66] text-white hover:text-[#191A23] font-black text-base sm:text-lg rounded-[18px] border border-[#191A23] shadow-positivus transition-all cursor-pointer flex items-center justify-center gap-3 hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            <Lock className="h-5 w-5" />
            <span>Lock Screen & Step Outside ({duration}m)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
