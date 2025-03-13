import { useState } from 'react';
import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Similarity() {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [shapes, setShapes] = useState([
    { id: 1, type: 'circle', color: '#FF6B6B', matched: false },
    { id: 2, type: 'circle', color: '#FF6B6B', matched: false },
    { id: 3, type: 'square', color: '#4ECDC4', matched: false },
    { id: 4, type: 'square', color: '#4ECDC4', matched: false },
    { id: 5, type: 'triangle', color: '#45B7D1', matched: false },
    { id: 6, type: 'triangle', color: '#45B7D1', matched: false },
  ].sort(() => Math.random() - 0.5));

  const handleSelect = (shape) => {
    if (!selected) {
      setSelected(shape);
    } else {
      if (selected.type === shape.type && selected.id !== shape.id) {
        const updatedShapes = shapes.map(s => {
          if (s.type === shape.type) {
            return { ...s, matched: true };
          }
          return s;
        });
        setShapes(updatedShapes);
        setScore(score + 1);
        
        // Verificar si todas las figuras están emparejadas
        if (updatedShapes.every(s => s.matched)) {
          setIsCompleted(true);
        }
      }
      setSelected(null);
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

  // Add this where your game completion logic is
  const handleCompletion = () => {
    setIsCompleted(true);
  };

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h3" sx={{ mb: 3, color: '#2196f3' }}>
        Ley de la Semejanza 👯
      </Typography>

      <Typography variant="h6" sx={{ mb: 4 }}>
        ¡Encuentra las figuras que se parecen! Las cosas similares van juntas.
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h5">
          Puntos: {score} 🌟
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ maxWidth: 600, margin: 'auto' }}>
        {shapes.map((shape) => (
          <Grid item xs={4} key={shape.id}>
            <AnimatePresence>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Paper
                  elevation={3}
                  onClick={() => !shape.matched && handleSelect(shape)}
                  sx={{
                    width: 100,
                    height: 100,
                    margin: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: shape.matched ? '#e0e0e0' : shape.color,
                    cursor: shape.matched ? 'default' : 'pointer',
                    opacity: shape.matched ? 0.7 : 1,
                    border: selected?.id === shape.id ? '4px solid yellow' : 'none'
                  }}
                >
                  {shape.type === 'circle' && '⭕'}
                  {shape.type === 'square' && '⬛'}
                  {shape.type === 'triangle' && '🔺'}
                </Paper>
              </motion.div>
            </AnimatePresence>
          </Grid>
        ))}
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

export default Similarity;