import { Paper, Grid, Typography, TextField } from "@mui/material";

export default function CallerInformation({
  handleFormDataChange,
  secondaryfirstName,
  secondaryLastName,
  secondaryWorkPhone,
  secondaryEmail,
}) {
  return (
    <Paper elevation={2} sx={{ padding: 3, mb: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h6' gutterBottom>
            Is there anyone else we should contact for more information? If so
            provide name and contact information:
          </Typography>
        </Grid>
        <Grid item xs={3} sm={2} sx={{ textAlign: "end", alignSelf: "center" }}>
          First Name:
        </Grid>
        <Grid item xs={9} sm={4}>
          <TextField id='otherFirstName' name='otherFirstName' fullWidth />
        </Grid>

        <Grid item xs={3} sm={2} sx={{ textAlign: "end", alignSelf: "center" }}>
          Last Name:
        </Grid>
        <Grid item xs={9} sm={4}>
          <TextField id='otherLastName' name='otherLastName' fullWidth />
        </Grid>

        <Grid item xs={3} sm={2} sx={{ textAlign: "end", alignSelf: "center" }}>
          Phone Number:
        </Grid>
        <Grid item xs={9} sm={4}>
          <TextField
            id='otherWorkPhoneNumber'
            name='otherWorkPhoneNumber'
            type='tel'
            fullWidth
          />
        </Grid>

        <Grid item xs={3} sm={2} sx={{ textAlign: "end", alignSelf: "center" }}>
          Email:
        </Grid>
        <Grid item xs={9} sm={4}>
          <TextField id='otherEmail' name='otherEmail' type='email' fullWidth />
        </Grid>
      </Grid>
    </Paper>
  );
}
