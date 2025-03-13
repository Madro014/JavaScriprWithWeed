import { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';  // Añade este import al inicio

function Home() {
  const navigate = useNavigate();  // Añade este hook
  const [open, setOpen] = useState(false);

  const MotionBox = motion(Box);

  return (
    <Box sx={{ p: 4, textAlign: 'center', backgroundColor: '#f0f9ff' }}>
      <MotionBox
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h2" sx={{ mb: 4, color: '#2196f3' }}>
          ¡Bienvenidos a las Leyes de la Gestalt!
        </Typography>
      </MotionBox>

      <Typography variant="h5" sx={{ mb: 4, color: '#4a4a4a' }}>
        ¡Descubre cómo tu cerebro es un artista que organiza todo lo que ves!
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => navigate('/similarity')}  // Esta ruta te llevará a la página de Semejanza
            sx={{
              borderRadius: '25px',
              p: 2,
              px: 6,
              fontSize: '1.4rem',
              backgroundColor: '#4CAF50',
              '&:hover': {
                backgroundColor: '#45a049'
              }
            }}
          >
            ¡Comenzar!
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => setOpen(true)}
            sx={{
              borderRadius: '25px',
              p: 2,
              fontSize: '1.2rem'
            }}
          >
            ¿Qué es la Gestalt?
          </Button>
        </motion.div>
      </Box>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        PaperProps={{
          style: {
            borderRadius: '15px',
            padding: '10px'
          }
        }}
      >
        <DialogTitle sx={{ color: '#2196f3', textAlign: 'center' }}>
          ¿Qué es la Gestalt? 🎨
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            ¡Imagina que tu cerebro es como un superhéroe que puede organizar todo lo que ves! 
            La Gestalt nos enseña los superpoderes que tiene tu mente para:
          </Typography>
          <ul>
            <li>Ver formas donde solo hay puntos 🔍</li>
            <li>Agrupar cosas parecidas 🎯</li>
            <li>Completar dibujos incompletos ✨</li>
            <li>¡Y mucho más! 🌟</li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpen(false)}
            variant="contained"
            color="secondary"
          >
            ¡Quiero aprender más! 🚀
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Home;