import { Grid } from '@mui/material';

import CallerInformation from '../components/CallerInformation';
import OtherContact from '../components/OtherContact';
import EmergencyContact from '../components/EmergencyContact';
import SubmitForm from '../components/SubmitForm';

export default function Step2({ submitRequest }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CallerInformation submitRequest={submitRequest} />
      </Grid>
      <Grid item xs={12}>
        <OtherContact />
      </Grid>
      <Grid item xs={12}>
        <SubmitForm />
      </Grid>
      <Grid item xs={12}>
        <EmergencyContact />
      </Grid>
    </Grid>
  );
}
