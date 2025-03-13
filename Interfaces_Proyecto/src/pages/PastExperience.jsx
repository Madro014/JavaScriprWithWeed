import { useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function PastExperience() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = [
    {
      image: '🎮',
      question: '¿Qué hacemos con este dispositivo?',
      options: ['Jugar', 'Lavar', 'Escribir'],
      correct: 'Jugar'
    },
    {
      image: '📱',
      question: '¿Qué hacemos principalmente con esto?',
      options: ['Cocinar', 'Llamar', 'Dormir'],
      correct: 'Llamar'
    },
    {
      image: '✏️',
      question: '¿Para qué usamos este objeto?',
      options: ['Comer', 'Bailar', 'Escribir'],
      correct: 'Escribir'
    },
    {
      image: '🚗',
      question: '¿Qué acción realizamos con este vehículo?',
      options: ['Conducir', 'Nadar', 'Volar'],
      correct: 'Conducir'
    }
  ];

  const [showError, setShowError] = useState(false);

  const handleAnswerClick = (answer) => {
    if (isCompleted) return;
    
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].correct) {
      if (currentQuestion === questions.length - 1) {
        setIsCompleted(true);
        setScore(score + 1);
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setScore(score + 1);
      }
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const gameOrder = [
    '/similarity',
    '/proximity',
    '/closure',
    '/continuity',
    '/figure-ground',
    '/symmetry',
    '/past-experience',
    '/final-activity'
  ];

  const goToNextGame = () => {
    const currentIndex = gameOrder.indexOf(window.location.pathname);
    if (currentIndex < gameOrder.length - 1) {
      navigate(gameOrder[currentIndex + 1]);
    }
  };

  return (
    <Box sx={{ p: 4, textAlign: 'center', maxWidth: 900, margin: 'auto' }}>
      <Typography variant="h3" sx={{ mb: 3, color: '#2196f3', fontSize: '2rem' }}>
        Ley de la Experiencia Pasada 🧠
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, color: '#666', fontSize: '1rem' }}>
        ¡Usa lo que ya sabes para adivinar qué hacer!
      </Typography>

      <Paper 
        elevation={3}
        sx={{ 
          p: 4,
          backgroundColor: '#fff',
          position: 'relative',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center', // Añadido para centrar verticalmente
          maxWidth: '800px',        // Añadido para controlar el ancho
          margin: 'auto'            // Añadido para centrar horizontalmente
        }}
      >
        {!isCompleted ? (
          <>
            <Typography variant="h6" sx={{ mb: 4 }}>
              {questions[currentQuestion].question}
            </Typography>

            <Box sx={{ 
              fontSize: '6rem',     // Aumentado el tamaño
              mb: 4,
              display: 'flex',
              justifyContent: 'center',
              width: '100%'
            }}>
              {questions[currentQuestion].image}
            </Box>

            <Box sx={{ 
              display: 'flex', 
              gap: 3,              // Aumentado el espacio entre botones
              justifyContent: 'center',
              width: '100%',
              mb: 4               // Añadido margen inferior
            }}>
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option ? "contained" : "outlined"}
                  onClick={() => handleAnswerClick(option)}
                  sx={{ 
                    minWidth: '150px',  // Aumentado el ancho mínimo
                    py: 1.5,            // Aumentado el padding vertical
                    fontSize: '1.1rem'   // Aumentado el tamaño de fuente
                  }}
                >
                  {option}
                </Button>
              ))}
            </Box>

            {showError && (
              <Typography 
                sx={{ 
                  color: '#f44336',
                  mt: 2,
                  mb: 2,           // Añadido margen inferior
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}
              >
                ¡Ups! Esa no es la respuesta correcta. ¡Intenta de nuevo! 
              </Typography>
            )}
            <Typography sx={{ mt: 4, color: '#666' }}>
              Puntuación: {score} de 4 ⭐
            </Typography>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <Typography 
              sx={{ 
                color: '#4CAF50',
                fontSize: '2rem',
                mb: 2
              }}
            >
              ¡Completado! 🎉
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={goToNextGame}
              sx={{ 
                fontSize: '1.1rem',
                py: 1,
                px: 4,
                borderRadius: '25px',
                textTransform: 'none'
              }}
            >
              Siguiente actividad →
            </Button>
          </motion.div>
        )}
      </Paper>
    </Box>
  );
}

export default PastExperience;