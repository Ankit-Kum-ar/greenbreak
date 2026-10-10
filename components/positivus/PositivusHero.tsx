import React from "react";
import { Sparkles, Sun, Trees, ArrowRight, ShieldCheck } from "lucide-react";

interface PositivusHeroProps {
  onScrollToDispatcher?: () => void;
}

export function PositivusHero({ onScrollToDispatcher }: PositivusHeroProps) {
  return (
    <section className="w-full pt-4 pb-12 sm:pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Heading & Value Proposition */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#191A23] tracking-tight leading-[1.1]">
              Navigating the digital landscape for screen-bound developers.
            </h1>

            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-xl">
              Software engineers spend 10+ hours locked to monitors. GreenBreak uses{" "}
              <strong className="text-[#191A23] font-bold">Touch Grass AI (Gemma)</strong> to
              dispatch 30-second sensory outdoor quests, lock your screen into OLED Pocket
              Mode, and restore your cognitive focus.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              type="button"
              onClick={onScrollToDispatcher}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#191A23] hover:bg-[#B9FF66] text-white hover:text-[#191A23] border border-[#191A23] rounded-[14px] text-base font-semibold transition-all duration-200 cursor-pointer shadow-positivus hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-positivus-sm active:translate-x-[3px] active:translate-y-[3px]"
            >
              <span>Dispatch Outdoor Break</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 px-4 py-3 bg-[#F3F3F3] border border-[#191A23]/10 rounded-[14px] text-xs font-semibold text-neutral-700">
              <ShieldCheck className="h-4 w-4 text-[#191A23]" />
              <span>Zero-Screen Protocol Guaranteed</span>
            </div>
          </div>
        </div>

        {/* Right Column: Positivus Hero Graphic / Illustration */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md bg-[#F3F3F3] border border-[#191A23] rounded-[45px] p-8 shadow-positivus overflow-hidden">
            {/* Ambient Graphic Elements */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#191A23]/10 pb-4">
                <span className="bg-[#B9FF66] text-[#191A23] text-xs font-bold px-2.5 py-1 rounded-[6px] border border-[#191A23]/10">
                  Touch Grass AI
                </span>
                <span className="text-xs font-bold text-[#191A23]">Zero-Screen UX</span>
              </div>

              {/* Vector Concept Illustration */}
              <div className="flex flex-col items-center justify-center py-6 space-y-4">
                <div className="relative">
                  {/* Glowing Sun Ring */}
                  <div className="w-24 h-24 rounded-full bg-[#B9FF66] border-2 border-[#191A23] flex items-center justify-center shadow-positivus-sm">
                    <Sun className="h-12 w-12 text-[#191A23] animate-spin-slow" />
                  </div>
                  {/* Badge floating */}
                  <div className="absolute -bottom-2 -right-2 bg-[#191A23] text-white text-[10px] font-bold px-2 py-1 rounded-full border border-white/20">
                    20-20-20
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <h4 className="font-black text-lg text-[#191A23]">Circadian Reset</h4>
                  <p className="text-xs text-neutral-600 max-w-xs">
                    Look 20+ meters into natural light to relax eye muscles & restore alertness.
                  </p>
                </div>
              </div>

              {/* Bottom Telemetry Pill */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-[#FFFFFF] border border-[#191A23] rounded-2xl p-3 text-center">
                  <div className="text-lg font-black text-[#191A23]">30 Sec</div>
                  <div className="text-[10px] text-neutral-500 font-medium">On Screen</div>
                </div>
                <div className="bg-[#B9FF66] border border-[#191A23] rounded-2xl p-3 text-center">
                  <div className="text-lg font-black text-[#191A23]">100%</div>
                  <div className="text-[10px] text-[#191A23] font-medium">Real World</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
