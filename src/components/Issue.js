import StyledDropdown from './StyledDropdown';

export default function Issue({ issues, issue, handleIssueChange }) {
  return (
    <StyledDropdown
      id='issue'
      title='Select Issue'
      label='issue-label'
      value={issue}
      onChange={handleIssueChange}
      data={issues}
    />
  );
}
