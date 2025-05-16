"use client";
import TimerDisplay from "../components/TimerDisplay";
import { useTimer } from "../hooks/useTimer";

export default function Home() {
  useTimer();
  return (
    <div className="p-6 max-w-md mx-auto flex flex-col gap-6">
      <TimerDisplay />
    </div>
  );
}
