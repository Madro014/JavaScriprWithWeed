import { useState } from 'react';
import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Closure() {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  const [figures, setFigures] = useState([
    { 
      id: 1, 
      visible: true,
      url: 'https://i.pinimg.com/236x/e6/1a/21/e61a21239dff42e2d0c439f2c8fe8abd.jpg',
      name: 'Balón de futbol'
    },
    { 
      id: 2, 
      visible: true,
      url: 'https://xgfk19lpm.home.blog/wp-content/uploads/2019/11/e2f5a0bc5328689ebe044d5bdd1c6642.jpg',
      name: 'Serpiente en una rama'
    },
    { 
      id: 3, 
      visible: true,
      url: 'https://i.pinimg.com/originals/13/76/7a/13767ad6b4f7d11e3697042365c56685.png',
      name: 'Estrella'
    }
  ]);

  const handleFigureClick = (id) => {
    const updatedFigures = figures.map(figure => 
      figure.id === id ? { ...figure, visible: false } : figure
    );
    setFigures(updatedFigures);
    
    if (updatedFigures.every(figure => !figure.visible)) {
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
        Ley del Cierre ⭕
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, color: '#666', fontSize: '1rem' }}>
        ¡Tu cerebro puede completar las formas! ¿Qué figuras ves aquí?
      </Typography>

      <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
        <AnimatePresence>
          {figures.map((figure, index) => (
            figure.visible && (
              <Grid item xs={12} sm={4} key={figure.id}>
                <motion.div
                  initial={{ scale: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  
                  <Paper
                    onClick={() => handleFigureClick(figure.id)}
                    sx={{
                      width: '200px',
                      height: '200px',
                      margin: 'auto',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#fff',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        transition: 'transform 0.3s'
                      }
                    }}
                  >
                    <Box
                      component="img"
                      src={figure.url}
                      alt={figure.name}
                      sx={{
                        width: '80%',
                        height: '80%',
                        objectFit: 'contain'
                      }}
                    />
                    <Typography sx={{ mt: 2, fontSize: '0.9rem', color: '#666' }}>
                      {figure.name}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            )
          ))}
        </AnimatePresence>
      </Grid>

      {isCompleted && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ color: '#4CAF50', mb: 2 }}>
              ¡Completado! 🎉
            </Typography>
            <Typography variant="h6" sx={{ mb: 3 }}>
              ¡Excelente! Has descubierto todas las figuras.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={goToNextGame}
              sx={{ mt: 2, fontSize: '1.2rem', py: 1, px: 3 }}
            >
              Siguiente actividad ➡️
            </Button>
          </Box>
        </motion.div>
      )}
    </Box>
  );
}

export default Closure;