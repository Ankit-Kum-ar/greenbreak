"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PositivusHeader } from "@/components/layout/PositivusHeader";
import { Clock, Trees, Award, RefreshCw, ArrowLeft, MapPin, User, Search } from "lucide-react";
import { BreakSession, HistoryResponse } from "@/types/history";

function HistoryContent() {
  const searchParams = useSearchParams();
  const queryName = searchParams.get("name") || "";

  const [activeName, setActiveName] = useState(queryName);
  const [searchInput, setSearchInput] = useState(queryName);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<BreakSession[]>([]);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalBreaks, setTotalBreaks] = useState(0);

  const fetchUserHistory = async (targetName: string) => {
    if (!targetName.trim()) {
      setHistory([]);
      setTotalMinutes(0);
      setTotalBreaks(0);
      return;
    }
    setLoading(true);
    try {
      const url = `/api/history?name=${encodeURIComponent(targetName.trim())}`;
      const res = await fetch(url);
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
    if (queryName) {
      setActiveName(queryName);
      setSearchInput(queryName);
      fetchUserHistory(queryName);
    }
  }, [queryName]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setActiveName(searchInput.trim());
    fetchUserHistory(searchInput.trim());
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-8 sm:py-12 space-y-8 sm:space-y-12">
      {/* Top Header & Search Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 sm:space-y-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-600 hover:text-[#191A23] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>Back to Dispatcher</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="bg-[#B9FF66] text-[#191A23] text-xl sm:text-2xl md:text-3xl font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-[7px] border border-[#191A23]/10">
              Activity Log
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#191A23] tracking-tight">
              {activeName ? `${activeName}'s Dispatches` : "User Outdoor Dispatches"}
            </h1>
          </div>
          <p className="text-xs sm:text-sm md:text-base text-neutral-600 max-w-xl">
            Sensory moments, outdoor minutes, and nature badges recorded away from screens.
          </p>
        </div>

        {/* User Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="relative flex items-center">
            <User className="absolute left-3.5 h-4 w-4 text-neutral-500" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter name to view history"
              className="bg-[#F3F3F3] border border-[#191A23] rounded-[14px] pl-9 pr-3 py-2.5 text-xs sm:text-sm font-semibold text-[#191A23] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#B9FF66] w-52 sm:w-60 shadow-inner"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2.5 bg-[#191A23] text-white hover:bg-[#B9FF66] hover:text-[#191A23] border border-[#191A23] rounded-[14px] text-xs sm:text-sm font-bold transition-all shadow-positivus-sm cursor-pointer"
          >
            Find History
          </button>

          {activeName && (
            <button
              type="button"
              onClick={() => fetchUserHistory(activeName)}
              disabled={loading}
              className="p-2.5 bg-[#F3F3F3] hover:bg-[#191A23] hover:text-white border border-[#191A23] rounded-[14px] transition-all cursor-pointer shadow-positivus-sm"
              title="Refresh"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          )}
        </form>
      </div>

      {!activeName ? (
        /* Empty Prompt State */
        <div className="py-20 text-center space-y-4 bg-[#F3F3F3] border border-dashed border-[#191A23]/30 rounded-[32px] sm:rounded-[45px] p-8 sm:p-16">
          <User className="h-12 w-12 text-[#191A23]/50 mx-auto" />
          <div className="space-y-1">
            <h3 className="font-bold text-xl text-[#191A23]">Enter your name to view your activity</h3>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
              Type your name in the search box above or dispatch a break from the home page to record your outdoor minutes.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#191A23] text-white rounded-[14px] text-sm font-semibold hover:bg-[#B9FF66] hover:text-[#191A23] transition-all"
          >
            <span>Go to Dispatcher</span>
          </Link>
        </div>
      ) : (
        <>
          {/* Positivus Hero Stats Cards (Personalized for this user only) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Card 1: Total Time */}
            <div className="bg-[#FFFFFF] border border-[#191A23] rounded-[28px] sm:rounded-[40px] p-6 sm:p-8 shadow-positivus flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-500">
                  Total Sunlight Time
                </span>
                <div className="h-9 w-9 sm:h-10 sm:w-10 bg-[#B9FF66] border border-[#191A23] rounded-full flex items-center justify-center text-[#191A23]">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              </div>
              <div className="mt-4 sm:mt-6">
                <div className="text-4xl sm:text-5xl font-black text-[#191A23]">{totalMinutes}m</div>
                <p className="text-xs text-neutral-600 mt-1">Minutes disconnected from monitors</p>
              </div>
            </div>

            {/* Card 2: Completed Quests */}
            <div className="bg-[#B9FF66] border border-[#191A23] rounded-[28px] sm:rounded-[40px] p-6 sm:p-8 shadow-positivus flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#191A23]/70">
                  Quests Completed
                </span>
                <div className="h-9 w-9 sm:h-10 sm:w-10 bg-[#191A23] text-[#B9FF66] rounded-full flex items-center justify-center">
                  <Trees className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              </div>
              <div className="mt-4 sm:mt-6">
                <div className="text-4xl sm:text-5xl font-black text-[#191A23]">{totalBreaks}</div>
                <p className="text-xs text-[#191A23]/80 mt-1">Mindful outdoor breaks logged</p>
              </div>
            </div>

            {/* Card 3: Badges Unlocked */}
            <div className="bg-[#191A23] text-white border border-[#191A23] rounded-[28px] sm:rounded-[40px] p-6 sm:p-8 shadow-positivus flex flex-col justify-between sm:col-span-2 md:col-span-1">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-400">
                  Nature Badges
                </span>
                <div className="h-9 w-9 sm:h-10 sm:w-10 bg-[#B9FF66] text-[#191A23] rounded-full flex items-center justify-center">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              </div>
              <div className="mt-4 sm:mt-6">
                <div className="text-4xl sm:text-5xl font-black text-[#B9FF66]">
                  {history.filter((h) => h.evaluation?.badgeEarned).length}
                </div>
                <p className="text-xs text-neutral-400 mt-1">Mindful badges awarded by Gemma</p>
              </div>
            </div>
          </div>

          {/* Sessions Grid for User */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between border-b border-[#191A23]/10 pb-3 sm:pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#191A23]">
                {activeName}'s Logged Breaks
              </h2>
              <span className="text-xs font-semibold text-neutral-500">
                {history.length} session{history.length === 1 ? "" : "s"}
              </span>
            </div>

            {loading && history.length === 0 ? (
              <div className="py-16 sm:py-24 text-center space-y-3">
                <RefreshCw className="h-7 w-7 sm:h-8 sm:w-8 animate-spin mx-auto text-neutral-400" />
                <p className="text-xs sm:text-sm text-neutral-500">Loading {activeName}'s sessions...</p>
              </div>
            ) : history.length === 0 ? (
              <div className="py-16 sm:py-24 text-center space-y-4 bg-[#F3F3F3] border border-dashed border-[#191A23]/30 rounded-[32px] sm:rounded-[45px] p-6 sm:p-12">
                <Trees className="h-10 w-10 sm:h-12 sm:w-12 text-neutral-400 mx-auto" />
                <div className="space-y-1">
                  <h3 className="font-bold text-lg sm:text-xl text-[#191A23]">
                    No activities recorded for "{activeName}"
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
                    Dispatch an outdoor break from the home page using this name to start your streak!
                  </p>
                </div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-[#191A23] text-white rounded-[12px] sm:rounded-[14px] text-xs sm:text-sm font-semibold hover:bg-[#B9FF66] hover:text-[#191A23] hover:border-[#191A23] transition-all"
                >
                  <span>Dispatch a Break Now</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {history.map((item, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <div
                      key={item._id}
                      className={`border border-[#191A23] rounded-[28px] sm:rounded-[40px] p-5 sm:p-7 shadow-positivus flex flex-col justify-between space-y-4 sm:space-y-5 transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-positivus-sm ${
                        isEven ? "bg-[#FFFFFF]" : "bg-[#F3F3F3]"
                      }`}
                    >
                      {/* Header: Environment, Duration & Badge */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-neutral-600">
                            <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#191A23]" />
                            <span>{item.environment}</span>
                            <span>•</span>
                            <span>{item.durationMinutes}m</span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-[#191A23] leading-snug">
                            {item.mission?.title || "Outdoor Micro-Mission"}
                          </h3>
                        </div>

                        {item.evaluation?.badgeEarned && (
                          <div className="self-start sm:self-auto shrink-0 bg-[#B9FF66] text-[#191A23] text-[11px] sm:text-xs font-extrabold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-[#191A23]/10 flex items-center gap-1.5 shadow-sm">
                            <Award className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                            <span>{item.evaluation.badgeEarned}</span>
                          </div>
                        )}
                      </div>

                      {/* Observation Quote */}
                      {item.observation && (
                        <div className="bg-[#FFFFFF] border border-[#191A23]/10 p-3.5 sm:p-4 rounded-[18px] sm:rounded-[22px] space-y-1">
                          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                            Sensory Reflection:
                          </span>
                          <p className="text-xs sm:text-sm text-neutral-800 italic leading-relaxed">
                            "{item.observation}"
                          </p>
                        </div>
                      )}

                      {/* Gemma AI Insight */}
                      {item.evaluation?.insight && (
                        <p className="text-xs text-neutral-600 bg-[#B9FF66]/20 border border-[#191A23]/10 p-3 rounded-[14px] sm:rounded-[16px] leading-relaxed">
                          <strong className="text-[#191A23]">Gemma Insight: </strong>
                          {item.evaluation.insight}
                        </p>
                      )}

                      {/* Footer Date & Score */}
                      <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 sm:pt-3 border-t border-[#191A23]/10">
                        <span className="flex items-center gap-1.5 text-[11px] sm:text-xs">
                          <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          {item.completedAt
                            ? new Date(item.completedAt).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "Recently"}
                        </span>
                        {item.evaluation?.sensoryScore && (
                          <span className="font-bold text-[#191A23] bg-[#B9FF66] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-[6px] sm:rounded-[8px] text-[11px] sm:text-xs border border-[#191A23]/10">
                            Mindfulness: {item.evaluation.sensoryScore}/10
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
}

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#191A23]">
      <PositivusHeader isHistoryPage={true} />
      <Suspense fallback={<div className="py-24 text-center text-sm text-neutral-400">Loading activity log...</div>}>
        <HistoryContent />
      </Suspense>
    </div>
  );
}
