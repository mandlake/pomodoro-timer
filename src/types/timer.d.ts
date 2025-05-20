export type TimerMode = "FOCUS" | "BREAK";

export interface TimerSettings {
  focusDuration: number; // seconds
  breakDuration: number; // seconds
}

export interface TimerState {
  mode: TimerMode;
  timeLeft: number;
  isRunning: boolean;
  dailySessions: Record<string, number>;
  settings: TimerSettings;
}

type TimerAction =
  | { type: "START" }
  | { type: "PAUSE" }
  | { type: "RESET" }
  | { type: "TICK" }
  | { type: "SWITCH_MODE" }
  | { type: "UPDATE_SETTINGS"; payload: TimerSettings };
