import { useState } from 'react';
import { Grid } from '@mui/material';

import Problem from '../components/Problem';
import StyledDropdown from '../components/StyledDropdown';
import Issue from '../components/Issue';
import CallerQuestionsAnswers from '../components/CallerQuestionsAnswers';

import problemAreaData from '../problemArea.json';
import issuesData from '../issue.json';
import questionsandAnswers from '../callerQuestions&Answers.json';

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

  const handleIssueChange = (e) => {
    setIssue(e.target.value);
    setSelectedAnswers({});
    if (
      questionsandAnswers[problemArea] &&
      questionsandAnswers[problemArea][[e.target.value]]
    )
      setQuestionAnswers(questionsandAnswers[problemArea][e.target.value]);
  };

  const updateSelectedAnswers = (index, e) => {
    setSelectedAnswers((prevVal) => ({
      ...prevVal,
      [index]: e.target.value,
    }));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
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
        <Grid item xs={12}>
          <Problem
            problemAreas={problemAreas}
            problemArea={problemArea}
            handleProblemAreaChange={handleProblemAreaChange}
          />
        </Grid>
      )}
      {problemArea && issues.length > 0 && (
        <>
          <Grid item xs={12}>
            <Issue
              issues={issues}
              issue={issue}
              handleIssueChange={handleIssueChange}
            />
          </Grid>
          {issue && questionAnswers.length > 0 && (
            <Grid item xs={12}>
              <CallerQuestionsAnswers
                questionAnswers={questionAnswers}
                selectedAnswers={selectedAnswers}
                updateSelectedAnswers={updateSelectedAnswers}
              />
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
}
