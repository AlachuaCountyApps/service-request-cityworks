import { Grid, Paper, TextField, Typography } from "@mui/material";
import moment from "moment";
import { useEffect } from "react";
import ReactInputMask from "react-input-mask";

export default function CallerInformation({
  callerInformation,
  updateCallerInformation,
}) {
  return (
    <Paper elevation={2} sx={{ padding: 3, mb: 2 }}>
      <Grid
        container
        sx={{
          pt: { xs: 1, sm: 4 },
          pl: { xs: 1, sm: 4 },
          pr: { xs: 1, sm: 4 },
          pb: { xs: 3, sm: 4 },
          mt: 1,
        }}
        spacing={3}
      >
        <Grid item xs={12} sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="h4">Contact Information</Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sm={2}
          sx={{
            textAlign: "end",
            alignSelf: "center",
            color: "rgba(0, 0, 0, 0.38)",
          }}
        >
          Date:
        </Grid>
        <Grid item xs={9} sm={10} sx={{ cursor: "not-allowed" }}>
          {moment().format("MM/DD/YYYY")}
        </Grid>
        <Grid item xs={3} sm={2} sx={{ textAlign: "end", alignSelf: "center" }}>
          First Name:
        </Grid>
        <Grid item xs={9} sm={4}>
          <TextField
            id="firstName"
            name="firstName"
            value={
              callerInformation && callerInformation.has("firstName")
                ? callerInformation.get("firstName")
                : ""
            }
            onChange={(e) =>
              updateCallerInformation("firstName", e.target.value)
            }
            required={true}
            fullWidth
          />
        </Grid>
        <Grid item xs={3} sm={2} sx={{ textAlign: "end", alignSelf: "center" }}>
          Last Name:
        </Grid>
        <Grid item xs={9} sm={4}>
          <TextField
            id="lastName"
            name="lastName"
            value={
              callerInformation && callerInformation.has("lastName")
                ? callerInformation.get("lastName")
                : ""
            }
            onChange={(e) =>
              updateCallerInformation("lastName", e.target.value)
            }
            required={true}
            fullWidth
          />
        </Grid>
        <Grid item xs={3} sm={2} sx={{ textAlign: "end", alignSelf: "center" }}>
          Cell Phone Number:
        </Grid>
        <Grid item xs={9} sm={4}>
          <ReactInputMask
            mask="999 - 999 - 9999"
            value={
              callerInformation && callerInformation.has("phoneNumber")
                ? callerInformation.get("phoneNumber")
                : ""
            }
            onChange={(e) =>
              updateCallerInformation("phoneNumber", e.target.value)
            }
          >
            {() => (
              <TextField
                id="phoneNumber"
                name="phoneNumber"
                required={true}
                fullWidth
              />
            )}
          </ReactInputMask>
        </Grid>
        <Grid item xs={3} sm={2} sx={{ textAlign: "end", alignSelf: "center" }}>
          Work Phone Number:
        </Grid>
        <Grid item xs={9} sm={4}>
          <ReactInputMask
            mask="999 - 999 - 9999"
            value={
              callerInformation && callerInformation.has("workPhoneNumber")
                ? callerInformation.get("workPhoneNumber")
                : ""
            }
            onChange={(e) =>
              updateCallerInformation("workPhoneNumber", e.target.value)
            }
          >
            {() => (
              <TextField
                id="workPhoneNumber"
                name="workPhoneNumber"
                required={true}
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
            id="email"
            name="email"
            required={true}
            value={
              callerInformation && callerInformation.has("email")
                ? callerInformation.get("email")
                : ""
            }
            onChange={(e) => updateCallerInformation("email", e.target.value)}
            type="email"
            fullWidth
          />
        </Grid>
        <Grid
          item
          xs={3}
          sm={2}
          sx={{ textAlign: "end", alignSelf: "center" }}
        ></Grid>
        <Grid item xs={9} sm={4}></Grid>
        <Grid item xs={3} sm={2} sx={{ textAlign: "end", alignSelf: "center" }}>
          Address:
        </Grid>
        <Grid item xs={9} sm={10}>
          <TextField
            id="address"
            name="address"
            value={
              callerInformation && callerInformation.has("address")
                ? callerInformation.get("address")
                : ""
            }
            onChange={(e) => updateCallerInformation("address", e.target.value)}
            required={true}
            fullWidth
          />
        </Grid>
        <Grid item xs={3} sm={2} sx={{ textAlign: "end", alignSelf: "center" }}>
          Unit #:
        </Grid>
        <Grid item xs={9} sm={10}>
          <TextField
            id="unitnumber"
            name="unitnumber"
            value={
              callerInformation && callerInformation.has("unitnumber")
                ? callerInformation.get("unitnumber")
                : ""
            }
            onChange={(e) =>
              updateCallerInformation("unitnumber", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={3} sm={2} sx={{ textAlign: "end", alignSelf: "center" }}>
          City:
        </Grid>
        <Grid item xs={9} sm={4}>
          <TextField
            id="city"
            name="city"
            value={
              callerInformation && callerInformation.has("city")
                ? callerInformation.get("city")
                : ""
            }
            onChange={(e) => updateCallerInformation("city", e.target.value)}
            required={true}
            fullWidth
          />
        </Grid>
        <Grid item xs={3} sm={2} sx={{ textAlign: "end", alignSelf: "center" }}>
          State:
        </Grid>
        <Grid item xs={9} sm={4}>
          <TextField
            id="state"
            name="state"
            value={
              callerInformation && callerInformation.has("state")
                ? callerInformation.get("state")
                : ""
            }
            onChange={(e) => updateCallerInformation("state", e.target.value)}
            required={true}
            fullWidth
          />
        </Grid>
        <Grid item xs={3} sm={2} sx={{ textAlign: "end", alignSelf: "center" }}>
          Zip Code:
        </Grid>
        <Grid item xs={9} sm={10}>
          <TextField
            id="zipcode"
            name="zipcode"
            type={"number"}
            value={
              callerInformation && callerInformation.has("zipcode")
                ? callerInformation.get("zipcode")
                : ""
            }
            onChange={(e) => updateCallerInformation("zipcode", e.target.value)}
            InputProps={{ inputProps: { min: 10000, max: 99999 } }}
            required={true}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
