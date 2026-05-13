import ResourceView from './ResourceView';

function Workouts() {
  return (
    <ResourceView
      resourceName="workouts"
      title="Workouts"
      description="Suggested training plans and recommended workout tracks delivered by the API."
      emptyMessage="No workouts returned from the API."
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'suggested_for', label: 'Suggested For' },
      ]}
    />
  );
}

export default Workouts;