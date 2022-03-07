import {
  Autocomplete,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import location from '../data/location.json';
import buildings from '../data/buildings.json';
import issuesList from '../data/issue.json';
import CallerQuestionsAnswers from './CallerQuestionsAnswers';
import UserLocation from './UserLocation';
import IssueQuestionAnswers from './IssueQuestionAnswers';

function closestLocation(targetLocation, locationData) {
  function vectorDistance(dx, dy) {
    return Math.sqrt(dx * dx + dy * dy);
  }

  function locationDistance(location1, location2) {
    var dx = location1.lat - location2.lat,
      dy = location1.lng - location2.lng;

    return vectorDistance(dx, dy);
  }

  return locationData.reduce(function (prev, curr) {
    var prevDistance = locationDistance(targetLocation, prev),
      currDistance = locationDistance(targetLocation, curr);
    return prevDistance < currDistance ? prev : curr;
  });
}

export default function IncidentInformation({
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
}) {
  const [issues, setIssues] = useState([]);
  const [userLocation, setUserLocation] = useState(false);

  let navigate = useNavigate();

  const getLocation = () => {
    setUserLocation(!userLocation);
  };

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const buildingToSelect = closestLocation(
        {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        buildings
      );
      console.log('Latitude is : ', position.coords.latitude);
      console.log('Longitude is : ', position.coords.longitude);
      setBuilding(
        buildings[
          buildings.findIndex(
            (build) => build.BuildingId === buildingToSelect.BuildingId
          )
        ]
      );
    });
  };

  const submitPage1 = (e) => {
    e.preventDefault();
    navigate('/step2');
  };

  useEffect(() => {
    console.log(location.building.length);
    const tempIssues = [];

    for (const [key, value] of Object.entries(issuesList))
      if (value.length)
        value.map((element) =>
          tempIssues.push({
            label: element.issue,
            area: key,
            ProblemSid: element.ProblemSid,
          })
        );

    setIssues(tempIssues);
  }, []);

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
        >
          <Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant='h4'>Incident Information</Typography>
          </Grid>

          {userLocation && <UserLocation getUserLocation={getUserLocation} />}

          <Grid item sm={2} sx={{ display: { xs: 'none', sm: 'flex' } }}></Grid>

          <Grid
            item
            xs={2}
            sm={2}
            sx={{ textAlign: 'end', alignSelf: 'center' }}
          >
            Issue:
          </Grid>
          <Grid item xs={10} sm={4}>
            <Autocomplete
              id='issue'
              name='issue'
              options={issues}
              value={issues.length > 0 ? issue : ''}
              renderInput={(params) => <TextField {...params} required />}
              onChange={(e, newVal) => handleIssueChange(e, newVal)}
              fullWidth
            />
          </Grid>
          <Grid item sm={4} sx={{ display: { xs: 'none', sm: 'flex' } }}></Grid>

          {issue !== '' && (
            <>
              {/* <Grid
              item
              xs={4}
              sm={2}
              sx={{ textAlign: 'end', alignSelf: 'center' }}
            >
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
            </Grid> */}
            </>
          )}

          {issue !== '' && (
            <Grid container sx={{ my: 5 }}>
              <Grid
                item
                xs={12}
                sx={{
                  bgcolor: '#2e78ac',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  color: 'white',
                  p: 2,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Please answer the following questions
              </Grid>

              <Grid item xs={12}>
                <IssueQuestionAnswers
                  id={'building'}
                  index={0}
                  question={'Building:'}
                  value={building}
                  updateSelection={(newValue) => setBuilding(newValue)}
                  options={buildings}
                  getLocation={getLocation}
                  AdditionalComponent={true}
                />
              </Grid>

              <Grid item xs={12}>
                <IssueQuestionAnswers
                  index={1}
                  id={'location-info'}
                  question={'Additional Location Information:'}
                  value={additonalLocationInfo}
                  updateSelection={(newValue) =>
                    setAdditonalLocationInfo(newValue)
                  }
                  placeholder={`(Example - First Floor Women's Restroom)`}
                />
              </Grid>

              {questionAnswers.length > 0 && (
                <Grid item xs={12}>
                  <CallerQuestionsAnswers
                    count={2}
                    questionAnswers={questionAnswers}
                    selectedAnswers={selectedAnswers}
                    updateSelectedAnswers={updateSelectedAnswers}
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <IssueQuestionAnswers
                  index={2 + questionAnswers.length}
                  id={'issue-description'}
                  question={'Description of the Issue:'}
                  value={issueDescription}
                  updateSelection={(newValue) => setIssueDescription(newValue)}
                  placeholder={'(Be as detailed and specific as possible)'}
                />
              </Grid>
              <Grid item xs={12} sx={{ my: 5, textAlign: 'center' }}>
                <Button type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </form>
    </Paper>
  );
}
