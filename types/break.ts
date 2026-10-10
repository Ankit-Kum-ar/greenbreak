import { LucideIcon } from "lucide-react";

export type Stage = "setup" | "mission" | "pocket" | "debrief" | "summary";

export interface MissionData {
  title: string;
  steps: string[];
}

export interface EvaluationData {
  sensoryScore: number;
  badgeEarned: string;
  insight: string;
}

export interface BreakDurationOption {
  value: number;
  label: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}

export interface EnvironmentOption {
  id: string;
  label: string;
  desc: string;
  icon: LucideIcon;
}

export interface FocusAreaOption {
  id: string;
  label: string;
  desc: string;
  icon: LucideIcon;
}
