import { Grid } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';

function App() {
  return (
    <Grid container spacing={3} sx={{ py: 6 }}>
      <Grid item xs={12} sx={{ mx: { xs: 1, md: 10, lg: 30 } }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Grid>
    </Grid>
  );
}

export default App;
