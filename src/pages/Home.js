import { useState } from 'react';
import { Grid, Typography } from '@mui/material';

import Problem from '../components/Problem';
import StyledDropdown from '../components/StyledDropdown';
import Issue from '../components/Issue';
import CallerQuestionsAnswers from '../components/CallerQuestionsAnswers';

import problemAreaData from '../data/problemArea.json';
import issuesData from '../data/issue.json';
import questionsandAnswers from '../data/callerQuestions&Answers.json';
import CallerInformation from '../components/CallerInformation';
import IncidentInformation from '../components/IncidentInformation';

export default function Home() {
  const [domain, setDomain] = useState('');
  const [problemAreas, setProblemAreas] = useState([]);
  const [problemArea, setProblemArea] = useState('');
  const [issues, setIssues] = useState([]);
  const [issue, setIssue] = useState('');
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleDomainChange = (e) => {
    setDomain(e.target.value);
    setProblemArea('');
    setProblemAreas(problemAreaData[e.target.value]);
  };

  const handleProblemAreaChange = (e) => {
    setProblemArea(e.target.value);
    setIssue('');
    setIssues(issuesData[e.target.value]);
  };

  const handleIssueChange = (e, newVal) => {
    setSelectedAnswers({});
    if (newVal) {
      setIssue(newVal.label);
      setProblemArea(newVal.area);
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

  /*   const handleIssueChange = (e, newVal) => {
    console.log(newVal);
    setIssue(newVal.label);
    setSelectedAnswers({});
    if (
      questionsandAnswers[problemArea] &&
      questionsandAnswers[problemArea][[e.target.value]]
    )
      setQuestionAnswers(questionsandAnswers[problemArea][e.target.value]);
  }; */

  const updateSelectedAnswers = (index, e) => {
    setSelectedAnswers((prevVal) => ({
      ...prevVal,
      [index]: e.target.value,
    }));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Typography variant='h3'>New Service Request</Typography>
        <Typography variant='caption' display='block' color='red' gutterBottom>
          (See below for Emergency Contact Information)
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CallerInformation />
        <IncidentInformation
          issue={issue}
          handleIssueChange={handleIssueChange}
          questionAnswers={questionAnswers}
          selectedAnswers={selectedAnswers}
          updateSelectedAnswers={updateSelectedAnswers}
        />
      </Grid>
      <Grid item xs={12} sx={{ display: 'none' }}>
        <StyledDropdown
          id='domain'
          title='Domain'
          label='domain-label'
          value={domain}
          onChange={handleDomainChange}
          data={['ACFD', 'Default', 'EPD']}
        />
      </Grid>
      {domain && (
        <Grid item xs={12} sx={{ display: 'none' }}>
          <Problem
            problemAreas={problemAreas}
            problemArea={problemArea}
            handleProblemAreaChange={handleProblemAreaChange}
          />
        </Grid>
      )}
    </Grid>
  );
}
