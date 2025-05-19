"use client";

import { useTimerContext } from "../context/TimerContext";

export default function HistoryLog() {
  const { state } = useTimerContext();

  return (
    <div className="text-sm text-gray-600 text-center mt-4">
      오늘 완료한 집중 세션: <strong>{state.sessionsCompleted}</strong>
    </div>
  );
}
