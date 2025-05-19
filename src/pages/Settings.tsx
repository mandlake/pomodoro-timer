"use client";

import { useState } from "react";
import { useTimerContext } from "../context/TimerContext";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { state, dispatch } = useTimerContext();
  const navigate = useNavigate();

  const [focusMinutes, setFocusMinutes] = useState(
    state.settings.focusDuration / 60
  );
  const [breakMinutes, setBreakMinutes] = useState(
    state.settings.breakDuration / 60
  );

  const handleSave = () => {
    const newSettings = {
      focusDuration: focusMinutes * 60,
      breakDuration: breakMinutes * 60,
    };

    dispatch({ type: "UPDATE_SETTINGS", payload: newSettings });
    alert("설정이 저장되었습니다.");

    navigate("/"); // ✅ 저장 후 홈으로 이동
  };

  return (
    <div className="p-6 max-w-md mx-auto flex flex-col gap-4">
      <h1 className="text-2xl font-bold">⏱ 시간 설정</h1>

      <label className="flex flex-col">
        집중 시간 (분)
        <input
          type="number"
          min="1"
          value={focusMinutes}
          onChange={(e) => setFocusMinutes(Number(e.target.value))}
          className="border p-2 rounded"
        />
      </label>

      <label className="flex flex-col">
        휴식 시간 (분)
        <input
          type="number"
          min="1"
          value={breakMinutes}
          onChange={(e) => setBreakMinutes(Number(e.target.value))}
          className="border p-2 rounded"
        />
      </label>

      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded">
        저장
      </button>
    </div>
  );
}
