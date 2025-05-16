import { TimerProvider } from "./context/TimerContext";

import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <TimerProvider>
      <Home />
    </TimerProvider>
  );
}
export default App;
