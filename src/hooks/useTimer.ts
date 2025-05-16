"use client";

import { useEffect } from "react";
import { useTimerContext } from "../context/TimerContext";

export function useTimer() {
  const { state, dispatch } = useTimerContext();

  useEffect(() => {
    if (!state.isRunning) return;

    const interval = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.timeLeft, dispatch]);
}
