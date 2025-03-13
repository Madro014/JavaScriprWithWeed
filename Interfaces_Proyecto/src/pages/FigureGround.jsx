import { useState } from 'react';
import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function FigureGround() {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  const [answers, setAnswers] = useState([null, null, null]);

  const images = [
    {
      url: 'https://uploads.toptal.io/blog/image/125753/toptal-blog-image-1522045559221-12e437d49472555fcc386865fbabd074.jpg',
      options: ['Un árbol', 'Un gorila y un tigre'],
      question: '¿Qué ves en esta imagen?'
    },
    {
      url: 'https://i.pinimg.com/736x/e1/34/af/e134af6fbd11d405b4904fb9e9ff3f5f.jpg',
      options: ['Un oso', 'Una botella'],
      question: '¿Qué ves en esta imagen?'
    },
    {
      url: 'https://i.pinimg.com/236x/9d/03/98/9d0398970742af9177c65e77bb211887.jpg',
      options: ['Una persona', 'Dos rostros'],
      question: '¿Qué ves en esta imagen?'
    }
  ];

  const handleAnswer = (imageIndex, answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[imageIndex] = answerIndex;
    setAnswers(newAnswers);

    if (newAnswers.every(answer => answer !== null)) {
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
        Ley de la Figura-Fondo 🎭
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, color: '#666', fontSize: '1rem' }}>
        Observa cada imagen y selecciona lo que ves
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
          alignItems: 'center'
        }}
      >
        <motion.div
          animate={isCompleted ? { scale: 0.6, y: -50 } : { scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Grid container spacing={2} justifyContent="center">
            {images.map((image, imageIndex) => (
              <Grid item xs={12} sm={6} md={4} key={imageIndex}>
                <Paper 
                  elevation={3} 
                  sx={{ 
                    p: 2,
                    backgroundColor: '#fff',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '280px',  // Reducido de 320px
                    maxWidth: '240px',   // Reducido de 280px
                    margin: 'auto',
                    borderRadius: 2
                  }}
                >
                  <Box
                    component="img"
                    src={image.url}
                    alt={`Imagen ${imageIndex + 1}`}
                    sx={{
                      width: '140px',    // Reducido de 160px
                      height: '140px',   // Reducido de 160px
                      objectFit: 'contain',
                      mb: 2,
                      filter: 'contrast(1.2)'
                    }}
                  />
                  
                  <Typography sx={{ mb: 2, fontSize: '0.9rem' }}>
                    {image.question}
                  </Typography>

                  <Box 
                    sx={{ 
                      display: 'flex', 
                      gap: 1.5, 
                      justifyContent: 'center',
                      flexDirection: 'column',
                      width: '100%',
                      mt: 'auto'
                    }}
                  >
                    {image.options.map((option, optionIndex) => (
                      <Button
                        key={optionIndex}
                        variant={answers[imageIndex] === optionIndex ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => handleAnswer(imageIndex, optionIndex)}
                        sx={{ 
                          width: '100%',
                          py: 0.75,
                          borderRadius: 1.5,
                          textTransform: 'none',
                          fontSize: '0.9rem'
                        }}
                      >
                        {option}
                      </Button>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              position: 'absolute',
              bottom: '40px',
              width: '100%',
              textAlign: 'center'
            }}
          >
            <Typography 
              sx={{ 
                color: '#4CAF50',
                mb: 2,
                fontSize: '1.8rem'
              }}
            >
              ¡Completado! 🎉
            </Typography>
            <Typography sx={{ mb: 3, color: '#666' }}>
              ¡Excelente! Has identificado diferentes perspectivas en cada imagen.
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

export default FigureGround;