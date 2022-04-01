import { Grid, Typography } from '@mui/material';

import IncidentInformation from '../components/IncidentInformation';
import EmergencyContact from '../components/EmergencyContact';

export default function Step1({
  issue,
  handleIssueChange,
  questionAnswers,
  selectedAnswers,
  updateSelectedAnswers,
  building,
  setBuilding,
  additonalLocationInfo,
  setAdditonalLocationInfo,
  issueDescription,
  setIssueDescription,
  handleOpen,
}) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Typography variant='h3'>New Service Request</Typography>
        <Typography variant='caption' display='block' color='red' gutterBottom>
          (See below for Emergency Contact Information)
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <IncidentInformation
          issue={issue}
          handleIssueChange={handleIssueChange}
          questionAnswers={questionAnswers}
          selectedAnswers={selectedAnswers}
          updateSelectedAnswers={updateSelectedAnswers}
          building={building}
          setBuilding={setBuilding}
          additonalLocationInfo={additonalLocationInfo}
          setAdditonalLocationInfo={setAdditonalLocationInfo}
          issueDescription={issueDescription}
          setIssueDescription={setIssueDescription}
          handleOpen={handleOpen}
        />

        <EmergencyContact />
      </Grid>
    </Grid>
  );
}
