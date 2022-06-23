import { Grid } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Geocode from "react-geocode";

import Step1 from "./pages/Step1";
import Step2 from "./pages/Step2";

import buildings from "./data/buildings.json";
import problemAreaData from "./data/problemArea.json";
import questionsandAnswers from "./data/callerQuestions&Answers.json";
import Success from "./pages/Success";
import Map from "./components/Map";

import "./App.css";

const googleKey = `AIzaSyBRbdKmyFU_X9r-UVmsapYMcKDJQJmQpAg`;

Geocode.setApiKey(googleKey);
Geocode.setLocationType("ROOFTOP");

function App() {
  const [isCountyBuildingIssue, setIsCountyBuildingIssue] = useState("");

  const [domain, setDomain] = useState("");
  const [domainID, setDomainID] = useState();
  const [problemArea, setProblemArea] = useState("");
  const [issue, setIssue] = useState("");
  const [issueID, setIssueID] = useState();
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedAnswersText, setSelectedAnswersText] = useState({});
  const [building, setBuilding] = useState("");
  const [department, setDepartment] = useState("");
  const [additonalLocationInfo, setAdditonalLocationInfo] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [address, setAddress] = useState({
    StreetName: null,
    street: "",
    streetNumber: "",
    city: "",
    zip: "",
    county: "",
    shortAddress: "",
    lat: "",
    lng: "",
  });
  const [open, setOpen] = useState(false);

  const handleIsCountyBuildingIssueChange = (e) => {
    setIsCountyBuildingIssue(e.target.value);
  };

  const handleAddressChange = (addressObj) => {
    const buildingToSelect =
      buildings[
        buildings.findIndex(
          (build) =>
            build.Address ===
            addressObj.streetNumber + " " + addressObj.shortAddress
        )
      ];
    if (buildingToSelect) handleBuildingChange(buildingToSelect);
    else {
      handleBuildingChange({
        BuildingId: "Other",
        label: "Other (Not a County Building)",
        Address: "Other",
        City: "Other",
        State: "Other",
        Zip: "Other",
        Dept: "Other",
      });
      handleDepartmentChange("Other (Explain under Description of Issue)");
    }
    setAddress(addressObj);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = (e, reason) => {
    if (reason !== "backdropClick") setOpen(false);
  };

  let navigate = useNavigate();

  const handleIssueChange = (e, newVal) => {
    setSelectedAnswers({});
    if (newVal) {
      setIssue(newVal.label);
      setIssueID(newVal.ProblemSid);
      setProblemArea(newVal.area);
      for (const [key, value] of Object.entries(problemAreaData))
        if (value.domainAreas.find((x) => x === newVal.area)) {
          setDomain(key);
          setDomainID(value.id);
        }
      if (
        questionsandAnswers[newVal.area] &&
        questionsandAnswers[newVal.area][[newVal.label]]
      )
        setQuestionAnswers(questionsandAnswers[newVal.area][newVal.label]);
    } else {
      setIssue("");
      setProblemArea("");
      setQuestionAnswers([]);
    }
  };

  const updateSelectedAnswers = (index, e, answers) => {
    setSelectedAnswers((prevVal) => ({
      ...prevVal,
      [index]: e.target.value,
    }));
    setSelectedAnswersText((prevVal) => ({
      ...prevVal,
      [e.target.value]: answers.find((element) => element.id === e.target.value)
        .text,
    }));
  };

  const handleBuildingChange = (val) => {
    console.log(val);
    setBuilding(val);
  };

  const handleDepartmentChange = (val) => {
    setDepartment(val);
  };

  const getStreetName = (street) => {
    if (street)
      if (
        street.toUpperCase() === "SW" ||
        street.toUpperCase() === "SOUTH WEST"
      )
        return "South West";
    if (street.toUpperCase() === "SE" || street.toUpperCase() === "SOUTH EAST")
      return "South East";
    if (street.toUpperCase() === "NW" || street.toUpperCase() === "NORTH WEST")
      return "North West";
    if (street.toUpperCase() === "NE" || street.toUpperCase() === "NORTH EAST")
      return "North East";
    if (
      street.toUpperCase() === "NC" ||
      street.toUpperCase() === "NORTH CENTRAL"
    )
      return "North Central";
    if (
      street.toUpperCase() === "SC" ||
      street.toUpperCase() === "SOUTH CENTRAL"
    )
      return "South Central";
    return null;
  };

  const updateSelectedAddress = (data) => {
    const addressObj = {};
    addressObj.lat = data.geometry.location.lat;
    addressObj.lng = data.geometry.location.lng;
    addressObj.street = data.formatted_address;
    for (let i = 0; i < data.address_components.length; i++) {
      for (let j = 0; j < data.address_components[i].types.length; j++) {
        switch (data.address_components[i].types[j]) {
          case "locality":
            addressObj.city = data.address_components[i].long_name;
            break;
          case "administrative_area_level_2":
            addressObj.county = data.address_components[i].long_name;
            break;
          case "postal_code":
            addressObj.zip = data.address_components[i].long_name;
            break;
          case "route":
            addressObj.shortAddress = data.address_components[i].short_name;
            addressObj.StreetName = getStreetName(
              data.address_components[i].short_name.substring(
                0,
                data.address_components[i].short_name.indexOf(" ")
              )
            );
            break;
          case "street_number":
            addressObj.streetNumber = data.address_components[i].long_name;
            break;
          default:
            break;
        }
      }
    }
    handleAddressChange(addressObj);
    console.log(addressObj);
  };

  const convertAnswersToAnswers = () => {
    const answersArray = [];
    Object.entries(selectedAnswersText).forEach(([key, value]) => {
      answersArray.push({ [key]: value });
    });
    return answersArray;
  };

  const convertQuestionAnswerstoString = () => {
    let result = "";
    questionAnswers.forEach((element) => {
      result +=
        element.question.text +
        ": " +
        selectedAnswersText[selectedAnswers[element.question.id]] +
        ". ";
    });
    return result;
  };

  const submitRequest = (e) => {
    e.preventDefault();

    const data = {
      ProblemSid: issueID,
      Details: issueDescription + ". " + convertQuestionAnswerstoString(),
      Comments:
        issue +
        ": " +
        issueDescription +
        ". " +
        convertQuestionAnswerstoString(),
      Address: address.streetNumber + " " + address.shortAddress,
      City: address.city,
      State: "Florida",
      Zip: address.zip,
      Landmark:
        building.label && building.label.includes("Other")
          ? null
          : building.label,
      District: address.StreetName,
      Location:
        department && department.includes("Other")
          ? additonalLocationInfo
          : department + " " + additonalLocationInfo,
      X: address.lat,
      Y: address.lng,
      CallerType: "Visitor",
      CallerFirstName: e.target.firstName.value,
      CallerLastName: e.target.lastName.value,
      CallerAddress: e.target.address.value,
      CallerAptNum: e.target.unitnumber.value,
      CallerCity: e.target.city.value,
      CallerState: e.target.state.value,
      CallerZip: e.target.zipcode.value,
      CallerWorkPhone: e.target.workPhoneNumber.value.replace(/[^0-9]/gi, ""),
      CallerCellPhone: e.target.phoneNumber.value.replace(/[^0-9]/gi, ""),
      CallerOtherPhone:
        e.target.otherWorkPhoneNumber.value &&
        e.target.otherWorkPhoneNumber.value.replace(/[^0-9]/gi, ""),
      CallerEmail: e.target.email.value,
      CallerComments: `Other Contact: ${e.target.otherFirstName.value} ${e.target.otherLastName.value}, Email: ${e.target.otherEmail.value}`,
      Answers: convertAnswersToAnswers(),
      GeocodeAddress: true, // Use the first result from the geocode service with the HIGHEST SCORE to update Address, City, State, Zip, MapPage, TileNo, Shop, District and XY values. Ignored if a valid XY is provided.
    };

    console.log(data);

    axios
      .post("http://localhost:7010/submitRequest", data)
      .then((response) => {
        console.log(response);
        navigate("/servicerequest/success", {
          state: { status: true, requestID: response.data },
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Map
        open={open}
        handleClose={handleClose}
        address={address}
        updateSelectedAddress={updateSelectedAddress}
        Geocode={Geocode}
      />
      <Grid container spacing={3} sx={{ py: 6 }}>
        <Grid item xs={12} sx={{ mx: { xs: 1 } }}>
          <Routes>
            <Route
              path="servicerequest/step1"
              element={
                <Step1
                  domain={domain}
                  issue={issue}
                  handleIssueChange={handleIssueChange}
                  questionAnswers={questionAnswers}
                  selectedAnswers={selectedAnswers}
                  updateSelectedAnswers={updateSelectedAnswers}
                  building={building}
                  handleBuildingChange={handleBuildingChange}
                  department={department}
                  handleDepartmentChange={handleDepartmentChange}
                  additonalLocationInfo={additonalLocationInfo}
                  setAdditonalLocationInfo={setAdditonalLocationInfo}
                  issueDescription={issueDescription}
                  setIssueDescription={setIssueDescription}
                  handleOpen={handleOpen}
                  address={address}
                  updateSelectedAddress={updateSelectedAddress}
                  isCountyBuildingIssue={isCountyBuildingIssue}
                  handleIsCountyBuildingIssueChange={
                    handleIsCountyBuildingIssueChange
                  }
                />
              }
            />
            <Route
              path="servicerequest/step2"
              element={<Step2 submitRequest={submitRequest} />}
            />
            <Route path="servicerequest/success" element={<Success />} />
          </Routes>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
