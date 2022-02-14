import StyledDropdown from './StyledDropdown';

export default function Problem({
  problemAreas,
  problemArea,
  handleProblemAreaChange,
}) {
  return (
    <StyledDropdown
      id='program-area'
      title='Select Problem Area'
      label='program-area-label'
      value={problemArea}
      onChange={handleProblemAreaChange}
      data={problemAreas}
    />
  );
}
