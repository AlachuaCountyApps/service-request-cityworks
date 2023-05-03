import { Button, Grid, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

export default function SubmitForm() {
  return (
    <Paper elevation={2} sx={{ padding: 3, mb: 2 }}>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ textAlign: { xs: 'center', sm: 'end' } }}
        >
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" startIcon={<ArrowBackIcon />}>
              Go Back
            </Button>
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ textAlign: { xs: 'center', sm: 'start' } }}
        >
          <Button form="submitForm" type="submit" variant="contained">
            Submit Service Request
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
