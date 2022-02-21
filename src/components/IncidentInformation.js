import {
  Autocomplete,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import location from '../data/location.json';
import issuesList from '../data/issue.json';
import CallerQuestionsAnswers from './CallerQuestionsAnswers';
import UserLocation from './UserLocation';

export default function IncidentInformation({
  issue,
  handleIssueChange,
  questionAnswers,
  selectedAnswers,
  updateSelectedAnswers,
}) {
  const [issues, setIssues] = useState([]);
  const [userLocation, setUserLocation] = useState(false);

  const getLocation = () => {
    setUserLocation(!userLocation);
  };

  useEffect(() => {
    console.log(location.building.length);
    const tempIssues = [];

    for (const [key, value] of Object.entries(issuesList))
      if (value.length)
        value.map((element) =>
          tempIssues.push({ label: element.issue, area: key })
        );

    setIssues(tempIssues);
  }, []);

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
        <Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant='h4'>Incident Information</Typography>
        </Grid>

        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Button variant='contained' onClick={getLocation}>
            Get Location
          </Button>
        </Grid>

        {userLocation && <UserLocation />}

        <Grid item xs={4} sm={2} sx={{ textAlign: 'end', alignSelf: 'center' }}>
          Department:
        </Grid>
        <Grid item xs={8} sm={4}>
          <Autocomplete
            id='deparment'
            name='department'
            options={location.department}
            renderInput={(params) => <TextField {...params} />}
            fullWidth
          />
        </Grid>

        <Grid item xs={4} sm={2} sx={{ textAlign: 'end', alignSelf: 'center' }}>
          Building:
        </Grid>
        <Grid item xs={8} sm={4}>
          <Autocomplete
            id='building'
            name='building'
            options={location.building}
            renderInput={(params) => <TextField {...params} />}
            fullWidth
          />
        </Grid>

        <Grid item xs={4} sm={2} sx={{ textAlign: 'end', alignSelf: 'center' }}>
          Additional Location Information:
        </Grid>
        <Grid item xs={8} sm={10}>
          <TextField
            id='location-info'
            name='location-info'
            required={true}
            rows={3}
            multiline
            fullWidth
          />
        </Grid>

        <Grid item xs={4} sm={2}></Grid>
        <Grid item xs={8} sm={10} style={{ paddingTop: 0 }}>
          <Typography
            variant='caption'
            display='block'
            color='red'
            gutterBottom
          >
            (Example - 1<sup>st</sup> Floor Women's Restroom)
          </Typography>
        </Grid>

        <Grid item xs={4} sm={2} sx={{ textAlign: 'end', alignSelf: 'center' }}>
          Issue:
        </Grid>
        <Grid item xs={8} sm={4}>
          <Autocomplete
            id='building'
            name='building'
            options={issues}
            renderInput={(params) => <TextField {...params} />}
            onChange={(e, newVal) => handleIssueChange(e, newVal)}
            fullWidth
          />
        </Grid>

        {issue !== '' && questionAnswers.length > 0 && (
          <>
            <Grid item xs={12}>
              <CallerQuestionsAnswers
                questionAnswers={questionAnswers}
                selectedAnswers={selectedAnswers}
                updateSelectedAnswers={updateSelectedAnswers}
              />
            </Grid>

            <Grid
              item
              xs={4}
              sm={2}
              sx={{ textAlign: 'end', alignSelf: 'center' }}
            >
              Description of the Issue:
            </Grid>
            <Grid item xs={8} sm={10}>
              <TextField
                id='issue-description'
                name='issue-description'
                required={true}
                rows={3}
                multiline
                fullWidth
              />
            </Grid>

            <Grid item xs={4} sm={2}></Grid>
            <Grid item xs={8} sm={10} style={{ paddingTop: 0 }}>
              <Typography
                variant='caption'
                display='block'
                color='red'
                gutterBottom
              >
                (Be as detailed and specific as possible)
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    </Paper>
  );
}
