import { Grid, Typography } from '@mui/material';

export default function EmergencyContact() {
  return (
    <Grid
      container
      style={{ textAlign: 'center', border: '1px solid black', padding: 10 }}
    >
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          <b>Emergency Contact - </b> Medical Emergency call 911.
          <br />
          Please call Facilities Department immediately if there is a
          life/safety issue (danger to staff or citizens) OR if an issue is
          creating imminent loss or damage to an assest such as water entering a
          building either from a roof or plumbing issue.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          Contact Facilities at <b>352-548-3759 or 213-4840 after hours</b>{' '}
          <br /> OR Facilities Manager 352-262-7123
        </Typography>
      </Grid>
    </Grid>
  );
}
