import { Paper, Grid, Typography, TextField } from "@mui/material";
import ReactInputMask from "react-input-mask";

export default function CallerInformation({
  callerInformation,
  updateCallerInformation,
}) {
  return (
    <Paper elevation={2} sx={{ padding: 3, mb: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Is there anyone else we should contact for more information? If so
            provide name and contact information:
          </Typography>
        </Grid>
        <Grid item xs={3} sm={2} sx={{ textAlign: "end", alignSelf: "center" }}>
          First Name:
        </Grid>
        <Grid item xs={9} sm={4}>
          <TextField
            id="otherFirstName"
            name="otherFirstName"
            value={
              callerInformation && callerInformation.has("otherFirstName")
                ? callerInformation.get("otherFirstName")
                : ""
            }
            onChange={(e) =>
              updateCallerInformation("otherFirstName", e.target.value)
            }
            fullWidth
          />
        </Grid>

        <Grid item xs={3} sm={2} sx={{ textAlign: "end", alignSelf: "center" }}>
          Last Name:
        </Grid>
        <Grid item xs={9} sm={4}>
          <TextField
            id="otherLastName"
            name="otherLastName"
            value={
              callerInformation && callerInformation.has("otherLastName")
                ? callerInformation.get("otherLastName")
                : ""
            }
            onChange={(e) =>
              updateCallerInformation("otherLastName", e.target.value)
            }
            fullWidth
          />
        </Grid>

        <Grid item xs={3} sm={2} sx={{ textAlign: "end", alignSelf: "center" }}>
          Phone Number:
        </Grid>
        <Grid item xs={9} sm={4}>
          <ReactInputMask
            mask="999 - 999 - 9999"
            value={
              callerInformation && callerInformation.has("otherWorkPhoneNumber")
                ? callerInformation.get("otherWorkPhoneNumber")
                : ""
            }
            onChange={(e) =>
              updateCallerInformation("otherWorkPhoneNumber", e.target.value)
            }
          >
            {() => (
              <TextField
                id="otherWorkPhoneNumber"
                name="otherWorkPhoneNumber"
                fullWidth
              />
            )}
          </ReactInputMask>
        </Grid>

        <Grid item xs={3} sm={2} sx={{ textAlign: "end", alignSelf: "center" }}>
          Email:
        </Grid>
        <Grid item xs={9} sm={4}>
          <TextField
            id="otherEmail"
            name="otherEmail"
            value={
              callerInformation && callerInformation.has("otherEmail")
                ? callerInformation.get("otherEmail")
                : ""
            }
            onChange={(e) =>
              updateCallerInformation("otherEmail", e.target.value)
            }
            type={"email"}
            fullWidth
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
