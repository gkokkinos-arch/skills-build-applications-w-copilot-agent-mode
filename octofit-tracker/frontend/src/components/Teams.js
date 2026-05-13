import ResourceView from './ResourceView';

function Teams() {
  return (
    <ResourceView
      resourceName="teams"
      title="Teams"
      description="Competitive squads, roster groupings, and collaboration units inside OctoFit."
      emptyMessage="No teams returned from the API."
      columns={[
        { key: 'name', label: 'Team Name' },
      ]}
    />
  );
}

export default Teams;