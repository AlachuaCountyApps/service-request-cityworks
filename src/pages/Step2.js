import { Grid } from "@mui/material";

import CallerInformation from "../components/CallerInformation";
import OtherContact from "../components/OtherContact";
import EmergencyContact from "../components/EmergencyContact";
import SubmitForm from "../components/SubmitForm";

export default function Step2({
  callerInformation,
  updateCallerInformation,
  submitRequest,
}) {
  return (
    <form id="submitForm" onSubmit={submitRequest}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CallerInformation
            callerInformation={callerInformation}
            updateCallerInformation={updateCallerInformation}
            submitRequest={submitRequest}
          />
        </Grid>
        <Grid item xs={12}>
          <OtherContact
            callerInformation={callerInformation}
            updateCallerInformation={updateCallerInformation}
          />
        </Grid>
        <Grid item xs={12}>
          <SubmitForm />
        </Grid>
        <Grid item xs={12}>
          <EmergencyContact />
        </Grid>
      </Grid>
    </form>
  );
}
