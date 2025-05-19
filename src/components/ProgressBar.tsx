"use client";

import { useTimerContext } from "../context/TimerContext";

export default function ProgressBar() {
  const { state } = useTimerContext();

  const total = state.mode === "FOCUS" ? 25 * 60 : 5 * 60;

  const percentage = ((total - state.timeLeft) / total) * 100;

  return (
    <div className="w-full h-4 bg-gray-300 rounded overflow-hidden">
      <div
        className={`h-full transition-all duration-500 ${
          state.mode === "FOCUS" ? "bg-red-500" : "bg-green-500"
        }`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
