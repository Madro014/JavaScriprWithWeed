import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { motion } from 'framer-motion';

function CommonMovement() {
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const groups = [
    {
      id: 1,
      direction: { x: 100, y: 0 },
      color: '#FF5252',
      emoji: '🚗'
    },
    {
      id: 2,
      direction: { x: -100, y: 0 },
      color: '#4CAF50',
      emoji: '🚲'
    },
    {
      id: 3,
      direction: { x: 0, y: 100 },
      color: '#2196F3',
      emoji: '✈️'
    }
  ];

  const createElements = (groupId) => {
    return Array(5).fill().map((_, i) => ({
      id: `${groupId}-${i}`,
      group: groupId,
      initialX: Math.random() * 300,
      initialY: Math.random() * 300
    }));
  };

  const [elements, setElements] = useState(
    groups.flatMap(group => createElements(group.id))
  );

  const handleGroupSelect = (groupId) => {
    if (!gameStarted) return;
    setSelectedGroup(groupId);
    if (groupId === elements[0].group) {
      setScore(prev => prev + 1);
    }
  };

  const startNewRound = () => {
    setGameStarted(true);
    setSelectedGroup(null);
    setElements(groups.flatMap(group => createElements(group.id)));
  };

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h3" sx={{ mb: 3, color: '#2196f3' }}>
        Ley del Movimiento Común 🎯
      </Typography>

      <Typography variant="h6" sx={{ mb: 4 }}>
        ¡Encuentra los elementos que se mueven juntos en la misma dirección!
      </Typography>

      <Paper 
        elevation={3}
        sx={{ 
          p: 4,
          height: 400,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#f8f8f8'
        }}
      >
        {gameStarted ? (
          elements.map((element) => {
            const group = groups.find(g => g.id === element.group);
            return (
              <motion.div
                key={element.id}
                initial={{ x: element.initialX, y: element.initialY }}
                animate={{
                  x: [element.initialX, element.initialX + group.direction.x],
                  y: [element.initialY, element.initialY + group.direction.y]
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 2
                }}
                style={{
                  position: 'absolute',
                  fontSize: '2rem'
                }}
              >
                {group.emoji}
              </motion.div>
            );
          })
        ) : (
          <Typography variant="h5">
            ¡Presiona Comenzar para jugar! 🎮
          </Typography>
        )}
      </Paper>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
        {groups.map((group) => (
          <motion.div
            key={group.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="contained"
              disabled={!gameStarted}
              onClick={() => handleGroupSelect(group.id)}
              sx={{
                backgroundColor: group.color,
                '&:hover': {
                  backgroundColor: group.color
                }
              }}
            >
              Grupo {group.emoji}
            </Button>
          </motion.div>
        ))}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Puntuación: {score} ⭐
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={startNewRound}
        >
          {gameStarted ? 'Nueva ronda 🔄' : 'Comenzar 🎮'}
        </Button>
      </Box>
    </Box>
  );
}

export default CommonMovement;