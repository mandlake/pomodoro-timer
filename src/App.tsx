"use client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TimerProvider } from "./context/TimerContext";
import Home from "./pages/Home";
import Settings from "./pages/Settings";

function App() {
  return (
    <TimerProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </TimerProvider>
  );
}

export default App;
