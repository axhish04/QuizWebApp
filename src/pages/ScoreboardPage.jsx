import React, { useEffect, useState } from "react";
import { getLeaderboard } from "../firebase/firebaseUtils";
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, Box, CircularProgress } from "@mui/material";
import quizzes from "../data/quizzes";
import { motion } from "framer-motion";

function ScoreboardPage() {
  const [quizId, setQuizId] = useState(quizzes[0].id);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getLeaderboard(quizId).then(data => {
      setScores(data);
      setLoading(false);
    });
  }, [quizId]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Typography variant="h4" gutterBottom>
        Leaderboard
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Select value={quizId} onChange={e => setQuizId(e.target.value)}>
          {quizzes.map(q => (
            <MenuItem key={q.id} value={q.id}>
              {q.title}
            </MenuItem>
          ))}
        </Select>
      </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scores.map((s, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{s.displayName}</TableCell>
                  <TableCell>{s.score}</TableCell>
                  <TableCell>{s.percentage}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </motion.div>
  );
}

export default ScoreboardPage;