import Link from "next/link";
import { History, ArrowLeft } from "lucide-react";

interface PositivusHeaderProps {
  currentName?: string;
  isHistoryPage?: boolean;
}

export function PositivusHeader({ currentName, isHistoryPage }: PositivusHeaderProps) {
  const historyHref = currentName
    ? `/history?name=${encodeURIComponent(currentName)}`
    : "/history";

  return (
    <header className="w-full bg-[#FFFFFF] border-b border-[#191A23]/10 sticky top-0 z-40 backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-3.5 sm:py-5 flex items-center justify-between gap-3">
        {/* Clickable Brand Logo and Title */}
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 group select-none shrink-0 cursor-pointer"
          title="GreenBreak Home"
        >
          {/* Positivus 4-pointed Star Glyph */}
          <div className="relative flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 shrink-0 transition-transform duration-300 group-hover:rotate-45">
            <svg
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 sm:w-9 sm:h-9"
            >
              <path
                d="M18 0L21.5 14.5L36 18L21.5 21.5L18 36L14.5 21.5L0 18L14.5 14.5L18 0Z"
                fill="#191A23"
              />
              <circle cx="18" cy="18" r="4" fill="#B9FF66" />
            </svg>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-lg sm:text-2xl md:text-[28px] font-bold tracking-tight text-[#191A23]">
              GreenBreak
            </span>
            <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-[7px] bg-[#B9FF66] text-[#191A23] text-[10px] font-semibold tracking-tight border border-[#191A23]/10 shadow-[0_2px_0_0_#191A23]">
              Touch Grass
            </span>
          </div>
        </Link>

        {/* Right Navigation */}
        <div className="flex items-center gap-3 shrink-0">
          {isHistoryPage ? (
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 bg-[#F3F3F3] hover:bg-[#B9FF66] border border-[#191A23] rounded-[12px] sm:rounded-[14px] text-xs sm:text-sm font-semibold text-[#191A23] transition-all duration-200 cursor-pointer shadow-positivus-sm"
            >
              <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Back to Dispatcher</span>
            </Link>
          ) : (
            <Link
              href={historyHref}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 bg-transparent hover:bg-[#191A23] border border-[#191A23] rounded-[12px] sm:rounded-[14px] text-xs sm:text-sm font-medium text-[#191A23] hover:text-white transition-all duration-200 cursor-pointer whitespace-nowrap shadow-positivus-sm sm:shadow-none hover:shadow-positivus-sm"
            >
              <History className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span>Previous Activities</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
