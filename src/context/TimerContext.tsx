"use client";

// src/context/TimerContext.tsx

import React, { createContext, useReducer, useContext, useEffect } from "react";
import type { TimerState, TimerAction, TimerMode } from "../types/timer";

const FOCUS_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;
const STORAGE_KEY = "pomodoro-timer-state";

// 🔁 상태 로드
function loadStateFromStorage(): TimerState {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw)
    return {
      mode: "FOCUS",
      timeLeft: FOCUS_DURATION,
      isRunning: false,
      sessionsCompleted: 0,
    };

  try {
    const parsed: TimerState = JSON.parse(raw);
    return {
      ...parsed,
      isRunning: false, // 앱 재시작 시 항상 일시정지 상태로 시작
    };
  } catch {
    return {
      mode: "FOCUS",
      timeLeft: FOCUS_DURATION,
      isRunning: false,
      sessionsCompleted: 0,
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
        timeLeft: state.mode === "FOCUS" ? FOCUS_DURATION : BREAK_DURATION,
        isRunning: false,
      };
    case "TICK":
      return {
        ...state,
        timeLeft: state.timeLeft > 0 ? state.timeLeft - 1 : 0,
      };
    case "SWITCH_MODE": {
      const newMode: TimerMode = state.mode === "FOCUS" ? "BREAK" : "FOCUS";
      return {
        mode: newMode,
        timeLeft: newMode === "FOCUS" ? FOCUS_DURATION : BREAK_DURATION,
        isRunning: false,
        sessionsCompleted:
          newMode === "FOCUS"
            ? state.sessionsCompleted
            : state.sessionsCompleted + 1,
      };
    }
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
