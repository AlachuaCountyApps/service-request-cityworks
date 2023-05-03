import { Grid, Paper, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Success() {
  let navigate = useNavigate();
  let location = useLocation();

  const navigateUser = () => {
    navigate('/step1');
  };

  useEffect(() => {
    if (!location.state.status && !location.state.requestID) navigateUser();
  }, []);

  return (
    <Paper elevation={2} sx={{ padding: 3, mb: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Typography sx={{ color: 'green' }} variant="h3">
            Success
          </Typography>
          <Grid item xs={12} sx={{ my: 4 }}>
            <Typography variant="h5">
              Request ID: {location.state.requestID}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Please save the request ID for your records
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
