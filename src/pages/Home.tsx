"use client";
import TimerDisplay from "../components/TimerDisplay";

export default function Home() {
  return (
    <div className="p-6 max-w-md mx-auto flex flex-col gap-6">
      <TimerDisplay />
    </div>
  );
}
