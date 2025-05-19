"use client";

import { useTimerContext } from "../context/TimerContext";

export default function ControlButtons() {
  const { state, dispatch } = useTimerContext();

  return (
    <div className="flex justify-center gap-4">
      {state.isRunning ? (
        <button
          className="bg-yellow-400 text-white px-4 py-2 rounded"
          onClick={() => dispatch({ type: "PAUSE" })}>
          일시정지
        </button>
      ) : (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => dispatch({ type: "START" })}>
          시작
        </button>
      )}
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded"
        onClick={() => dispatch({ type: "RESET" })}>
        리셋
      </button>
    </div>
  );
}
