import React from "react";
import { LucideIcon, Check } from "lucide-react";

interface PositivusOptionCardProps {
  label?: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  selected: boolean;
  onClick: () => void;
  colorScheme?: "white" | "grey" | "green";
}

export function PositivusOptionCard({
  label,
  title,
  desc,
  icon: Icon,
  selected,
  onClick,
  colorScheme = "white",
}: PositivusOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative text-left p-5 sm:p-6 rounded-[28px] sm:rounded-[32px] border transition-all duration-200 cursor-pointer select-none flex flex-col justify-between space-y-3 ${
        selected
          ? "bg-[#B9FF66] border-[#191A23] shadow-positivus translate-x-[1px] translate-y-[1px]"
          : "bg-[#FFFFFF] hover:bg-[#F3F3F3] border-[#191A23] shadow-positivus-sm hover:shadow-positivus"
      }`}
    >
      {/* Top Row: Icon + Selection Indicator */}
      <div className="flex items-center justify-between w-full">
        <div
          className={`h-11 w-11 rounded-2xl flex items-center justify-center border border-[#191A23] transition-colors ${
            selected
              ? "bg-[#191A23] text-[#B9FF66]"
              : "bg-[#F3F3F3] text-[#191A23] group-hover:bg-[#B9FF66]"
          }`}
        >
          <Icon className="h-5 w-5 stroke-[2.2]" />
        </div>

        {label ? (
          <span
            className={`text-sm font-black px-3 py-1 rounded-full border border-[#191A23] ${
              selected ? "bg-[#191A23] text-white" : "bg-[#F3F3F3] text-[#191A23]"
            }`}
          >
            {label}
          </span>
        ) : (
          <div
            className={`w-6 h-6 rounded-full border border-[#191A23] flex items-center justify-center ${
              selected ? "bg-[#191A23] text-[#B9FF66]" : "bg-transparent"
            }`}
          >
            {selected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
          </div>
        )}
      </div>

      {/* Title & Description */}
      <div className="space-y-1">
        <h4 className="text-base sm:text-lg font-bold text-[#191A23] leading-snug">
          {title}
        </h4>
        <p
          className={`text-xs leading-relaxed ${
            selected ? "text-[#191A23]/80 font-medium" : "text-neutral-600"
          }`}
        >
          {desc}
        </p>
      </div>
    </button>
  );
}
