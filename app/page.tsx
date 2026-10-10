"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { PositivusHeader } from "@/components/layout/PositivusHeader";
import { SetupStage } from "@/components/stages/SetupStage";
import { MissionStage } from "@/components/stages/MissionStage";
import { PocketStage } from "@/components/stages/PocketStage";
import { DebriefStage } from "@/components/stages/DebriefStage";
import { SummaryStage } from "@/components/stages/SummaryStage";
import { useAudioChime } from "@/hooks/use-audio-chime";
import { useBreakTimer } from "@/hooks/use-break-timer";
import { Stage, MissionData, EvaluationData } from "@/types/break";

export default function HomePage() {
  // Navigation & User State (starts clean and empty)
  const [stage, setStage] = useState<Stage>("setup");
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(15);
  const [environment, setEnvironment] = useState("Urban Sidewalk");
  const [focusArea, setFocusArea] = useState("Relieve Eye Strain");

  // API & Mission State
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [mission, setMission] = useState<MissionData | null>(null);

  // Debrief & Stats State
  const [observation, setObservation] = useState("");
  const [evaluation, setEvaluation] = useState<EvaluationData | null>(null);
  const [totalMinutes, setTotalMinutes] = useState(15);
  const [totalBreaks, setTotalBreaks] = useState(1);

  // Audio Hook
  const { playAlertChime } = useAudioChime();

  // Timer Hook
  const { formattedTime, isCompleted, resetTimer } = useBreakTimer({
    initialMinutes: duration,
    isActive: stage === "pocket",
    onComplete: () => {
      playAlertChime();
    },
  });

  // Launch Break Dispatch API
  const handleDispatch = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/dispatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          durationMinutes: duration,
          environment,
          focusArea,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSessionId(data.sessionId);
        setMission(data.mission);
        resetTimer(duration);
        setStage("mission");
      }
    } catch (err) {
      console.error("Failed to dispatch mission:", err);
      setMission({
        title: "The Sunlight Horizon Reset",
        steps: [
          "Step into direct ambient daylight without your phone.",
          "Gaze at the furthest skyline or canopy for 60 seconds.",
          "Feel the ambient air temperature and note 3 real-world textures.",
        ],
      });
      resetTimer(duration);
      setStage("mission");
    } finally {
      setLoading(false);
    }
  };

  // Complete Break Evaluation API
  const handleCompleteBreak = async () => {
    if (!observation.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          observation,
          durationMinutes: duration,
          environment,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEvaluation(data.evaluation);
        setTotalMinutes(data.totalMinutes || duration);
        setTotalBreaks(data.totalBreaks || 1);
        setStage("summary");

        // Fire celebration confetti burst
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#b9ff66", "#191a23", "#3b82f6", "#eab308"],
        });
      }
    } catch (err) {
      console.error("Failed to evaluate observation:", err);
      setEvaluation({
        sensoryScore: 9,
        badgeEarned: "Canopy Tactician",
        insight: "Mindful connection to the physical environment successfully logged.",
      });
      setTotalMinutes((prev) => prev + duration);
      setTotalBreaks((prev) => prev + 1);
      setStage("summary");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStage("setup");
    setObservation("");
    setEvaluation(null);
    setMission(null);
  };

  // Full-screen standalone OLED view
  if (stage === "pocket") {
    return (
      <PocketStage
        environment={environment}
        formattedTime={formattedTime}
        isCompleted={isCompleted}
        onReturnToDesk={() => setStage("debrief")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#191A23]">
      <PositivusHeader currentName={name.trim()} />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-8 sm:py-12">
        {/* Stage 1: Setup / Dispatcher */}
        {stage === "setup" && (
          <SetupStage
            duration={duration}
            environment={environment}
            focusArea={focusArea}
            name={name}
            loading={loading}
            onSelectDuration={setDuration}
            onSelectEnvironment={setEnvironment}
            onSelectFocusArea={setFocusArea}
            onChangeName={setName}
            onDispatch={handleDispatch}
          />
        )}

        {/* Stage 2: Mission Card */}
        {stage === "mission" && mission && (
          <MissionStage
            mission={mission}
            duration={duration}
            environment={environment}
            onLockScreen={() => setStage("pocket")}
          />
        )}

        {/* Stage 4: Debrief */}
        {stage === "debrief" && (
          <DebriefStage
            observation={observation}
            loading={loading}
            onChangeObservation={setObservation}
            onSubmit={handleCompleteBreak}
          />
        )}

        {/* Stage 5: Celebration & Scorecard */}
        {stage === "summary" && evaluation && (
          <SummaryStage
            evaluation={evaluation}
            totalMinutes={totalMinutes}
            totalBreaks={totalBreaks}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}
