"use client";

import { useTimerContext } from "../context/TimerContext";
import { formatTime } from "../utils/TimeFormatter";

export default function TimerDisplay() {
  const { state } = useTimerContext();
  return (
    <div className="text-center text-4xl font-bold">
      {formatTime(state.timeLeft)}
    </div>
  );
}
