import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function StyledDropdown({
  id = 'styled-dropdown-example',
  title = 'Styled Dropdown',
  label = 'styled-dropdown-label',
  value = '',
  onChange,
  data = [],
}) {
  return (
    <FormControl fullWidth>
      <InputLabel id={label}>{title}</InputLabel>
      <Select
        labelId={label}
        id={id}
        value={value}
        label={title}
        onChange={onChange}
      >
        {data &&
          data.map((val, index) => (
            <MenuItem key={index} value={val}>
              {val}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
