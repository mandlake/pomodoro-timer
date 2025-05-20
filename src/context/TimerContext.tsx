"use client";

import { createContext, useReducer, useContext, useEffect } from "react";
import type { TimerState, TimerAction } from "../types/timer";

const FOCUS_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;
const STORAGE_KEY = "pomodoro-timer-state";

function loadStateFromStorage(): TimerState {
  const raw = localStorage.getItem(STORAGE_KEY);
  const defaultSettings = {
    focusDuration: FOCUS_DURATION,
    breakDuration: BREAK_DURATION,
  };

  if (!raw) {
    return {
      mode: "FOCUS",
      timeLeft: FOCUS_DURATION,
      isRunning: false,
      settings: defaultSettings,
      dailySessions: {},
    };
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      ...parsed,
      isRunning: false,
      settings: parsed.settings ?? defaultSettings,
      dailySessions: parsed.dailySessions ?? {}, // ✅ 추가
    };
  } catch {
    return {
      mode: "FOCUS",
      timeLeft: FOCUS_DURATION,
      isRunning: false,
      settings: defaultSettings,
      dailySessions: {}, // ✅ 추가
    };
  }
}

function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case "START":
      return { ...state, isRunning: true };
    case "PAUSE":
      return { ...state, isRunning: false };
    case "RESET":
      return {
        ...state,
        timeLeft:
          state.mode === "FOCUS"
            ? state.settings.focusDuration
            : state.settings.breakDuration,
        isRunning: false,
      };
    case "TICK":
      return {
        ...state,
        timeLeft: state.timeLeft > 0 ? state.timeLeft - 1 : 0,
      };
    case "SWITCH_MODE": {
      const newMode = state.mode === "FOCUS" ? "BREAK" : "FOCUS";
      const newTime =
        newMode === "FOCUS"
          ? state.settings.focusDuration
          : state.settings.breakDuration;

      const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
      const updatedDaily = { ...state.dailySessions };

      if (newMode === "FOCUS") {
        updatedDaily[today] = (updatedDaily[today] || 0) + 1;
      }

      return {
        ...state,
        mode: newMode,
        timeLeft: newTime,
        isRunning: false,
        dailySessions: updatedDaily,
      };
    }
    case "UPDATE_SETTINGS":
      return {
        ...state,
        settings: action.payload,
        timeLeft:
          state.mode === "FOCUS"
            ? action.payload.focusDuration
            : action.payload.breakDuration,
        isRunning: false,
      };
    default:
      return state;
  }
}

const TimerContext = createContext<{
  state: TimerState;
  dispatch: React.Dispatch<TimerAction>;
} | null>(null);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(timerReducer, loadStateFromStorage());

  useEffect(() => {
    const { isRunning: _, ...persistable } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
  }, [state]);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};

export function useTimerContext() {
  const context = useContext(TimerContext);
  if (!context)
    throw new Error("useTimerContext must be used within a TimerProvider");
  return context;
}
