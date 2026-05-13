import ResourceView from './ResourceView';

function Teams() {
  return (
    <ResourceView
      resourceName="teams"
      endpointExample="https://your-codespace-8000.app.github.dev/api/teams"
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