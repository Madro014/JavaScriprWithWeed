import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

function Navigation() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#2196f3' }}>
      <Toolbar sx={{ gap: 2, overflowX: 'auto', flexWrap: 'nowrap' }}>
        <Button color="inherit" component={Link} to="/">Inicio</Button>
        <Button color="inherit" component={Link} to="/similarity">Semejanza</Button>
        <Button color="inherit" component={Link} to="/proximity">Proximidad</Button>
        <Button color="inherit" component={Link} to="/closure">Cierre</Button>
        <Button color="inherit" component={Link} to="/continuity">Continuidad</Button>
        <Button color="inherit" component={Link} to="/figure-ground">Figura-Fondo</Button>
        <Button color="inherit" component={Link} to="/symmetry">Simetría</Button>
        <Button color="inherit" component={Link} to="/past-experience">Experiencia Pasada </Button>
        <Button color="inherit" component={Link} to="/final-activity">Actividad Final</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;