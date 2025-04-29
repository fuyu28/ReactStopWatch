import useStopwatch from "../hooks/useStopwatch";
import Timedisplay from "./TimeDisplay";
import { Button, Stack, Typography, Box, Container } from "@mui/material";

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
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 5, fontFamily: "monospace" }}>
        <Typography variant="h3" gutterBottom>
          Stopwatch
        </Typography>
        <Typography
          variant="h2"
          sx={{ fontVariantNumeric: "tabular-nums", mb: 2 }}
        >
          <Timedisplay
            time={secondsPassed}
            show={showTime}
            format={formatTime}
          />
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" mb={3}>
          <Button
            variant="contained"
            onClick={isRunning ? handleLap : handleReset}
            sx={{ minWidth: 100 }}
          >
            {isRunning ? "Lap" : "Reset"}
          </Button>
          <Button
            variant="outlined"
            onClick={handleStartStop}
            sx={{ minWidth: 100 }}
          >
            {isRunning ? "Stop" : "Start"}
          </Button>
        </Stack>
        <Box component="ul" sx={{ listStyle: "none", padding: 0, mt: 3 }}>
          {log.map((time, index) => (
            <li key={index}>
              <Typography variant="body1">
                Lap {log.length - index} {time}
              </Typography>
            </li>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
