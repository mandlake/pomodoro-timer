"use client";
import ControlButtons from "../components/ControlButtons";
import HistoryLog from "../components/historyLog";
import ProgressBar from "../components/ProgressBar";
import TimerDisplay from "../components/TimerDisplay";
import { useTimer } from "../hooks/useTimer";

export default function Home() {
  useTimer();
  return (
    <div className="p-6 max-w-md mx-auto flex flex-col gap-6">
      <TimerDisplay />
      <ProgressBar />
      <ControlButtons />
      <HistoryLog />
    </div>
  );
}
