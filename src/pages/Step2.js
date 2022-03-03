import { Grid } from '@mui/material';

import CallerInformation from '../components/CallerInformation';
import OtherContact from '../components/OtherContact';
import EmergencyContact from '../components/EmergencyContact';

export default function Step2() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CallerInformation />
      </Grid>
      <Grid item xs={12}>
        <OtherContact />
      </Grid>
      <Grid item xs={12}>
        <EmergencyContact />
      </Grid>
    </Grid>
  );
}
