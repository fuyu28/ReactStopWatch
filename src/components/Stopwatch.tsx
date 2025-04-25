import { useStopwatch } from "../hooks/useStopwatch";
import Timedisplay from "./TimeDisplay";

export default function StopWatch() {
  const {
    isRunning,
    log,
    secondsPassed,
    formatTime,
    handleStartStop,
    handleLap,
    handleReset,
    showTime,
  } = useStopwatch();

  return (
    <>
      <h1>StopWatch</h1>
      <Timedisplay time={secondsPassed} show={showTime} format={formatTime} />
      <button onClick={isRunning ? handleLap : handleReset}>
        {isRunning ? "Lap" : "Reset"}
      </button>
      <button onClick={handleStartStop}>{isRunning ? "Stop" : "Start"}</button>
      <ul>
        {log.map((time, index) => (
          <li key={index}>
            Lap {log.length - index} {time}
          </li>
        ))}
      </ul>
    </>
  );
}
