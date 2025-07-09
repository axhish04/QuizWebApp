import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function QuizCard({ quiz }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5">{quiz.title}</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {quiz.description}
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to={`/quiz/${quiz.id}`}
          >
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default QuizCard;