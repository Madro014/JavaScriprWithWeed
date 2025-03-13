import { useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Proximity() {
  const navigate = useNavigate();
  const [dots, setDots] = useState(Array(9).fill(false));
  const [isCompleted, setIsCompleted] = useState(false);

  const handleDotClick = (index) => {
    const newDots = [...dots];
    newDots[index] = !newDots[index];
    setDots(newDots);
    
    if (newDots.every(dot => dot)) {
      setIsCompleted(true);
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
        Ley de la Proximidad 🎯
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, color: '#666', fontSize: '1rem' }}>
      ¿Ves estos puntitos? Cuando están cerca se vuelven amigos. 🤜🤛
      ¡Haz clic en cada punto y mira cómo se iluminan! Intenta encender todos para formar un grupo especial.
      </Typography>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 4, 
          backgroundColor: '#fff',
          position: 'relative',
          minHeight: '350px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 3,
            maxWidth: '250px',
            margin: '0 auto'
          }}
        >
          {dots.map((isActive, index) => (
            <Box
              key={index}
              onClick={() => !isCompleted && handleDotClick(index)}
              sx={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: isActive ? '#2196f3' : '#e0e0e0',
                cursor: isCompleted ? 'default' : 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: isCompleted ? 'none' : 'scale(1.1)'
                }
              }}
            />
          ))}
        </Box>

        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', textAlign: 'center' }}
          >
            <Typography 
              variant="h4" 
              sx={{ 
                color: '#4CAF50', 
                mb: 3,
                fontSize: '2rem',
                fontFamily: 'Comic Sans MS, cursive'
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
                textTransform: 'none',
                boxShadow: '0 4px 8px rgba(33, 150, 243, 0.3)'
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

export default Proximity;