"use client";
import { Link } from "react-router-dom";
import ControlButtons from "../components/ControlButtons";
import HistoryLog from "../components/HistoryLog";
import ProgressBar from "../components/ProgressBar";
import TimerDisplay from "../components/TimerDisplay";
import { useTimer } from "../hooks/useTimer";

export default function Home() {
  useTimer();
  return (
    <div className="w-screen h-full">
      <div className="p-4 max-w-md mx-auto flex flex-col gap-6">
        {/* 상단 설정 버튼 */}
        <div className="flex justify-end">
          <Link to="/settings" className="text-sm text-black hover:underline">
            ⚙ 설정
          </Link>
        </div>

        <TimerDisplay />
        <ProgressBar />
        <ControlButtons />
        <HistoryLog />
      </div>
    </div>
  );
}
