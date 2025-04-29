import { useState, useRef, useMemo, useEffect, useCallback } from "react";

export default function useStopwatch() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const formatTime = useCallback((seconds: number) => {
    const hour = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minute = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const second = String(Math.floor(seconds % 60)).padStart(2, "0");
    const milliseconds = String(Math.floor((seconds % 1) * 1000)).padStart(
      3,
      "0"
    ).slice(0, 2);

    return `${hour}:${minute}:${second}.${milliseconds}`;
  }, []);

  function clearTimer() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function handleStartStop() {
    if (isRunning) {
      clearTimer();
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  }

  useEffect(() => {
    if (isRunning) {
      const currentTime = Date.now();
      setStartTime((prev) =>
        prev === null ? currentTime : currentTime - (now! - prev)
      );
      setNow(currentTime);

      intervalRef.current = setInterval(() => {
        setNow(Date.now());
      }, 10);
    } else {
      clearTimer();
    }

    return () => clearTimer();
  }, [isRunning]);

  function handleLap() {
    if (startTime != null && now != null) {
      const time = formatTime((now - startTime) / 1000);
      setLog((prevLog) => [time, ...prevLog]);
    }
  }

  function handleReset() {
    clearTimer();
    setStartTime(null);
    setNow(null);
    setLog([]);
  }

  const secondsPassed = useMemo(() => {
    if (startTime != null && now != null) {
      return (now - startTime) / 1000;
    }
    return 0;
  }, [startTime, now]);

  return {
    isRunning,
    log,
    secondsPassed,
    formatTime,
    handleStartStop,
    handleLap,
    handleReset,
    showTime: now && startTime
  };
}