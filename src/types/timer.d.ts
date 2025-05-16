export type TimerMode = "FOCUS" | "BREAK";

export interface TimerState {
  mode: TimerMode;
  timeLeft: number; // 단위: 초
  isRunning: boolean;
  sessionsCompleted: number;
}

export type TimerAction =
  | { type: "START" }
  | { type: "PAUSE" }
  | { type: "RESET" }
  | { type: "TICK" }
  | { type: "SWITCH_MODE" };
