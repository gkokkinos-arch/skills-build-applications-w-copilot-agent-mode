import ResourceView from './ResourceView';

function Leaderboard() {
  return (
    <ResourceView
      resourceName="leaderboard"
      endpointExample="https://your-codespace-8000.app.github.dev/api/leaderboard"
      title="Leaderboard"
      description="Current point standings and ranking data for the most active OctoFit participants."
      emptyMessage="No leaderboard entries returned from the API."
      columns={[
        { key: 'user', label: 'User' },
        { key: 'points', label: 'Points' },
      ]}
    />
  );
}

export default Leaderboard;