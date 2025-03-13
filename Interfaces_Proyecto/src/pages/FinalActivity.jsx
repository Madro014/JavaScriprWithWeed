import { useState } from 'react';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function FinalActivity() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      text: "¿Qué ley de la Gestalt nos ayuda a ver estas figuras como un grupo? 👥👥👥",
      options: ["Ley de la Similitud", "Ley del Cierre", "Ley de la Continuidad"],
      correct: 0
    },
    {
      id: 2,
      text: "¿Qué ley nos hace ver esto como una cara completa? 👁️ 👄",
      options: ["Ley de la Proximidad", "Ley del Cierre", "Ley de la Simetría"],
      correct: 1
    },
    {
      id: 3,
      text: "¿Qué ley nos hace ver el fondo y la figura? 🎭",
      options: ["Ley de la Figura-Fondo", "Ley de la Continuidad", "Ley de la Similitud"],
      correct: 0
    }
  ];

  const handleAnswer = (selectedOption) => {
    const correct = selectedOption === questions[currentQuestion].correct;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    setAnswers([...answers, {
      question: questions[currentQuestion].text,
      selectedAnswer: questions[currentQuestion].options[selectedOption],
      correctAnswer: questions[currentQuestion].options[questions[currentQuestion].correct],
      isCorrect: correct
    }]);
    
    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion === questions.length - 1) {
        setIsCompleted(true);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  const handleRestart = () => {
    navigate('/similarity');
  };

  const gameOrder = [
    '/similarity',
    '/proximity',
    '/closure',
    '/continuity',
    '/figure-ground',
    '/symmetry',
    '/past-experience',
    '/common-movement',
    '/final-activity'
  ];

  const goToNextGame = () => {
    const currentIndex = gameOrder.indexOf(window.location.pathname);
    if (currentIndex < gameOrder.length - 1) {
      navigate(gameOrder[currentIndex + 1]);
    } else {
      navigate('/'); // Go home if it's the last game
    }
  };

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h3" sx={{ mb: 3, color: '#2196f3' }}>
        ¡Actividad Final! 🎮
      </Typography>

      {!isCompleted ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 4 }}>
              {questions[currentQuestion].text}
            </Typography>

            {showFeedback && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Typography 
                  variant="h4" 
                  sx={{ 
                    mb: 3, 
                    color: isCorrect ? '#4CAF50' : '#f44336',
                    fontWeight: 'bold'
                  }}
                >
                  {isCorrect ? '¡Correcto! 🎉' : '¡Te falta estudiar un poco mas ! 💪'}
                </Typography>
              </motion.div>
            )}

            <Grid container spacing={2} justifyContent="center">
              {questions[currentQuestion].options.map((option, index) => (
                <Grid item key={index}>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAnswer(index)}
                      disabled={showFeedback}
                      sx={{ minWidth: 200 }}
                    >
                      {option}
                    </Button>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Paper>

          <Typography variant="h6">
            Pregunta {currentQuestion + 1} de {questions.length}
          </Typography>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 3,
                color: '#4CAF50',
                fontSize: '2.5rem',
                textAlign: 'center'
              }}
            >
              ¡Felicitaciones! 🎉
              <Typography
                variant="h5"
                sx={{
                  mt: 2,
                  color: '#666',
                  fontSize: '1.8rem'
                }}
              >
                Has completado todas las actividades con éxito
              </Typography>
            </Typography>

            <Typography variant="h5" sx={{ mb: 4, color: '#2196f3' }}>
              Puntuación final: {score} de {questions.length} ⭐
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleRestart}
                sx={{ 
                  fontSize: '1.2rem',
                  py: 1.5,
                  px: 4,
                  borderRadius: '25px',
                  backgroundColor: '#2196f3',
                  '&:hover': {
                    backgroundColor: '#1976d2'
                  }
                }}
              >
                Volver a realizar las actividades 🔄
              </Button>
            </Box>
          </Paper>
        </motion.div>
      )}
    </Box>
  );
}

export default FinalActivity;