import React from "react";
import { Award, Sparkles, RotateCcw } from "lucide-react";
import { EvaluationData } from "@/types/break";

interface SummaryStageProps {
  evaluation: EvaluationData;
  totalMinutes: number;
  totalBreaks: number;
  onReset: () => void;
}

export function SummaryStage({
  evaluation,
  totalMinutes,
  totalBreaks,
  onReset,
}: SummaryStageProps) {
  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-12">
      <div className="bg-[#FFFFFF] border border-[#191A23] rounded-[45px] p-8 sm:p-12 shadow-positivus space-y-8 text-center">
        {/* Badge Award */}
        <div className="space-y-3">
          <div className="inline-flex h-20 w-20 rounded-3xl bg-[#B9FF66] border-2 border-[#191A23] items-center justify-center text-[#191A23] shadow-positivus-sm animate-bounce">
            <Award className="h-10 w-10" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 block">
              Nature Badge Unlocked
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#191A23] tracking-tight mt-1">
              {evaluation.badgeEarned}
            </h2>
          </div>
        </div>

        {/* AI Insight Box */}
        <div className="p-6 rounded-[28px] bg-[#F3F3F3] border border-[#191A23] text-left space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-600">
            <span className="font-bold text-[#191A23] flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-[#191A23]" />
              Gemma Mindfulness Score
            </span>
            <span className="font-black bg-[#B9FF66] text-[#191A23] px-2.5 py-1 rounded-[8px] border border-[#191A23]/10 text-xs">
              {evaluation.sensoryScore} / 10
            </span>
          </div>
          <p className="text-sm sm:text-base text-neutral-800 italic leading-relaxed">
            "{evaluation.insight}"
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 rounded-[24px] bg-[#FFFFFF] border border-[#191A23] shadow-positivus-sm">
            <div className="text-3xl font-black text-[#191A23]">{totalMinutes}m</div>
            <div className="text-xs text-neutral-600 font-medium mt-0.5">Total Sunlight Time</div>
          </div>
          <div className="p-5 rounded-[24px] bg-[#B9FF66] border border-[#191A23] shadow-positivus-sm">
            <div className="text-3xl font-black text-[#191A23]">{totalBreaks}</div>
            <div className="text-xs text-[#191A23] font-medium mt-0.5">Completed Quests</div>
          </div>
        </div>

        {/* Return to Setup */}
        <button
          type="button"
          onClick={onReset}
          className="w-full py-4 sm:py-5 bg-[#191A23] hover:bg-[#B9FF66] text-white hover:text-[#191A23] font-black text-base rounded-[18px] border border-[#191A23] shadow-positivus transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Ready for Next Work Sprint</span>
        </button>
      </div>
    </div>
  );
}
