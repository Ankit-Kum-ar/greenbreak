"use client";

import React from "react";
import { PositivusOptionCard } from "@/components/positivus/PositivusOptionCard";
import { DURATIONS, ENVIRONMENTS, FOCUS_AREAS } from "@/constants/break-options";
import { User, Zap, ArrowRight, ShieldCheck } from "lucide-react";

interface SetupStageProps {
  duration: number;
  environment: string;
  focusArea: string;
  name: string;
  loading: boolean;
  onSelectDuration: (val: number) => void;
  onSelectEnvironment: (val: string) => void;
  onSelectFocusArea: (val: string) => void;
  onChangeName: (val: string) => void;
  onDispatch: () => void;
}

export function SetupStage({
  duration,
  environment,
  focusArea,
  name,
  loading,
  onSelectDuration,
  onSelectEnvironment,
  onSelectFocusArea,
  onChangeName,
  onDispatch,
}: SetupStageProps) {
  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Top Showcase Banner */}
      <div className="bg-[#F3F3F3] border border-[#191A23] rounded-[36px] sm:rounded-[45px] p-6 sm:p-10 shadow-positivus relative overflow-hidden">
        <div className="max-w-2xl space-y-3 sm:space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="bg-[#B9FF66] text-[#191A23] text-xs sm:text-sm font-bold px-3 py-1 rounded-[7px] border border-[#191A23]/10 uppercase tracking-wide">
              Touch Grass Dispatcher
            </span>
            <span className="text-xs font-semibold text-neutral-500">
              Zero-Screen Ambient Missions
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#191A23] tracking-tight leading-[1.1]">
            Step away from your screen in under 30 seconds.
          </h1>

          <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
            Enter your name, pick your break duration, setting, and goal. Open-source{" "}
            <strong className="text-[#191A23]">Gemma AI</strong> will synthesize a mindful
            outdoor quest and lock your screen into OLED mode.
          </p>
        </div>
      </div>

      {/* Section 1: Simple Name Input */}
      <div className="bg-[#FFFFFF] border border-[#191A23] rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 shadow-positivus space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="bg-[#B9FF66] text-[#191A23] text-xs font-bold px-2.5 py-1 rounded-[6px] border border-[#191A23]/10">
            01
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#191A23]">
            What is your name?
          </h3>
        </div>

        <div className="max-w-md space-y-1.5">
          <label className="text-xs font-bold text-[#191A23] uppercase tracking-wider flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-neutral-600" />
            Enter your name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => onChangeName(e.target.value)}
            placeholder="e.g. Sarah Connor"
            autoComplete="off"
            className="w-full bg-[#F3F3F3] border border-[#191A23] rounded-[16px] px-4 py-3.5 text-base sm:text-lg text-[#191A23] font-bold placeholder:text-neutral-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#B9FF66] shadow-inner"
          />
          <p className="text-[11px] text-neutral-500 pl-1">
            Your break sessions, sensory reflections, and nature badges will be saved under your name.
          </p>
        </div>
      </div>

      {/* Section 2: Duration Selector */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="bg-[#B9FF66] text-[#191A23] text-xs font-bold px-2.5 py-1 rounded-[6px] border border-[#191A23]/10">
            02
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#191A23]">
            Choose Break Interval
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {DURATIONS.map((d) => (
            <PositivusOptionCard
              key={d.value}
              label={d.label}
              title={d.title}
              desc={d.desc}
              icon={d.icon}
              selected={duration === d.value}
              onClick={() => onSelectDuration(d.value)}
            />
          ))}
        </div>
      </div>

      {/* Section 3: Real-World Environment */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="bg-[#B9FF66] text-[#191A23] text-xs font-bold px-2.5 py-1 rounded-[6px] border border-[#191A23]/10">
            03
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#191A23]">
            Select Real-World Setting
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {ENVIRONMENTS.map((env) => (
            <PositivusOptionCard
              key={env.id}
              title={env.label}
              desc={env.desc}
              icon={env.icon}
              selected={environment === env.id}
              onClick={() => onSelectEnvironment(env.id)}
            />
          ))}
        </div>
      </div>

      {/* Section 4: Recovery Target */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="bg-[#B9FF66] text-[#191A23] text-xs font-bold px-2.5 py-1 rounded-[6px] border border-[#191A23]/10">
            04
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#191A23]">
            Physical Recovery Goal
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {FOCUS_AREAS.map((f) => (
            <PositivusOptionCard
              key={f.id}
              title={f.label}
              desc={f.desc}
              icon={f.icon}
              selected={focusArea === f.id}
              onClick={() => onSelectFocusArea(f.id)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Dispatch Action Bar */}
      <div className="bg-[#191A23] text-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 shadow-positivus flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#B9FF66] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4" />
            <span>Ready for Zero-Screen Dispatch</span>
          </div>
          <p className="text-xs text-neutral-400">
            {name.trim() ? (
              <>
                Dispatching break session for <strong className="text-white">{name.trim()}</strong>
              </>
            ) : (
              "Please enter your name above to begin."
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={onDispatch}
          disabled={loading || !name.trim()}
          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#B9FF66] hover:bg-[#a6f04d] text-[#191A23] font-black text-base rounded-[16px] border border-[#191A23] transition-all duration-200 cursor-pointer shadow-[0_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          {loading ? (
            <>
              <Zap className="h-5 w-5 animate-bounce" />
              <span>Synthesizing Mission (Gemma AI)...</span>
            </>
          ) : (
            <>
              <span>Dispatch Outdoor Break</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
