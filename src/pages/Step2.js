import { Grid } from "@mui/material";

import CallerInformation from "../components/CallerInformation";
import OtherContact from "../components/OtherContact";
import EmergencyContact from "../components/EmergencyContact";
import SubmitForm from "../components/SubmitForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Step2({
  domain,
  issueID,
  callerInformation,
  updateCallerInformation,
  submitRequest,
}) {
  let navigate = useNavigate();
  useEffect(() => {
    if (!domain || !issueID) navigate("/servicerequest/step1");
  }, [domain, issueID]);

  return (
    <form id="submitForm" onSubmit={submitRequest}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CallerInformation
            domain={domain}
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
        {domain === 'ACFD' && <Grid item xs={12}>
          <EmergencyContact />
        </Grid>}
      </Grid>
    </form>
  );
}
