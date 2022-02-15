import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function StyledDropdown({
  id = 'styled-dropdown-example',
  title = false,
  label = 'styled-dropdown-label',
  value = '',
  onChange,
  data = [],
}) {
  return (
    <FormControl fullWidth>
      {title && <InputLabel id={label}>{title}</InputLabel>}
      <Select
        labelId={label}
        id={id}
        value={value}
        label={title ? title : null}
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
