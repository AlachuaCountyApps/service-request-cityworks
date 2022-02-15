import { Autocomplete, Button, Grid, TextField } from '@mui/material';

import location from '../data/location.json';

export default function IncidentInformation({ issue }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={2} sx={{ textAlign: 'end' }}>
        Description:
      </Grid>
      <Grid item xs={10}>
        {issue}
      </Grid>
      <Grid item xs={2} sx={{ textAlign: 'end', alignSelf: 'center' }}>
        Address:
      </Grid>
      <Grid item xs={10}>
        <TextField id='address' name='address' required={true} fullWidth />
      </Grid>
      <Grid item xs={2} sx={{ textAlign: 'end', alignSelf: 'center' }}>
        Unit #:
      </Grid>
      <Grid item xs={10}>
        <TextField id='unit-number' name='unit-number' required={true} />
      </Grid>
      <Grid item xs={2} sx={{ textAlign: 'end', alignSelf: 'center' }}>
        City:
      </Grid>
      <Grid item xs={4}>
        <TextField id='city' name='city' required={true} fullWidth />
      </Grid>
      <Grid item xs={2} sx={{ textAlign: 'end', alignSelf: 'center' }}>
        State:
      </Grid>
      <Grid item xs={4}>
        <TextField id='state' name='state' required={true} fullWidth />
      </Grid>
      <Grid item xs={2} sx={{ textAlign: 'end', alignSelf: 'center' }}>
        Zip Code:
      </Grid>
      <Grid item xs={10}>
        <TextField id='zipcode' name='zipcode' required={true} />
      </Grid>
      {/*   <Grid item xs={6} sx={{ textAlign: 'center' }}>
        <Button variant='contained'>Geocode</Button>
      </Grid>
      <Grid item xs={6}>
        <Button variant='contained'>Copy to Caller</Button>
      </Grid> */}
      <Grid item xs={2} sx={{ textAlign: 'end', alignSelf: 'center' }}>
        Additional Location Information:
      </Grid>
      <Grid item xs={10}>
        <TextField
          id='location-info'
          name='location-info'
          required={true}
          rows={3}
          multiline
          fullWidth
        />
      </Grid>

      <Grid item xs={2} sx={{ textAlign: 'end', alignSelf: 'center' }}>
        Department:
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          id='deparment'
          name='department'
          options={location.department}
          renderInput={(params) => <TextField {...params} />}
          fullWidth
        />
      </Grid>

      <Grid item xs={2} sx={{ textAlign: 'end', alignSelf: 'center' }}>
        Building:
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          id='building'
          name='building'
          options={location.building}
          renderInput={(params) => <TextField {...params} />}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}
