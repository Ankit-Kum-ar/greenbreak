import React from "react";

interface PositivusSectionHeadingProps {
  badge: string;
  description: string;
}

export function PositivusSectionHeading({
  badge,
  description,
}: PositivusSectionHeadingProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 mb-8 sm:mb-12">
      {/* Green Highlighted Badge Header */}
      <span className="self-start inline-block bg-[#B9FF66] text-[#191A23] text-xl sm:text-2xl md:text-3xl font-bold px-3 py-1 rounded-[7px] border border-[#191A23]/10 tracking-tight shrink-0">
        {badge}
      </span>

      {/* Subheading text */}
      <p className="text-sm sm:text-base text-neutral-600 max-w-xl leading-relaxed">
        {description}
      </p>
    </div>
  );
}
