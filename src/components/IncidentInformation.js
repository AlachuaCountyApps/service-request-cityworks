import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  CircularProgress
} from "@mui/material";
import React, { useEffect } from "react";

import IssueQuestionAnswers from "./IssueQuestionAnswers";

import buildings from "../data/buildings.json";
import departments from "../data/departments.json";
import CallerQuestionAnswers from "./CallerQuestionAnswers";
import UserLocation from './UserLocation';

import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import { useNavigate } from "react-router-dom";
import { ShowChart } from "@mui/icons-material";

function closestLocation(targetLocation, locationData) {
  console.log('targetLocation', targetLocation)
  console.log('locationData', locationData)
  
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

export default function IncidentInformationNew({
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
  isLoading,
  showAddressAlert,
  setShowAddressAlert,
  setAddress
}) {
  let navigate = useNavigate();

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
      handleBuildingChange(
        buildings[
          buildings.findIndex(
            (build) => build.BuildingId === buildingToSelect.BuildingId
          )
        ]
      );
    });
  };

  /*
    A change to autocompleteData occurs when a user manually
    enters an address in the 'Issue Location Address' AutoComplete
    text box.  xxxxxxxxxx.  When a change occurs, updateAddresswhenEnterManually
    is called.
   */
  useEffect(() => {
    updateAddresswhenEnterManually();
  }, [autocompleteData]);

  const updateAddresswhenEnterManually = () => {
    /*
      autocompleteData is by default null.  autocompleteData is set
      when a user selects an address from the 'Google TypeAhead'
    */
    if (autocompleteData) {
      /*
        geocodeByPlaceId is a 3rd party import.  geocodeByPlaceId allows
        us to get the latitude and longitude of a given address by
        place_id.  place_id is a property on the object that is generated
        by the Google Type ahead when a user selects an address
      */
      geocodeByPlaceId(autocompleteData.value.place_id)
        .then((results) => {
          const data = results[0];
          data.geometry.location.lat = results[0].geometry.location.lat();
          data.geometry.location.lng = results[0].geometry.location.lng();
          updateSelectedAddress(data);
        })
        .catch((error) => console.log(error));
    }
  };

  /*when there is a change detected in the value of
    selectaddressonMap, selectaddressonMap is evaluated
    and if false, updateAddresswhenEnterManually() is called
  */
  useEffect(() => {
    if (!selectaddressonMap) {
      updateAddresswhenEnterManually();
      setShowAddressAlert(false);
    }
    
    if (selectaddressonMap) {
      setAddress({
        StreetName: null,
        street: '',
        streetNumber: '',
        city: '',
        state: '',
        zip: '',
        county: '',
        shortAddress: '',
        lat: '',
        lng: '',
      });
      setShowAddressAlert(true);      
    }
  }, [selectaddressonMap]);

  const submitPage1 = (e) => {
    e.preventDefault();
    if (address) navigate("/servicerequest/step2");
    else alert("Issue Location Address/Building is required");
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
          display="flex"
        >
          <Grid item xs={12} sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h4">Incident Information</Typography>
          </Grid>

          {/* If the answer to the below question is 'no' then the issue 
              will be mapped to Domain 1 - Public Works.
              
              If the answer to the below question is 'yes' then the user
              will be prompted to specify the building where the issue 
              occurred 
          */}
          <Grid item xs={12} mb={3}>
            <FormControl fullWidth>
              <InputLabel id="issue-location-label">
                Is the issue related to a county building?
              </InputLabel>
              <Select
                labelId="issue-location-label"
                id="issue-location"
                value={isCountyBuildingIssue}
                label="Is the issue related to a county building?"
                onChange={handleIsCountyBuildingIssueChange}
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/*
            isCountyBuildingIssue has a default value of "", and
            therefore is truthy
          */}
          {isCountyBuildingIssue && (
            <>
              {/*
                  If the user specified that the issue occurred in a
                  county building, the user will then specify which
                  building the issue occurred.

                  Each building object has a 'Dept' property.  If the
                  value of 'Dept' is 'CritFac' then the issue will be
                  mapped to Domain 1 - Public Works, otherwise the issue
                  will be mapped to Domain 3 - Facilities
                */}
              {isCountyBuildingIssue === "Yes" && (
                <Grid item xs={12} mb={3}>
                  <IssueQuestionAnswers
                    id={"building"}
                    index={0}
                    question={"Building:"}
                    value={building}
                    updateSelection={(newValue) =>
                      handleBuildingChange(newValue)
                    }
                    options={buildings.sort((a, b) =>
                      a.label > b.label ? 1 : b.label > a.label ? -1 : 0
                    )}
                    getLocation={getLocation}
                    AdditionalComponent={true}
                  />
                </Grid>
              )}

              {/*
                  'issues' has a default value of an empty array and is
                  therefore falsy.  Dependent on where the issue occurred,
                  building vs. not building, and more specifically Domain 1
                  (Public Works) vs. Domain 3 (Facilities), the issues prop 
                  will be dynamically assigned a set of issus/problems for that
                  Domain
                */}
              {isLoading && (
                <Grid item xs={12} mb={3}>
                  <Grid container sx={{ bgcolor: "#aec4e5", p: 2 }}>
                    <p><CircularProgress /> Loading Issues....</p>
                  </Grid>
                </Grid>
              )}
              {issues && issues.length > 0 && (
                <Grid item xs={12} mb={3}>
                  <Grid container sx={{ bgcolor: "#aec4e5", p: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel id="issue-label">
                        Please Select an Issue to Report
                      </InputLabel>
                      <Select
                        labelId="issue-label"
                        id="issue"
                        value={issue}
                        label="Please Select an Issue to Report"
                        onChange={handleIssueSelection}
                      >
                        {issues.length > 0 &&
                          issues.map((issueItem, index) => (
                            <MenuItem key={index} value={issueItem}>
                              {issueItem.Description}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              )}

              {/*
                  If the user specified that the issue did not occur in a
                  county building, then the issue will be mapped to Domain 1 - 
                  Public Works.  For these issues, the user must also specify the
                  address where the issue occurred.
                */}
              {isCountyBuildingIssue === "No" && (
                <Grid item xs={12} sx={{ bgcolor: "#aec4e5", p: 2 }}>
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      sx={{
                        alignSelf: "center",

                        fontWeight: "bold",
                        my: { xs: 2 },
                      }}
                    >
                      Issue Location Address:
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={8}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={8}>
                          {/*
                          selectaddressonMap is false by default.  When the user clicks
                          the green button labeled 'SET ISSUE LOCATION 
                          ON MAP', selectaddressonMap is set to true.
                          */}

                          {/*
                            shown when selectaddressonMap is true
                          */}
                          {selectaddressonMap && (
                            <>
                            <TextField value={address.street} fullWidth />
                            <FormHelperText sx={{ color: "red" }}>
                              {showAddressAlert && "Please verify that address is accurate."}
                            </FormHelperText>
                            </>
                          )}

                          {/*
                            shown when selectedaddressonMap is false (Google Maps Type Ahead)
                          */}
                          <span
                            style={{
                              display: selectaddressonMap ? "none" : "block",
                            }}
                          >
                            {/*
                              This is what creates changes in the state variable autoCompleteData.
                              This is what causes the event hook, based on changes to autoCompleteData
                              to fire.
                            */}
                            <GooglePlacesAutocomplete
                              apiKey={`AIzaSyBRbdKmyFU_X9r-UVmsapYMcKDJQJmQpAg`}
                              selectProps={{
                                defaultInputValue:
                                  autocompleteData && autocompleteData.label,
                                autocompleteData,
                                onChange: setAutocompleteData,
                              }}
                            />
                            <FormHelperText sx={{ color: "red" }}>
                              {!autocompleteData && "Required"}
                            </FormHelperText>
                          </span>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          sx={{ alignSelf: "center", textAlign: "center" }}
                        >
                          {/*
                          When the user clicks the green button labeled 'SET ISSUE LOCATION 
                          ON MAP', selectaddressonMap is set to true and handleOpen()
                          is called.  handleOpen() is defined in App.js.  App.js defines
                          an 'open' prop which is set to true.  When 'open' is true, a
                          modal containing a custom map component is displayed.

                          When the user clicks the green button labeled 'SET ISSUE LOCATION 
                          MANUALLY', selectaddressonMap is set to false.
                          */}
                          {!selectaddressonMap ? (
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => {
                                setSelectAddressonMap(true);
                                handleOpen();
                              }}
                            >
                              Set Issue Location on Map
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => {
                                setSelectAddressonMap(false);
                              }}
                            >
                              Set Issue Location Manually
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {userLocation && <UserLocation getUserLocation={getUserLocation} />}

              <Grid item container sx={{ my: 5 }}>
                
                {/*
                    Additional Location Information.
                    Displayed if the issue occurred in a building, and the issue as well as
                    building have been specified
                    Or the issue did not occur in a building but address has been specified and a
                    latitude was able to retrieved via Google GeoCode.
                  */}
                {(issue && isCountyBuildingIssue === "Yes" && building) ||
                (issue &&
                  isCountyBuildingIssue === "No" &&
                  address &&
                  address.lat) ? (
                  <>
                    <Grid item xs={12}>
                      <IssueQuestionAnswers
                        index={2}
                        id={"location-info"}
                        question={"Additional Location Information:"}
                        value={additionalLocationInfo}
                        updateSelection={(newValue) =>
                          setAdditionalLocationInfo(newValue)
                        }
                        placeholder={`(Example - First Floor Women's Restroom / Closest intersection or what direction from the intersection)`}
                      />
                    </Grid>

                    {/*
                      Questions and answers specific to the selected issue
                    */}
                    <CallerQuestionAnswers
                      questions={questions}
                      answers={answers}
                      selectedAnswers={selectedAnswers}
                      updateSelectedAnswers={updateSelectedAnswers}
                    />

                    {/*
                      Description of the  Issue
                    */}
                    <Grid item xs={12}>
                      <IssueQuestionAnswers
                        id={"issue-description"}
                        question={"Description of the Issue:"}
                        value={issueDescription}
                        updateSelection={(newValue) =>
                          setIssueDescription(newValue)
                        }
                        placeholder={
                          "(Be as detailed and specific as possible)"
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sx={{ my: 5, textAlign: "center" }}>
                      <Button type="submit" variant="contained">
                        Next
                      </Button>
                    </Grid>
                  </>
                ) : null}
              </Grid>
            </>
          )}

          {isCountyBuildingIssue === "Yes" && (
            <>
              {building && (
                <>{issue && <Grid item container sx={{ my: 5 }}></Grid>}</>
              )}
            </>
          )}
        </Grid>
      </form>
    </Paper>
  );
}
