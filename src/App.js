import { Grid } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [building, setBuilding] = useState('');
  const [additonalLocationInfo, setAdditonalLocationInfo] = useState('');
  const [issueDescription, setIssueDescription] = useState('');

  let navigate = useNavigate();

  const handleIssueChange = (e, newVal) => {
    setSelectedAnswers({});
    if (newVal) {
      setIssue(newVal.label);
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

  const updateSelectedAnswers = (index, e) => {
    setSelectedAnswers((prevVal) => ({
      ...prevVal,
      [index]: e.target.value,
    }));
  };

  const submitRequest = (e) => {
    e.preventDefault();
    navigate('/success', { state: { status: true, requestID: 123 } });
  };

  useEffect(() => {
    console.log('domain:', domain);
    console.log('domain ID', domainID);
    console.log('problem area:', problemArea);
    console.log('issue:', issue);
    console.log('selected answers', selectedAnswers);
    console.log('building', building);
    console.log('additonalLocationInfo', additonalLocationInfo);
    console.log('issueDescription', issueDescription);
  }, [
    domain,
    problemArea,
    issue,
    domainID,
    selectedAnswers,
    building,
    additonalLocationInfo,
    issueDescription,
  ]);

  return (
    <Grid container spacing={3} sx={{ py: 6 }}>
      <Grid item xs={12} sx={{ mx: { xs: 1, md: 10, lg: 30 } }}>
        <Routes>
          <Route
            path='/step1'
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
            path='/step2'
            element={<Step2 submitRequest={submitRequest} />}
          />
          <Route path='/success' element={<Success />} />
        </Routes>
      </Grid>
    </Grid>
  );
}

export default App;
