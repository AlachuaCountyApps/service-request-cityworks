import { Button, Grid, TextField } from "@mui/material";
import React from "react";

export default function IncidentInformation({ issue }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={2} sx={{ textAlign: "end" }}>
        Description:
      </Grid>
      <Grid item xs={10}>
        {issue}
      </Grid>
      <Grid item xs={2} sx={{ textAlign: "end", alignSelf: "center" }}>
        Address:
      </Grid>
      <Grid item xs={10}>
        <TextField fullWidth />
      </Grid>
      <Grid item xs={2} sx={{ textAlign: "end", alignSelf: "center" }}>
        Unit #:
      </Grid>
      <Grid item xs={10}>
        <TextField />
      </Grid>
      <Grid item xs={2} sx={{ textAlign: "end", alignSelf: "center" }}>
        City:
      </Grid>
      <Grid item xs={4}>
        <TextField fullWidth />
      </Grid>
      <Grid item xs={2} sx={{ textAlign: "end", alignSelf: "center" }}>
        State:
      </Grid>
      <Grid item xs={4}>
        <TextField fullWidth />
      </Grid>
      <Grid item xs={2} sx={{ textAlign: "end", alignSelf: "center" }}>
        Zip Code:
      </Grid>
      <Grid item xs={10}>
        <TextField />
      </Grid>
      <Grid item xs={6} sx={{ textAlign: "center" }}>
        <Button variant='contained'>Geocode</Button>
      </Grid>
      <Grid item xs={6}>
        <Button variant='contained'>Copy to Caller</Button>
      </Grid>
      <Grid item xs={2} sx={{ textAlign: "end", alignSelf: "center" }}>
        Location:
      </Grid>
      <Grid item xs={10}>
        <TextField multiline />
      </Grid>
    </Grid>
  );
}
