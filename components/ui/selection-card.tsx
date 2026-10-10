import React from "react";
import { LucideIcon } from "lucide-react";

interface SelectionCardProps {
  title: string;
  label?: string;
  desc?: string;
  icon: LucideIcon;
  active: boolean;
  accentColor?: "amber" | "emerald" | "sky";
  onClick: () => void;
}

export function SelectionCard({
  title,
  label,
  desc,
  icon: Icon,
  active,
  accentColor = "amber",
  onClick,
}: SelectionCardProps) {
  const colorStyles = {
    amber: {
      active: "bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-amber-950/40 ring-1 ring-amber-500/50",
      iconActive: "text-amber-400",
      badge: "text-amber-300",
    },
    emerald: {
      active: "bg-emerald-500/15 border-emerald-500 text-white shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/50",
      iconActive: "text-emerald-400",
      badge: "text-emerald-300",
    },
    sky: {
      active: "bg-sky-500/15 border-sky-500 text-white shadow-lg shadow-sky-950/40 ring-1 ring-sky-500/50",
      iconActive: "text-sky-400",
      badge: "text-sky-300",
    },
  };

  const style = colorStyles[accentColor];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left p-4 rounded-xl border transition-all cursor-pointer select-none ${
        active
          ? style.active
          : "bg-neutral-900/40 border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:bg-neutral-800/40"
      }`}
    >
      <div className="flex items-center justify-between mb-1.5">
        {label ? (
          <span className={`font-bold text-lg ${style.badge}`}>{label}</span>
        ) : (
          <span className="font-semibold text-sm">{title}</span>
        )}
        <Icon className={`h-4 w-4 ${active ? style.iconActive : "text-neutral-500"}`} />
      </div>
      {label && <div className="text-xs font-medium text-neutral-200">{title}</div>}
      {desc && <div className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">{desc}</div>}
    </button>
  );
}
