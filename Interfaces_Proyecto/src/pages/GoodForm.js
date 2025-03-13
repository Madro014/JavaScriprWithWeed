import { useState } from 'react';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';

function GoodForm() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);

  const levels = [
    {
      id: 1,
      pattern: ['⭕', '⭕', '❓', '⭕', '⭕'],
      options: ['⭕', '⬛', '🔺'],
      correct: 0,
      hint: '¡Busca el patrón más simple!'
    },
    {
      id: 2,
      pattern: ['⬛', '⬛', '⬛', '❓', '⬛'],
      options: ['⭕', '⬛', '🔺'],
      correct: 1,
      hint: '¿Qué forma completa mejor la secuencia?'
    },
    {
      id: 3,
      pattern: ['🔺', '🔺', '🔺', '❓', '🔺'],
      options: ['⭕', '⬛', '🔺'],
      correct: 2,
      hint: 'Nuestro cerebro prefiere formas simples y completas'
    }
  ];

  const handleChoice = (choiceIndex) => {
    if (choiceIndex === levels[currentLevel].correct) {
      setScore(score + 1);
    }
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
    }
  };

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h3" sx={{ mb: 3, color: '#2196f3' }}>
        Ley de la Buena Forma ✨
      </Typography>

      <Typography variant="h6" sx={{ mb: 4 }}>
        ¡Nuestro cerebro prefiere las formas simples y ordenadas!
      </Typography>

      {currentLevel < levels.length ? (
        <>
          <Paper 
            elevation={3}
            sx={{ 
              p: 4, 
              mb: 4, 
              backgroundColor: '#f8f8f8'
            }}
          >
            <Typography variant="h6" sx={{ mb: 3, color: '#666' }}>
              {levels[currentLevel].hint}
            </Typography>

            <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
              {levels[currentLevel].pattern.map((item, index) => (
                <Grid item key={index}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Typography variant="h2">
                      {item}
                    </Typography>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
              {levels[currentLevel].options.map((option, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Paper
                    elevation={2}
                    onClick={() => handleChoice(index)}
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      width: 80,
                      height: 80,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant="h3">
                      {option}
                    </Typography>
                  </Paper>
                </motion.div>
              ))}
            </Box>
          </Paper>

          <Typography variant="h6">
            Puntuación: {score} de {levels.length} ⭐
          </Typography>
        </>
      ) : (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            ¡Felicitaciones! 🎉
          </Typography>
          <Typography variant="h5">
            Puntuación final: {score} de {levels.length}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={() => {
              setCurrentLevel(0);
              setScore(0);
            }}
          >
            Jugar otra vez 🔄
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default GoodForm;