import { Grid } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Step1 from './pages/Step1';
import Step2 from './pages/Step2';

import problemAreaData from './data/problemArea.json';
import questionsandAnswers from './data/callerQuestions&Answers.json';
import Success from './pages/Success';

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
  const [additonalLocationInfo, setAdditonalLocationInfo] = useState('');
  const [issueDescription, setIssueDescription] = useState('');

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
      CallerHomePhone: e.target.phoneNumber.value,
      CallerWorkPhone: e.target.phoneNumber.value,
      CallerCellPhone: e.target.phoneNumber.value,
      CallerOtherPhone: e.target.phoneNumber.value,
      CallerFax: e.target.phoneNumber.value,
      CallerEmail: e.target.email.value,
      CallerComments: `Other Contact: ${e.target.otherFirstName.value} ${e.target.otherLastName.value}, Contact: ${e.target.otherWorkPhoneNumber.value}, Email: ${e.target.otherEmail.value}`,
      CallerContact: e.target.phoneNumber.value,
      Answers: [selectedAnswersText],
    };

    axios
      .post('http://localhost:7010/submitRequest', data)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    /*  navigate('/servicerequest/success', {
      state: { status: true, requestID: 123 },
    }); */
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
    additonalLocationInfo,
    issueDescription,
    issueID,
  ]);

  return (
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
                setBuilding={setBuilding}
                additonalLocationInfo={additonalLocationInfo}
                setAdditonalLocationInfo={setAdditonalLocationInfo}
                issueDescription={issueDescription}
                setIssueDescription={setIssueDescription}
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
  );
}

export default App;
