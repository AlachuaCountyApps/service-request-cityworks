import { Grid } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Geocode from 'react-geocode';

import Step1 from './pages/Step1';
import Step2 from './pages/Step2';

import problems from './data/issuesListDomainSpecific.json';
import questionandAnswers from './data/questionanswersProblemSpecific.json';
import Success from './pages/Success';
import GoogleMap from './components/Map';

import './App.css';

const googleKey = `AIzaSyBRbdKmyFU_X9r-UVmsapYMcKDJQJmQpAg`;

Geocode.setApiKey(googleKey);
Geocode.setLocationType('ROOFTOP');

function App() {
  const [isCountyBuildingIssue, setIsCountyBuildingIssue] = useState('');
  const [domain, setDomain] = useState('');
  const [domainID, setDomainID] = useState();
  const [building, setBuilding] = useState('');
  const [issues, setIssues] = useState([]);
  const [issue, setIssue] = useState('');
  const [issueID, setIssueID] = useState();
  const [additonalLocationInfo, setAdditonalLocationInfo] = useState('');
  const [department, setDepartment] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState(new Map());
  const [issueDescription, setIssueDescription] = useState('');
  const [address, setAddress] = useState({
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
  const [open, setOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(false);
  const [selectaddressonMap, setSelectAddressonMap] = useState(false);
  const [autocompleteData, setAutocompleteData] = useState(null);
  const [callerInformation, setCallerInformation] = useState(new Map());

  const updateCallerInformation = (fieldId, value) => {
    const tempCallerInformation = new Map(callerInformation);
    tempCallerInformation.set(fieldId, value);
    setCallerInformation(tempCallerInformation);
  };

  const refreshFormFields = () => {
    // Clear all other selections
    setIssue('');
    setIssueID();
    setDepartment('');
    setSelectedAnswers(new Map());
    setAnswers([]);
    setQuestions([]);
    setIssueDescription('');
  };

  /*
    handleIsCountyBuildingIssueChange is fired when
    a user answers the question, 'Is the issue related
    to a county building?'  If it is not building, sets
    the domain and domainId.  If it is a building, further
    evaluation is required to determine the issue domain
  */
  const handleIsCountyBuildingIssueChange = (e) => {
    setIsCountyBuildingIssue(e.target.value);
    setIssue('');
    setIssueID();

    if (e.target.value === 'No') {
      setDomain('Default');
      setDomainID(1);
      setIssues([]);
    }
  };

  /*
    Calls CityWorks endpoint to obtain Problems/Issues by domainID.  The
    issues returned will be used to populate the issues dropdown
  */
  const handleDomainIdChange = async () => {
    const result = await axios.post(
      `http://192.168.46.90:7010/cityWorksAPI/GetIssuesByDomainId?Id=${domainID}`
    );

    const data = result.data.Value;

    setIssues(data);
  };

  /*
    Fires when there is a change in domainID.
    DomainID set to 1 (Public Works) when then the issue reported
    did not occurr in a building, or it is in a building but the building
    is part of 'CritFac' otherwise DomainID is set to 3 (Facilities)
  */
  useEffect(() => {
    if (domainID) handleDomainIdChange();
    refreshFormFields();
  }, [domainID]);

  /*
    Fires when the user selects a building from the 'Building' dropdown
  */
  const handleBuildingChange = (val) => {
    setBuilding(val);

    if (val && val.Dept.includes('CritFac')) {
      //Set Domain - Public Works
      setDomain('Default');
      setDomainID(1);
    } else if (val && val.Dept.includes('GenFac')) {
      //Set Domain - Facilities
      setDomain('ACFD');
      setDomainID(3);
    } else {
      refreshFormFields();
      setDomain('');
      setDomainID();
      setIssues([]);
    }
  };

  /*
    Fires when there is a change to the building state variable
    Calls updateAddress which obtains the address of the building
    from its latitude and longitude
  */
  useEffect(() => {
    if (building) updateAddress();
  }, [building]);

  const updateAddress = () => {
    Geocode.fromLatLng(building.lat, building.lng)
      .then((response) => {
        const data = response.results[0];
        updateSelectedAddress(data);
      })
      .catch((error) => console.log(error));
  };

  const handleDepartmentChange = (val) => {
    setDepartment(val);
  };

  /*
    Fires when user selects and issue/problem from the dropdown
    labeled 'Please Select an Issue to Report'
  */
  const handleIssueSelection = (e) => {
    setIssue(e.target.value);
    setIssueID(parseInt(e.target.value.ProblemSid));
  };

  /*
    Fires when there is a change to issueID state variable
  */
  useEffect(() => {
    if (issueID) getQuestionAnswersforSelectedIssue();
  }, [issueID]);

  /*
    Sets the Q&As for the selected issue
  */
  const getQuestionAnswersforSelectedIssue = async () => {
    const result = await axios.post(
      `http://192.168.46.90:7010/cityWorksAPI/GetQAsByProblemSid?Id=${issueID}`
    );

    const data = result.data.Value;

    setQuestions(data.Questions);
    setAnswers(data.Answers);
  };

  const updateSelectedAnswers = (val) => {
    const userSelectedAnswers = new Map(selectedAnswers);

    userSelectedAnswers.set(val.QuestionId, val);

    setSelectedAnswers(userSelectedAnswers);
  };

  const getLocation = () => {
    setUserLocation(!userLocation);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = (e, reason) => {
    if (reason !== 'backdropClick') setOpen(false);
  };

  let navigate = useNavigate();

  const getStreetName = (street) => {
    if (street)
      if (
        street.toUpperCase() === 'SW' ||
        street.toUpperCase() === 'SOUTH WEST'
      )
        return 'South West';
    if (street.toUpperCase() === 'SE' || street.toUpperCase() === 'SOUTH EAST')
      return 'South East';
    if (street.toUpperCase() === 'NW' || street.toUpperCase() === 'NORTH WEST')
      return 'North West';
    if (street.toUpperCase() === 'NE' || street.toUpperCase() === 'NORTH EAST')
      return 'North East';
    if (
      street.toUpperCase() === 'NC' ||
      street.toUpperCase() === 'NORTH CENTRAL'
    )
      return 'North Central';
    if (
      street.toUpperCase() === 'SC' ||
      street.toUpperCase() === 'SOUTH CENTRAL'
    )
      return 'South Central';
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
            addressObj.StreetName = getStreetName(
              data.address_components[i].short_name.substring(
                0,
                data.address_components[i].short_name.indexOf(' ')
              )
            );
            break;
          case 'street_number':
            addressObj.streetNumber = data.address_components[i].long_name;
            break;
          default:
            break;
        }
      }
    }
    setAddress(addressObj);
  };

  const formatSelectedAnswers = (answers) => {
    const formattedAnswers = [];
    for (const [key, value] of answers) {
      const tempAnswer = {};
      tempAnswer.AnswerId = value.AnswerId;
      tempAnswer.AnswerValue = value.Answer;
      formattedAnswers.push(tempAnswer);
    }
    return formattedAnswers;
  };

  const convertQuestionAnswersToString = () => {
    let formattedQuestionAnswers = '';
    for (const [key, value] of selectedAnswers) {
      for(let i = 0; i < questions.length; i++) {
        if(questions[i].QuestionId === value.QuestionId) {
          formattedQuestionAnswers += `${questions[i].Question}: ${value.Answer} \n`
        }
      }
    }
    return formattedQuestionAnswers;
  }

  const submitRequest = (e) => {
    e.preventDefault();

    console.log(issue);

    const data = {
      ProblemSid: issueID,
      Details: issueDescription,
      Comments: convertQuestionAnswersToString(),
      Address: address.streetNumber + ' ' + address.shortAddress,
      City: address.city,
      State: 'Florida',
      Zip: address.zip,
      Landmark:
        building.label && building.label.includes('Other')
          ? null
          : building.label,
      District: address.StreetName,
      Location: additonalLocationInfo,
      X: address.lat,
      Y: address.lng,
      CallerType: 'Visitor',
      CallerFirstName: e.target.firstName.value,
      CallerLastName: e.target.lastName.value,
      CallerAddress: e.target.address.value,
      CallerAptNum: e.target.unitnumber.value,
      CallerCity: e.target.city.value,
      CallerState: e.target.state.value,
      CallerZip: e.target.zipcode.value,
      CallerWorkPhone: e.target.workPhoneNumber.value.replace(/[^0-9]/gi, ''),
      CallerCellPhone: e.target.phoneNumber.value.replace(/[^0-9]/gi, ''),
      CallerOtherPhone:
        e.target.otherWorkPhoneNumber.value &&
        e.target.otherWorkPhoneNumber.value.replace(/[^0-9]/gi, ''),
      CallerEmail: e.target.email.value,
      CallerComments: `Other Contact: ${e.target.otherFirstName.value} ${e.target.otherLastName.value}, Email: ${e.target.otherEmail.value}`,
      Answers: formatSelectedAnswers(selectedAnswers),
      GeocodeAddress: true, // Use the first result from the geocode service with the HIGHEST SCORE to update Address, City, State, Zip, MapPage, TileNo, Shop, District and XY values. Ignored if a valid XY is provided.
    };

    convertQuestionAnswersToString();

    // console.log(data);

    axios
      .post('http://localhost:7010/submitRequest', data)
      .then((response) => {
        console.log(response);
        navigate('/servicerequest/success', {
          state: { status: true, requestID: response.data },
        });
      })
      .catch(() => console.log('NO!!!!!'));
  };

  return (
    <>
      <GoogleMap
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
                  issue={issue}
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
                />
              }
            />
            <Route
              path="servicerequest/step2"
              element={
                <Step2
                  domain={domain}
                  issueID={issueID}
                  callerInformation={callerInformation}
                  updateCallerInformation={updateCallerInformation}
                  submitRequest={submitRequest}
                />
              }
            />
            <Route path="servicerequest/success" element={<Success />} />
          </Routes>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
