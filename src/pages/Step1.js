import { Grid, Typography } from "@mui/material";

import IncidentInformation from "../components/IncidentInformation";

import EmergencyContact from "../components/EmergencyContact";

export default function Step1({
  issue,
  selectedAnswers,
  updateSelectedAnswers,
  building,
  handleBuildingChange,
  department,
  handleDepartmentChange,
  additionalLocationInfo,
  setAdditionalLocationInfo,
  issueDescription,
  setIssueDescription,
  handleOpen,
  address,
  updateSelectedAddress,
  isCountyBuildingIssue,
  handleIsCountyBuildingIssueChange,
  issues,
  handleIssueSelection,
  questions,
  answers,
  getLocation,
  userLocation,
  selectaddressonMap,
  setSelectAddressonMap,
  autocompleteData,
  setAutocompleteData,
  isLoading
}) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <Typography variant="h3">New Service Request</Typography>
        <Typography variant="caption" display="block" color="red" gutterBottom>
          (See below for Emergency Contact Information)
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <IncidentInformation
          issue={issue}
          selectedAnswers={selectedAnswers}
          updateSelectedAnswers={updateSelectedAnswers}
          building={building}
          handleBuildingChange={handleBuildingChange}
          department={department}
          handleDepartmentChange={handleDepartmentChange}
          additionalLocationInfo={additionalLocationInfo}
          setAdditionalLocationInfo={setAdditionalLocationInfo}
          issueDescription={issueDescription}
          setIssueDescription={setIssueDescription}
          handleOpen={handleOpen}
          address={address}
          updateSelectedAddress={updateSelectedAddress}
          isCountyBuildingIssue={isCountyBuildingIssue}
          handleIsCountyBuildingIssueChange={handleIsCountyBuildingIssueChange}
          issues={issues}
          handleIssueSelection={handleIssueSelection}
          questions={questions}
          answers={answers}
          getLocation={getLocation}
          userLocation={userLocation}
          selectaddressonMap={selectaddressonMap}
          setSelectAddressonMap={setSelectAddressonMap}
          autocompleteData={autocompleteData}
          setAutocompleteData={setAutocompleteData}
          isLoading={isLoading}
        />
        <EmergencyContact />
      </Grid>
    </Grid>
  );
}
