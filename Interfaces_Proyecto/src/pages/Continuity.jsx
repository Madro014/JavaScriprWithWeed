import { useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Continuity() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const [footsteps, setFootsteps] = useState([
    { x: 20, y: 20 },
    { x: 35, y: 30 },
    { x: 45, y: 45 },
    { x: 55, y: 55 },
    { x: 65, y: 45 },
    { x: 75, y: 30 },
    { x: 85, y: 20 }
  ]);

  const handleStepClick = (index) => {
    if (index === currentStep) {
      if (currentStep === footsteps.length - 1) {
        setIsCompleted(true);
      } else {
        setCurrentStep(currentStep + 1);
      }
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
        Ley de la Continuidad 👣
      </Typography>

      <Typography variant="h6" sx={{ 
        mb: 4, 
        color: '#666', 
        fontSize: '1.2rem',
        fontFamily: 'Comic Sans MS, cursive',
        maxWidth: '600px',
        margin: '0 auto 20px auto'
      }}>
        {currentStep === 0 
          ? "¡Hola! 👋 ¡Vamos a seguir las huellas! Haz clic en la primera huella para comenzar la aventura" 
          : currentStep < footsteps.length - 1 
            ? "¡Muy bien! 🌟 Ahora sigue el camino haciendo clic en la siguiente huella brillante" 
            : "¡Ya casi lo logras! 🎯 Dale clic a la última huella para completar el camino"}
      </Typography>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 3,
          backgroundColor: '#fff',
          position: 'relative',
          height: '300px',  // Reducida la altura
          width: '100%',
          maxWidth: '700px', // Añadido maxWidth
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Box sx={{ 
          position: 'relative', 
          width: '100%',
          height: '100%',
          transition: 'all 0.5s ease'
        }}>
          {footsteps.map((step, index) => (
            <motion.div
              key={index}
              style={{
                position: 'absolute',
                left: `${step.x}%`,
                top: `${step.y}%`,
                transform: `translate(-50%, -50%) rotate(${index % 2 ? 15 : -15}deg)`,
                cursor: index === currentStep ? 'pointer' : 'default'
              }}
              whileHover={index === currentStep ? { scale: 1.2 } : {}}
              onClick={() => handleStepClick(index)}
            >
              <Typography
                sx={{
                  fontSize: '2.8rem',
                  opacity: index <= currentStep ? 1 : 0.3,
                  color: index < currentStep ? '#4CAF50' : 
                         index === currentStep ? '#2196f3' : '#grey',
                  filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.2))',
                  userSelect: 'none'
                }}
              >
                👣
              </Typography>
            </motion.div>
          ))}
        </Box>

        {isCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff'
            }}
          >
            <Typography 
              sx={{ 
                color: '#4CAF50', 
                mb: 2,
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

export default Continuity;