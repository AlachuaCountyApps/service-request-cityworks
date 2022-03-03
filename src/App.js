import { Grid } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Step1 from './pages/Step1';
import Step2 from './pages/Step2';

function App() {
  return (
    <Grid container spacing={3} sx={{ py: 6 }}>
      <Grid item xs={12} sx={{ mx: { xs: 1, md: 10, lg: 30 } }}>
        <BrowserRouter>
          <Routes>
            <Route path='/step1' element={<Step1 />} />
            <Route path='/step2' element={<Step2 />} />
          </Routes>
        </BrowserRouter>
      </Grid>
    </Grid>
  );
}

export default App;
