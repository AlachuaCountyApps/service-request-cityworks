import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import IssueQuestionAnswers from './IssueQuestionAnswers';

import buildings from '../data/buildings.json';

export default function IncidentInformationNew({
  issue,
  handleIssueChange,
  questionAnswers,
  selectedAnswers,
  updateSelectedAnswers,
  building,
  handleBuildingChange,
  department,
  handleDepartmentChange,
  additonalLocationInfo,
  setAdditonalLocationInfo,
  issueDescription,
  setIssueDescription,
  handleOpen,
  address,
  updateSelectedAddress,
  isCountyBuildingIssue,
  handleIsCountyBuildingIssueChange,
}) {
  const [userLocation, setUserLocation] = useState(false);

  const getLocation = () => {
    setUserLocation(!userLocation);
  };

  const submitPage1 = (e) => {
    e.preventDefault();
  };

  return (
    <Paper elevation={2} sx={{ padding: 3, mb: 2 }}>
      <form onSubmit={submitPage1}>
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
          display='flex'
        >
          <Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant='h4'>Incident Information</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id='issue-location-label'>
                Is the issue related to a county building?
              </InputLabel>
              <Select
                labelId='issue-location-label'
                id='issue-location'
                value={isCountyBuildingIssue}
                label='Is the issue related to a county building?'
                onChange={handleIsCountyBuildingIssueChange}
              >
                <MenuItem value={'Yes'}>Yes</MenuItem>
                <MenuItem value={'No'}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {isCountyBuildingIssue === 'Yes' && (
            <Grid item xs={12}>
              <IssueQuestionAnswers
                id={'building'}
                index={0}
                question={'Building:'}
                value={building}
                updateSelection={(newValue) => handleBuildingChange(newValue)}
                options={buildings.sort((a, b) =>
                  a.label > b.label ? 1 : b.label > a.label ? -1 : 0
                )}
                getLocation={getLocation}
                AdditionalComponent={true}
              />
            </Grid>
          )}
        </Grid>
      </form>
    </Paper>
  );
}
