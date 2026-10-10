export interface BreakSession {
  _id: string;
  fullName?: string;
  username?: string;
  userName?: string;
  durationMinutes: number;
  environment: string;
  focusArea: string;
  mission: {
    title: string;
    steps: string[];
  };
  status?: "in_progress" | "completed";
  observation?: string;
  evaluation?: {
    sensoryScore: number;
    badgeEarned: string;
    insight: string;
  };
  aiProvider?: string;
  startedAt?: string;
  completedAt?: string;
}

export interface HistoryResponse {
  success: boolean;
  history: BreakSession[];
  totalMinutes: number;
  totalBreaks: number;
  username?: string;
}
