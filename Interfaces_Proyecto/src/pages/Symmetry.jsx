import { useState } from 'react';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Symmetry() {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showError, setShowError] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const symmetryPairs = [
    {
      main: '🦋',
      options: ['🦅', '🦋', '🦊'],
      correct: 1
    },
    {
      main: '🎭',
      options: ['🎪', '🎨', '🎭'],
      correct: 2
    },
    {
      main: '🌸',
      options: ['🌸', '🌺', '🌹'],
      correct: 0
    }
  ];

  const handleOptionClick = (optionIndex) => {
    if (optionIndex === symmetryPairs[currentImage].correct) {
      if (currentImage === symmetryPairs.length - 1) {
        setIsCompleted(true);
      } else {
        setCurrentImage(currentImage + 1);
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
    '/past-experience',  // Asegurando que esta ruta coincida con el componente
    '/common-movement',
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
        Ley de la Simetría 🪞
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, color: '#666', fontSize: '1rem' }}>
        ¡Encuentra la imagen espejo correcta! Las cosas simétricas son como reflejos.
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
          justifyContent: 'center', // Añadido para centrado vertical
          margin: '0 auto', // Añadido para centrado horizontal
          maxWidth: '800px' // Ajustado el ancho máximo
        }}
      >
        {!isCompleted ? (
          <>
            <Box sx={{ 
              mb: 4, 
              fontSize: '4rem',
              display: 'flex',
              justifyContent: 'center',
              width: '100%'
            }}>
              {symmetryPairs[currentImage].main}
            </Box>

            <Grid 
              container 
              spacing={3} 
              justifyContent="center" 
              alignItems="center"
              sx={{ 
                maxWidth: 600,
                margin: '0 auto'
              }}
            >
              {symmetryPairs[currentImage].options.map((option, index) => (
                <Grid item key={index}>
                  <Paper
                    onClick={() => handleOptionClick(index)}
                    sx={{
                      p: 3,
                      cursor: 'pointer',
                      backgroundColor: selectedOption === index ? '#e3f2fd' : '#fff',
                      '&:hover': { transform: 'scale(1.05)' },
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      minWidth: '100px'
                    }}
                  >
                    <Typography sx={{ fontSize: '2.5rem' }}>{option}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {showError && (
              <Typography 
                sx={{ 
                  color: 'error.main',
                  mt: 2,
                  fontSize: '1.1rem'
                }}
              >
                ¡Ups! Estas imágenes no son simétricas. ¡Intenta de nuevo!
              </Typography>
            )}
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

export default Symmetry;