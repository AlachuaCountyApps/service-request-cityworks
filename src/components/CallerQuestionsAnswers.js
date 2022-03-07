import { Grid, MenuItem, Select } from '@mui/material';

export default function CallerQuestionsAnswers({
  questionAnswers,
  selectedAnswers,
  updateSelectedAnswers,
}) {
  return (
    <>
      {questionAnswers.map((question, index) => (
        <Grid
          container
          key={index}
          sx={{ bgcolor: index % 2 ? '#aec4e5' : '#ebf2f7', p: 2 }}
        >
          <Grid
            item
            xs={11}
            sm={4}
            sx={{ alignSelf: 'center', fontWeight: 'bold', my: { xs: 2 } }}
          >
            {question.question.text}
          </Grid>
          <Grid item xs={12} sm={8}>
            <Select
              value={
                selectedAnswers[question.question.id]
                  ? selectedAnswers[question.question.id]
                  : ''
              }
              onChange={(e) =>
                updateSelectedAnswers(question.question.id, e, question.answers)
              }
              style={{ fontWeight: 'bold' }}
              fullWidth
              required
            >
              {question.answers.map((answer, ind) => (
                <MenuItem key={ind} value={answer.id}>
                  {answer.text}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      ))}
    </>
  );
}
