"use client";

import { useTimerContext } from "../context/TimerContext";

export default function HistoryLog() {
  const { state } = useTimerContext();
  const today = new Date().toISOString().split("T")[0];
  const todayCount = state.dailySessions?.[today] || 0;

  return (
    <div className="text-sm text-gray-600 text-center mt-4">
      오늘 완료한 집중 세션: <strong>{todayCount}</strong>회
    </div>
  );
}
