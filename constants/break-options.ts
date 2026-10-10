import { Eye, Sun, Trees, Building2, Compass, Brain, Activity } from "lucide-react";
import { BreakDurationOption, EnvironmentOption, FocusAreaOption } from "@/types/break";

export const DURATIONS: BreakDurationOption[] = [
  { value: 5, label: "5m", title: "Quick Eye Reset", desc: "Circadian refresh & ocular relaxation", icon: Eye },
  { value: 15, label: "15m", title: "Sun & Movement", desc: "Optimal sunlight & brisk walking", icon: Sun },
  { value: 30, label: "30m", title: "Deep Unplug", desc: "Full cognitive reset & forest bathing", icon: Trees },
];

export const ENVIRONMENTS: EnvironmentOption[] = [
  { id: "Balcony/Rooftop", label: "Balcony / Rooftop", desc: "Skyline & vertical horizon views", icon: Building2 },
  { id: "Urban Sidewalk", label: "Urban Sidewalk", desc: "Street level & neighborhood walking", icon: Compass },
  { id: "Public Park", label: "Public Park / Nature", desc: "Living trees, grass & wildlife", icon: Trees },
];

export const FOCUS_AREAS: FocusAreaOption[] = [
  { id: "Relieve Eye Strain", label: "Relieve Eye Strain", desc: "20-20-20 distance optical relaxation", icon: Eye },
  { id: "Mental Block / Brain Fog", label: "Mental Block & Brain Fog", desc: "Attention restoration via ambient nature", icon: Brain },
  { id: "Physical Stiff Muscles", label: "Physical Stiff Muscles", desc: "Circulation & posture resetting", icon: Activity },
];
