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
} from "@mui/material";
import React, { useEffect, useState } from "react";

import IssueQuestionAnswers from "./IssueQuestionAnswers";

import buildings from "../data/buildings.json";
import departments from "../data/departments.json";
import CallerQuestionAnswersNew from "./CallerQuestionAnswersNew";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import { useNavigate } from "react-router-dom";

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
  issues,
  handleIssueSelection,
  questions,
  answers,
}) {
  let navigate = useNavigate();

  const [userLocation, setUserLocation] = useState(false);
  const [selectaddressonMap, setSelectAddressonMap] = useState(false);
  const [autocompleteData, setAutocompleteData] = useState(null);

  const getLocation = () => {
    setUserLocation(!userLocation);
  };

  useEffect(() => {
    updateAddresswhenEnterManually();
  }, [autocompleteData]);

  const updateAddresswhenEnterManually = () => {
    if (autocompleteData)
      geocodeByPlaceId(autocompleteData.value.place_id)
        .then((results) => {
          const data = results[0];
          data.geometry.location.lat = results[0].geometry.location.lat();
          data.geometry.location.lng = results[0].geometry.location.lng();
          updateSelectedAddress(data);
        })
        .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (!selectaddressonMap) {
      updateAddresswhenEnterManually();
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

          {isCountyBuildingIssue && (
            <>
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
                          {selectaddressonMap && (
                            <TextField value={address.street} fullWidth />
                          )}
                          <span
                            style={{
                              display: selectaddressonMap ? "none" : "block",
                            }}
                          >
                            <GooglePlacesAutocomplete
                              apiKey={`AIzaSyBRbdKmyFU_X9r-UVmsapYMcKDJQJmQpAg`}
                              selectProps={{
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

              <Grid item container sx={{ my: 5 }}>
                {isCountyBuildingIssue === "Yes" && issue && (
                  <Grid item xs={12}>
                    <IssueQuestionAnswers
                      id={"department"}
                      index={2}
                      question={"Department:"}
                      value={department}
                      updateSelection={(newValue) =>
                        handleDepartmentChange(newValue)
                      }
                      options={departments.sort((a, b) =>
                        a > b ? 1 : b > a ? -1 : 0
                      )}
                      AdditionalComponent={true}
                      required={false}
                    />
                  </Grid>
                )}
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
                        value={additonalLocationInfo}
                        updateSelection={(newValue) =>
                          setAdditonalLocationInfo(newValue)
                        }
                        placeholder={`(Example - First Floor Women's Restroom / Closest intersection or what direction from the intersection)`}
                      />
                    </Grid>

                    <CallerQuestionAnswersNew
                      questions={questions}
                      answers={answers}
                      selectedAnswers={selectedAnswers}
                      updateSelectedAnswers={updateSelectedAnswers}
                    />

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
