import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseConfig";
import { saveScore } from "../firebase/firebaseUtils";
import { Typography, Button, Paper, Box, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const { quizId, score, percentage, total } = location.state || {};

  // Prevent direct access without data
  useEffect(() => {
    if (!quizId || score === undefined) {
      navigate("/", { replace: true });
    }
  }, [quizId, score, navigate]);

  useEffect(() => {
    if (user && quizId && score !== undefined && total !== undefined) {
      setLoading(true);
      saveScore(user.uid, user.displayName, quizId, score, total)
        .finally(() => setLoading(false));
    }
  }, [user, quizId, score, total]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Quiz Results
        </Typography>
        <Typography variant="h6">
          Score: {score} / {total}
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Percentage: {percentage}%
        </Typography>

        <Box>
          <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate("/")}>
            Home
          </Button>
          <Button variant="outlined" onClick={() => navigate("/scoreboard")}>
            View Leaderboard
          </Button>
        </Box>
      </Paper>
    </motion.div>
  );
}

export default ResultPage;
