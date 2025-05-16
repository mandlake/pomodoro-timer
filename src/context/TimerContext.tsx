"use client";

import { createContext, useReducer, useContext } from "react";
import type { TimerState, TimerAction, TimerMode } from "../types/timer";

// 기본 설정
const FOCUS_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;

// 초기 상태
const initialState: TimerState = {
  mode: "FOCUS",
  timeLeft: FOCUS_DURATION,
  isRunning: false,
  sessionsCompleted: 0,
};

// 리듀서 정의
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

// Context 생성
const TimerContext = createContext<{
  state: TimerState;
  dispatch: React.Dispatch<TimerAction>;
} | null>(null);

// Provider 정의
export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};

// 커스텀 훅
export function useTimerContext() {
  const context = useContext(TimerContext);
  if (!context)
    throw new Error("useTimerContext must be used within a TimerProvider");
  return context;
}
