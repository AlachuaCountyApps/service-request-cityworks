import StyledDropdown from './StyledDropdown';

export default function Issue({ issues, issue, handleIssueChange }) {
  return (
    <StyledDropdown
      id='program-area'
      title='Select Problem Area'
      label='program-area-label'
      value={issue}
      onChange={handleIssueChange}
      data={issues}
    />
  );
}
