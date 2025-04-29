import React from "react";
type TimeDisplayProps = {
  time: number;
  show: boolean;
  format: (seconds: number) => string;
};

function TimeDisplay({ time, show, format }: TimeDisplayProps) {
  return <h1>{show ? format(time) : "00:00:00.00"}</h1>;
}

export default React.memo(TimeDisplay);
