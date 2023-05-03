import MyLocation from '@mui/icons-material/MyLocation';
import { Autocomplete, Grid, IconButton, TextField } from '@mui/material';
import React from 'react';

export default function IssueQuestionAnswers({
  id,
  index,
  question,
  value,
  updateSelection,
  options,
  AdditionalComponent = false,
  getLocation,
  placeholder = null,
  required = true,
}) {
  return (
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
        {question}
      </Grid>
      {AdditionalComponent ? (
        <Grid
          item
          xs={12}
          sm={8}
          sx={{ display: 'flex', alignItems: 'flex-end' }}
        >
          <Autocomplete
            id={id}
            name={id}
            options={options}
            value={value}
            onChange={(event, newValue) => updateSelection(newValue)}
            renderInput={(params) => (
              <TextField {...params} required={required} />
            )}
            fullWidth
          />
          {getLocation ? (
            <IconButton
              color="primary"
              aria-label="get-my-location"
              component="span"
              sx={{ m: 'auto' }}
              onClick={getLocation}
            >
              <MyLocation />
            </IconButton>
          ) : null}
        </Grid>
      ) : (
        <Grid item xs={12} sm={8}>
          <TextField
            id={id}
            name={id}
            value={value}
            onChange={(e) => {
              updateSelection(e.target.value);
            }}
            required={true}
            rows={3}
            multiline
            placeholder={placeholder && placeholder}
            fullWidth
          />
        </Grid>
      )}
    </Grid>
  );
}
