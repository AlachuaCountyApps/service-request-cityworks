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
            {question.question}
          </Grid>
          <Grid item xs={12} sm={8}>
            <Select
              value={selectedAnswers[index] ? selectedAnswers[index] : ''}
              onChange={(e) => updateSelectedAnswers(index, e)}
              style={{ fontWeight: 'bold' }}
              fullWidth
            >
              {question.answers.map((answer, ind) => (
                <MenuItem key={ind} value={answer}>
                  {answer}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      ))}
    </>
  );
}
