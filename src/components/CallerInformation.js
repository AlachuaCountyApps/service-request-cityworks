import { Grid, TextField, Typography } from '@mui/material';
import moment from 'moment';

export default function CallerInformation() {
  return (
    <Grid
      container
      sx={{
        borderStyle: 'solid',
        borderRadius: 4,
        borderWidth: 2,
        pt: { xs: 1, sm: 4 },
        pl: { xs: 1, sm: 4 },
        pr: { xs: 1, sm: 4 },
        pb: { xs: 3, sm: 4 },
        mt: 1,
      }}
      spacing={3}
    >
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Typography variant='h4'>Your Information</Typography>
      </Grid>
      <Grid
        item
        xs={3}
        sm={2}
        sx={{
          textAlign: 'end',
          alignSelf: 'center',
          color: 'rgba(0, 0, 0, 0.38)',
        }}
      >
        Date:
      </Grid>
      <Grid item xs={9} sm={10} sx={{ cursor: 'not-allowed' }}>
        {moment().format('MM/DD/YYYY')}
      </Grid>
      <Grid item xs={3} sm={2} sx={{ textAlign: 'end', alignSelf: 'center' }}>
        First Name:
      </Grid>
      <Grid item xs={9} sm={4}>
        <TextField id='firstName' name='firstName' required={true} fullWidth />
      </Grid>
      <Grid item xs={3} sm={2} sx={{ textAlign: 'end', alignSelf: 'center' }}>
        Last Name:
      </Grid>
      <Grid item xs={9} sm={4}>
        <TextField id='lastName' name='lastName' required={true} fullWidth />
      </Grid>
      <Grid item xs={3} sm={2} sx={{ textAlign: 'end', alignSelf: 'center' }}>
        Phone Number:
      </Grid>
      <Grid item xs={9} sm={4}>
        <TextField
          id='phoneNumber'
          name='phoneNumber'
          required={true}
          fullWidth
        />
      </Grid>
      <Grid item xs={3} sm={2} sx={{ textAlign: 'end', alignSelf: 'center' }}>
        Email:
      </Grid>
      <Grid item xs={9} sm={4}>
        <TextField id='email' name='email' required={true} fullWidth />
      </Grid>
      <Grid item xs={3} sm={2} sx={{ textAlign: 'end', alignSelf: 'center' }}>
        Address:
      </Grid>
      <Grid item xs={9} sm={10}>
        <TextField id='address' name='address' required={true} fullWidth />
      </Grid>
      <Grid item xs={3} sm={2} sx={{ textAlign: 'end', alignSelf: 'center' }}>
        Unit #:
      </Grid>
      <Grid item xs={9} sm={10}>
        <TextField id='unit-number' name='unit-number' required={true} />
      </Grid>
      <Grid item xs={3} sm={2} sx={{ textAlign: 'end', alignSelf: 'center' }}>
        City:
      </Grid>
      <Grid item xs={9} sm={4}>
        <TextField id='city' name='city' required={true} fullWidth />
      </Grid>
      <Grid item xs={3} sm={2} sx={{ textAlign: 'end', alignSelf: 'center' }}>
        State:
      </Grid>
      <Grid item xs={9} sm={4}>
        <TextField id='state' name='state' required={true} fullWidth />
      </Grid>
      <Grid item xs={3} sm={2} sx={{ textAlign: 'end', alignSelf: 'center' }}>
        Zip Code:
      </Grid>
      <Grid item xs={9} sm={10}>
        <TextField id='zipcode' name='zipcode' required={true} />
      </Grid>
    </Grid>
  );
}
