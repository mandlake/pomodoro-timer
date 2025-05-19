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
      sessionsCompleted: 0,
      settings: defaultSettings,
    };
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      ...parsed,
      isRunning: false,
      settings: parsed.settings ?? defaultSettings,
    };
  } catch {
    return {
      mode: "FOCUS",
      timeLeft: FOCUS_DURATION,
      isRunning: false,
      sessionsCompleted: 0,
      settings: defaultSettings,
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

      return {
        ...state,
        mode: newMode,
        timeLeft: newTime,
        isRunning: false,
        sessionsCompleted:
          newMode === "FOCUS"
            ? state.sessionsCompleted
            : state.sessionsCompleted + 1,
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
    const { isRunning, ...persistable } = state;
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
