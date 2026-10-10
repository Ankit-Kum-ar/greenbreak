import React from "react";
import { Zap, ChevronRight } from "lucide-react";

interface DebriefStageProps {
  observation: string;
  loading: boolean;
  onChangeObservation: (val: string) => void;
  onSubmit: () => void;
}

export function DebriefStage({
  observation,
  loading,
  onChangeObservation,
  onSubmit,
}: DebriefStageProps) {
  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-12">
      <div className="bg-[#FFFFFF] border border-[#191A23] rounded-[45px] p-8 sm:p-12 shadow-positivus space-y-6">
        <div className="space-y-2">
          <span className="bg-[#B9FF66] text-[#191A23] text-xs font-bold px-3 py-1 rounded-[7px] border border-[#191A23]/10 uppercase tracking-wide">
            Post-Break Debrief
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#191A23] tracking-tight">
            What did you observe outside?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600">
            Enter a 1-sentence real-world observation. Open-source Gemma will evaluate your
            mindfulness and grant your nature badge.
          </p>
        </div>

        <div className="space-y-3">
          <textarea
            rows={4}
            value={observation}
            onChange={(e) => onChangeObservation(e.target.value)}
            placeholder="e.g., Noticed cool breeze from the east and watched sparrows nesting under the roof beam."
            className="w-full p-4 bg-[#F3F3F3] border border-[#191A23] rounded-[24px] text-[#191A23] placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#B9FF66] text-sm sm:text-base leading-relaxed"
          />
          <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
            <span>Aim for physical sensations (breeze, foliage, distant horizon).</span>
            <span>{observation.length} chars</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onSubmit}
          disabled={loading || !observation.trim()}
          className="w-full py-4 sm:py-5 bg-[#191A23] hover:bg-[#B9FF66] text-white hover:text-[#191A23] font-black text-sm sm:text-base rounded-[18px] border border-[#191A23] shadow-positivus transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Zap className="h-5 w-5 animate-spin" />
              <span>Evaluating Mindfulness (Gemma AI)...</span>
            </>
          ) : (
            <>
              <span>Log Reflection & Claim Badge</span>
              <ChevronRight className="h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
