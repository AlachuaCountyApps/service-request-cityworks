import { FormHelperText, Grid, MenuItem, Select } from "@mui/material";
import React from "react";

export default function CallerQuestionAnswersNew({
  questions,
  answers,
  selectedAnswers = [],
  updateSelectedAnswers,
}) {
  return questions.map((question, index) => {
    const questionId = question.QuestionId;

    return (
      <Grid container key={index} sx={{ bgcolor: "#ebf2f7", p: 2 }}>
        <Grid
          item
          xs={11}
          sm={4}
          sx={{ alignSelf: "center", fontWeight: "bold", my: { xs: 2 } }}
        >
          {question.Question}
        </Grid>
        <Grid item xs={12} sm={8}>
          <Select
            value={
              selectedAnswers.has(questionId)
                ? selectedAnswers.get(questionId)
                : ""
            }
            onChange={(e) => updateSelectedAnswers(e.target.value)}
            style={{ fontWeight: "bold" }}
            fullWidth
            required
          >
            {answers.map((answer, ind) =>
              answer.QuestionId === questionId ? (
                <MenuItem key={ind} value={answer} title={answer.Answer}>
                  {answer.Answer}
                </MenuItem>
              ) : null
            )}
          </Select>
          <FormHelperText sx={{ color: "green" }}>
            {selectedAnswers.has(questionId)
              ? selectedAnswers.get(questionId).TellCaller
              : ""}
          </FormHelperText>
        </Grid>
      </Grid>
    );
  });
}
