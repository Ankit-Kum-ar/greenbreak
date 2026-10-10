"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { History, Clock, Trees, Award, RefreshCw, ArrowUpRight } from "lucide-react";
import { BreakSession, HistoryResponse } from "@/types/history";

interface HistorySheetProps {
  onRefreshTrigger?: number;
}

export function HistorySheet({ onRefreshTrigger }: HistorySheetProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<BreakSession[]>([]);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalBreaks, setTotalBreaks] = useState(0);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/history");
      const data: HistoryResponse = await res.json();
      if (data.success) {
        setHistory(data.history || []);
        setTotalMinutes(data.totalMinutes || 0);
        setTotalBreaks(data.totalBreaks || 0);
      }
    } catch (err) {
      console.error("Failed to fetch history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchHistory();
    }
  }, [open, onRefreshTrigger]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Positivus Header CTA Button: 1px black border, rounded-[14px], hover:bg-black hover:text-white */}
      <SheetTrigger className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-transparent hover:bg-[#191A23] border border-[#191A23] rounded-[14px] text-sm font-medium text-[#191A23] hover:text-white transition-all duration-200 cursor-pointer select-none">
        <History className="h-4 w-4 transition-transform group-hover:-rotate-45" />
        <span>Previous Activities</span>
        {totalMinutes > 0 && (
          <span className="ml-1 px-2.5 py-0.5 bg-[#B9FF66] text-[#191A23] group-hover:bg-[#B9FF66] text-xs font-bold rounded-full">
            {totalMinutes}m
          </span>
        )}
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-lg bg-[#FFFFFF] border-l border-[#191A23] p-0 flex flex-col h-full font-sans text-[#191A23]"
      >
        {/* Positivus Sheet Header */}
        <div className="p-8 border-b border-[#191A23]/10 bg-[#F3F3F3]">
          <SheetHeader className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-block bg-[#B9FF66] text-[#191A23] text-sm font-medium px-3 py-1 rounded-[7px] border border-[#191A23]/10">
                Activity Log
              </span>
              <button
                type="button"
                onClick={fetchHistory}
                disabled={loading}
                className="text-neutral-600 hover:text-[#191A23] p-1.5 rounded-full hover:bg-black/5 transition-colors"
                title="Refresh history"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>
            <SheetTitle className="text-2xl font-bold text-[#191A23] tracking-tight">
              Outdoor Dispatches
            </SheetTitle>
            <SheetDescription className="text-sm text-neutral-600">
              Sensory moments recorded in sunlight away from screens.
            </SheetDescription>
          </SheetHeader>

          {/* Quick Metrics Cards (Positivus rounded-[25px] cards with 1px black border) */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-[#FFFFFF] border border-[#191A23] rounded-[25px] p-4 shadow-positivus-sm">
              <div className="text-2xl font-bold text-[#191A23]">{totalMinutes}m</div>
              <div className="text-xs text-neutral-600 font-medium mt-0.5">Total Sunlight Time</div>
            </div>
            <div className="bg-[#B9FF66] border border-[#191A23] rounded-[25px] p-4 shadow-positivus-sm">
              <div className="text-2xl font-bold text-[#191A23]">{totalBreaks}</div>
              <div className="text-xs text-[#191A23] font-medium mt-0.5">Completed Quests</div>
            </div>
          </div>
        </div>

        {/* Scrollable History Cards */}
        <div className="flex-1 overflow-y-auto p-8 space-y-4">
          {loading && history.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <RefreshCw className="h-6 w-6 animate-spin mx-auto text-neutral-400" />
              <p className="text-sm text-neutral-500">Loading your outdoor sessions...</p>
            </div>
          ) : history.length === 0 ? (
            <div className="py-16 text-center space-y-3 bg-[#F3F3F3] border border-dashed border-[#191A23]/30 rounded-[35px] p-8">
              <Trees className="h-10 w-10 text-neutral-400 mx-auto" />
              <div className="space-y-1">
                <h4 className="font-bold text-base text-[#191A23]">No activities yet</h4>
                <p className="text-xs text-neutral-600 max-w-xs mx-auto">
                  Dispatch your first outdoor micro-break to unlock badges and log minutes!
                </p>
              </div>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item._id}
                className="bg-[#FFFFFF] border border-[#191A23] rounded-[30px] p-5 shadow-positivus-sm space-y-3 transition-all hover:shadow-positivus"
              >
                {/* Title & Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
                      {item.environment} • {item.durationMinutes}m
                    </span>
                    <h4 className="font-bold text-base text-[#191A23] leading-snug">
                      {item.mission?.title || "Outdoor Micro-Break"}
                    </h4>
                  </div>
                  {item.evaluation?.badgeEarned && (
                    <span className="shrink-0 bg-[#B9FF66] text-[#191A23] text-xs font-semibold px-3 py-1 rounded-full border border-[#191A23]/10 flex items-center gap-1">
                      <Award className="h-3.5 w-3.5" />
                      {item.evaluation.badgeEarned}
                    </span>
                  )}
                </div>

                {/* Observation quote */}
                {item.observation && (
                  <p className="text-xs text-neutral-700 bg-[#F3F3F3] border border-[#191A23]/10 p-3.5 rounded-[16px] italic leading-relaxed">
                    "{item.observation}"
                  </p>
                )}

                {/* Footer Time & Score */}
                <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {item.completedAt
                      ? new Date(item.completedAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })
                      : "Recently"}
                  </span>
                  {item.evaluation?.sensoryScore && (
                    <span className="font-bold text-[#191A23] bg-[#B9FF66]/30 px-2 py-0.5 rounded-md border border-[#191A23]/10">
                      Score: {item.evaluation.sensoryScore}/10
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
