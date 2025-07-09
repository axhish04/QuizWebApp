import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuizzes } from "../firebase/quizUtils";
import Timer from "../components/Timer";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";

const QUIZ_TIME = 120; // seconds for the entire quiz

function QuizPage() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [quizTimeUp, setQuizTimeUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes().then((data) => {
      const found = data.find((q) => q.id === quizId);
      setQuiz(found);
      setLoading(false);
    });
  }, [quizId]);

  useEffect(() => {
    if (quizTimeUp) {
      handleSubmit();
    }
    // eslint-disable-next-line
  }, [quizTimeUp]);

  if (loading) return <CircularProgress />;
  if (!quiz) return <Typography>Quiz not found.</Typography>;

  const handleSelect = (idx) => setSelected(idx);

  const handleNext = () => {
    setAnswers([...answers, selected]);
    setSelected(null);
    if (current + 1 < quiz.questions.length) {
      setCurrent(current + 1);
    } else {
      handleSubmit([...answers, selected]);
    }
  };

  const handleSubmit = (finalAnswers = answers) => {
    // If user is on last question and hasn't answered yet, include selected
    let allAnswers = finalAnswers;
    if (allAnswers.length < quiz.questions.length) {
      allAnswers = [...allAnswers, selected];
    }
    const correct = quiz.questions.filter(
      (q, i) => q.answer === (allAnswers[i] ?? -1)
    ).length;
    const percentage = Math.round((correct / quiz.questions.length) * 100);
    navigate("/result", {
      state: {
        quizId,
        score: correct,
        percentage,
        total: quiz.questions.length,
      },
    });
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <Card>
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <Timer duration={QUIZ_TIME} onTimeUp={() => setQuizTimeUp(true)} />
          </Box>
          <Typography variant="h6" gutterBottom>
            {quiz.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Question {current + 1} of {quiz.questions.length}
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {quiz.questions[current].question}
          </Typography>
          <Box>
            {quiz.questions[current].options.map((opt, idx) => (
              <Button
                key={idx}
                variant={selected === idx ? "contained" : "outlined"}
                sx={{ mb: 1, mr: 1 }}
                onClick={() => handleSelect(idx)}
                fullWidth
              >
                {opt}
              </Button>
            ))}
          </Box>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleNext}
            disabled={selected === null}
            fullWidth
          >
            {current + 1 === quiz.questions.length ? "Submit" : "Next"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default QuizPage;