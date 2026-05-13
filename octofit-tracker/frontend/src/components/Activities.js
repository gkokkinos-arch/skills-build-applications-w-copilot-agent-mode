import ResourceView from './ResourceView';

function Activities() {
  return (
    <ResourceView
      resourceName="activities"
      endpointExample="https://your-codespace-8000.app.github.dev/api/activities"
      title="Activities"
      description="Logged workouts, training sessions, and recorded exercise durations across the app."
      emptyMessage="No activities returned from the API."
      columns={[
        { key: 'user', label: 'User' },
        { key: 'activity', label: 'Activity' },
        { key: 'duration', label: 'Duration' },
      ]}
    />
  );
}

export default Activities;