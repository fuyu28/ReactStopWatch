type TimeDisplayProps = {
  time: number;
  show: boolean;
  format: (seconds: number) => string;
};

export default function TimeDisplay({ time, show, format }: TimeDisplayProps) {
  return <h1>{show ? format(time) : "00:00:00.000"}</h1>;
}
