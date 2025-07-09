import React, { useEffect, useState } from "react";
import { Typography, LinearProgress } from "@mui/material";

function Timer({ duration, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onTimeUp]);

  return (
    <>
      <Typography variant="body2" color="text.secondary">
        Time Left: {timeLeft}s
      </Typography>
      <LinearProgress
        variant="determinate"
        value={(timeLeft / duration) * 100}
        sx={{ height: 8, borderRadius: 5, mb: 2 }}
      />
    </>
  );
}

export default Timer;