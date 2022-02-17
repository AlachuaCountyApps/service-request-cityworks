import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";

import problemAreaData from "../data/problemArea.json";
import questionsandAnswers from "../data/callerQuestions&Answers.json";
import CallerInformation from "../components/CallerInformation";
import IncidentInformation from "../components/IncidentInformation";
import OtherContact from "../components/OtherContact";
import EmergencyContact from "../components/EmergencyContact";

export default function Home() {
  const [domain, setDomain] = useState("");
  const [problemArea, setProblemArea] = useState("");
  const [issue, setIssue] = useState("");
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleIssueChange = (e, newVal) => {
    setSelectedAnswers({});
    if (newVal) {
      setIssue(newVal.label);
      setProblemArea(newVal.area);
      for (const [key, value] of Object.entries(problemAreaData))
        if (value.find((x) => x === newVal.area)) setDomain(key);

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

  const updateSelectedAnswers = (index, e) => {
    setSelectedAnswers((prevVal) => ({
      ...prevVal,
      [index]: e.target.value,
    }));
  };

  useEffect(() => {
    console.log("domain:", domain);
    console.log("problem area:", problemArea);
    console.log("issue:", issue);
  }, [domain, problemArea, issue]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} style={{ textAlign: "center" }}>
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
        <OtherContact />
        <EmergencyContact />
      </Grid>
    </Grid>
  );
}
