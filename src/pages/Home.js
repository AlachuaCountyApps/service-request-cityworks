import { useState } from "react";
import { Box, Grid, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import Problem from "../components/Problem";
import StyledDropdown from "../components/StyledDropdown";
import Issue from "../components/Issue";
import CallerQuestionsAnswers from "../components/CallerQuestionsAnswers";

import problemAreaData from "../problemArea.json";
import issuesData from "../issue.json";
import questionsandAnswers from "../callerQuestions&Answers.json";
import CallerInformation from "../components/CallerInformation";
import IncidentInformation from "../components/IncidentInformation";

export default function Home() {
  const [domain, setDomain] = useState("");
  const [problemAreas, setProblemAreas] = useState([]);
  const [problemArea, setProblemArea] = useState("");
  const [issues, setIssues] = useState([]);
  const [issue, setIssue] = useState("");
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [tabValue, setTabValue] = useState("1");

  const handleDomainChange = (e) => {
    setDomain(e.target.value);
    setProblemArea("");
    setProblemAreas(problemAreaData[e.target.value]);
  };

  const handleProblemAreaChange = (e) => {
    setProblemArea(e.target.value);
    setIssue("");
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
          data={["ACFD", "Default", "EPD"]}
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

      <Grid item xs={12}>
        <Box sx={{ width: "100%" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                textColor='primary'
                indicatorColor='primary'
              >
                <Tab
                  label='Incident Information'
                  value='1'
                  sx={{ fontWeight: "bold" }}
                />
                <Tab
                  label='Caller Information'
                  value='2'
                  sx={{ fontWeight: "bold" }}
                />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <IncidentInformation issue={issue} />
            </TabPanel>
            <TabPanel value='2'>
              <CallerInformation />
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
    </Grid>
  );
}
