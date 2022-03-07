import { Grid } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Step1 from './pages/Step1';
import Step2 from './pages/Step2';

import problemAreaData from './data/problemArea.json';
import questionsandAnswers from './data/callerQuestions&Answers.json';

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

  const handleIssueChange = (e, newVal) => {
    setSelectedAnswers({});
    if (newVal) {
      console.log(new Date());
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
        <BrowserRouter>
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
            <Route path='/step2' element={<Step2 />} />
          </Routes>
        </BrowserRouter>
      </Grid>
    </Grid>
  );
}

export default App;
