import { Grid, MenuItem, Select } from '@mui/material';

export default function CallerQuestionsAnswers({
  questionAnswers,
  selectedAnswers,
  updateSelectedAnswers,
}) {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          bgcolor: '#2e78ac',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          color: 'white',
          p: 2,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Caller Questions & Answers
      </Grid>
      {questionAnswers.map((question, index) => (
        <Grid
          container
          key={index}
          sx={{ bgcolor: index % 2 ? '#aec4e5' : '#ebf2f7', p: 2 }}
        >
          <Grid item xs={1} sx={{ fontSize: 15 }}>
            {index + 1}.
          </Grid>
          <Grid item xs={7}>
            {question.question}
          </Grid>
          <Grid item xs={4}>
            <Select
              value={selectedAnswers[index] ? selectedAnswers[index] : ''}
              onChange={(e) => updateSelectedAnswers(index, e)}
              style={{ minWidth: 200 }}
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
    </Grid>
  );
}
