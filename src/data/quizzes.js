const quizzes = [
  {
    id: "js-basics",
    title: "JavaScript Basics",
    description: "Test your JS fundamentals!",
    questions: [
      {
        question: "What is the output of 2 + '2' in JavaScript?",
        options: ["4", "'4'", "'22'", "NaN"],
        answer: 2,
      },
      {
        question: "Which keyword declares a constant in JS?",
        options: ["let", "var", "const", "static"],
        answer: 2,
      },
      // Add more questions as needed
    ],
  },
  {
    id: "react",
    title: "React Fundamentals",
    description: "How well do you know React?",
    questions: [
      {
        question: "What hook is used for state in functional components?",
        options: ["useState", "useEffect", "useContext", "useRef"],
        answer: 0,
      },
      // Add more questions as needed
    ],
  },
];

export default quizzes;