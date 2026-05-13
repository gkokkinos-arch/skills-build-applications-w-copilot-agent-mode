import ResourceView from './ResourceView';

function Users() {
  return (
    <ResourceView
      resourceName="users"
      title="Users"
      description="Team membership, contact info, and user account records from the OctoFit backend."
      emptyMessage="No users returned from the API."
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'team', label: 'Team' },
      ]}
    />
  );
}

export default Users;