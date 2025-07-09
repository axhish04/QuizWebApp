import React, { useEffect, useState } from "react";
import QuizCard from "../components/QuizCard";
import { Typography, Grid, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { fetchQuizzes } from "../firebase/quizUtils";

function HomePage() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes().then((data) => {
      setQuizzes(data);
      setLoading(false);
    });
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Typography variant="h3" gutterBottom>
        Select a Quiz
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {quizzes.map((quiz) => (
            <Grid item xs={12} sm={6} key={quiz.id}>
              <QuizCard quiz={quiz} />
            </Grid>
          ))}
        </Grid>
      )}
    </motion.div>
  );
}

export default HomePage;