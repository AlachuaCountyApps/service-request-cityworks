import { Grid } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Geocode from 'react-geocode';

import Step1 from './pages/Step1';
import Step2 from './pages/Step2';

import buildings from './data/buildings.json';
import problemAreaData from './data/problemArea.json';
import questionsandAnswers from './data/callerQuestions&Answers.json';
import Success from './pages/Success';
import Map from './components/Map';

import './App.css';

const googleKey = `AIzaSyBRbdKmyFU_X9r-UVmsapYMcKDJQJmQpAg`;

Geocode.setApiKey(googleKey);
Geocode.setLocationType('ROOFTOP');

function App() {
  const [domain, setDomain] = useState('');
  const [domainID, setDomainID] = useState();
  const [problemArea, setProblemArea] = useState('');
  const [issue, setIssue] = useState('');
  const [issueID, setIssueID] = useState();
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedAnswersText, setSelectedAnswersText] = useState({});
  const [building, setBuilding] = useState('');
  const [department, setDepartment] = useState('');
  const [additonalLocationInfo, setAdditonalLocationInfo] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    zip: '',
    county: '',
    shortAddress: '',
    streetNumber: '',
  });
  const [open, setOpen] = useState(false);

  const handleAddressChange = (addressObj) => {
    const buildingToSelect =
      buildings[
        buildings.findIndex(
          (build) =>
            build.Address ===
            addressObj.streetNumber + ' ' + addressObj.shortAddress
        )
      ];
    if (buildingToSelect) handleBuildingChange(buildingToSelect);
    else {
      handleBuildingChange({
        BuildingId: 'Other',
        label: 'Other (Not a County Building)',
        Address: 'Other',
        City: 'Other',
        State: 'Other',
        Zip: 'Other',
        Dept: 'Other',
      });
      handleDepartmentChange('Other (Explain under Description of Issue)');
    }
    setAddress(addressObj);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = (e, reason) => {
    if (reason !== 'backdropClick') setOpen(false);
  };

  let navigate = useNavigate();

  const handleIssueChange = (e, newVal) => {
    setSelectedAnswers({});
    if (newVal) {
      console.log(newVal);
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
      setIssue('');
      setProblemArea('');
      setQuestionAnswers([]);
    }
  };

  const updateSelectedAnswers = (index, e, answers) => {
    console.log(answers);
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
    setBuilding(val);
  };

  const handleDepartmentChange = (val) => {
    setDepartment(val);
  };

  const updateSelectedAddress = (data) => {
    const addressObj = {};
    addressObj.lat = data.geometry.location.lat;
    addressObj.lng = data.geometry.location.lng;
    addressObj.street = data.formatted_address;
    for (let i = 0; i < data.address_components.length; i++) {
      for (let j = 0; j < data.address_components[i].types.length; j++) {
        switch (data.address_components[i].types[j]) {
          case 'locality':
            addressObj.city = data.address_components[i].long_name;
            break;
          case 'administrative_area_level_2':
            addressObj.county = data.address_components[i].long_name;
            break;
          case 'postal_code':
            addressObj.zip = data.address_components[i].long_name;
            break;
          case 'route':
            addressObj.shortAddress = data.address_components[i].short_name;
            break;
          case 'street_number':
            addressObj.streetNumber = data.address_components[i].long_name;
            break;
          default:
            break;
        }
      }
    }
    handleAddressChange(addressObj);
  };

  const submitRequest = (e) => {
    e.preventDefault();
    console.log(e.target.length);
    console.log(e.target.firstName.value);
    console.log(e.target.lastName.value);
    console.log(e.target.phoneNumber.value);
    console.log(e.target.email.value);
    console.log(e.target.address.value);
    console.log(e.target.unitnumber.value);
    console.log(e.target.city.value);
    console.log(e.target.state.value);
    console.log(e.target.zipcode.value);
    console.log(e.target.otherFirstName.value);
    console.log(e.target.otherLastName.value);
    console.log(e.target.otherWorkPhoneNumber.value);
    console.log(e.target.otherEmail.value);

    const data = {
      ProblemSid: issueID,
      Details: issueDescription,
      Comments: additonalLocationInfo,
      Address: building.Address,
      City: building.City,
      State: building.State,
      Zip: building.Zip,
      Landmark: building.label,
      Location: building.Dept,
      X: building.lat,
      Y: building.lng,
      CallerType: 'Visitor',
      CallerFirstName: e.target.firstName.value,
      CallerLastName: e.target.lastName.value,
      CallerAddress: e.target.address.value,
      CallerAptNum: e.target.unitnumber.value,
      CallerCity: e.target.city.value,
      CallerState: e.target.state.value,
      CallerZip: e.target.zipcode.value,
      CallerHomePhone: e.target.phoneNumber.value.replace(/[^0-9]/gi, ''),
      CallerWorkPhone: e.target.phoneNumber.value.replace(/[^0-9]/gi, ''),
      CallerCellPhone: e.target.phoneNumber.value.replace(/[^0-9]/gi, ''),
      CallerOtherPhone: e.target.phoneNumber.value.replace(/[^0-9]/gi, ''),
      CallerFax: e.target.phoneNumber.value.replace(/[^0-9]/gi, ''),
      CallerEmail: e.target.email.value,
      CallerComments: `Other Contact: ${e.target.otherFirstName.value} ${e.target.otherLastName.value}, Contact: ${e.target.otherWorkPhoneNumber.value}, Email: ${e.target.otherEmail.value}`,
      CallerContact: e.target.phoneNumber.value.replace(/[^0-9]/gi, ''),
      Answers: [selectedAnswersText],
    };

    axios
      .post('http://localhost:7010/submitRequest', data)
      .then((response) => {
        console.log(response);
        navigate('/servicerequest/success', {
          state: { status: true, requestID: response.data },
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log('domain:', domain);
    console.log('domain ID', domainID);
    console.log('problem area:', problemArea);
    console.log('issue:', issue);
    console.log('issueID', issueID);
    console.log('selected answers', selectedAnswers);
    console.log('selected Answers text', selectedAnswersText);
    console.log('building', building);
    console.log('department', department);
    console.log('additonalLocationInfo', additonalLocationInfo);
    console.log('issueDescription', issueDescription);
  }, [
    domain,
    problemArea,
    issue,
    domainID,
    selectedAnswers,
    selectedAnswersText,
    building,
    department,
    additonalLocationInfo,
    issueDescription,
    issueID,
  ]);

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
              path='servicerequest/step1'
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
                />
              }
            />
            <Route
              path='servicerequest/step2'
              element={<Step2 submitRequest={submitRequest} />}
            />
            <Route path='servicerequest/success' element={<Success />} />
          </Routes>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
