import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme, Box, AppBar, Toolbar, Button } from '@mui/material';
import Navigation from './components/Navigation.jsx';
import Home from './pages/Home.jsx';
import Similarity from './pages/Similarity.jsx';
import Proximity from './pages/Proximity.jsx';
import Closure from './pages/Closure.jsx';
import Continuity from './pages/Continuity.jsx';
import FigureGround from './pages/FigureGround.jsx';
import Symmetry from './pages/Symmetry.jsx';
import PastExperience from './pages/PastExperience.jsx';
import CommonMovement from './pages/CommonMovement.jsx';
import FinalActivity from './pages/FinalActivity.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#ff4081',
    },
  },
  typography: {
    fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
    h3: {
      fontWeight: 700,
      color: '#2196f3'
    },
    h6: {
      color: '#4a4a4a'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '25px',
          textTransform: 'none',
          fontSize: '1.1rem',
          padding: '10px 20px'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '15px'
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navigation /> {/* Reemplazar el bloque de AppBar por el componente Navigation */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/similarity" element={<Similarity />} />
          <Route path="/proximity" element={<Proximity />} />
          <Route path="/closure" element={<Closure />} />
          <Route path="/continuity" element={<Continuity />} />
          <Route path="/figure-ground" element={<FigureGround />} />
          <Route path="/symmetry" element={<Symmetry />} />
          <Route path="/past-experience" element={<PastExperience />} />
          <Route path="/common-movement" element={<CommonMovement />} />
          <Route path="/final-activity" element={<FinalActivity />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;