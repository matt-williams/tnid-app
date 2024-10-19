import { View } from 'react-native';

import { graphql } from 'relay-runtime';
import { usePreloadedQuery } from 'react-relay';
import { DataTable } from 'react-native-paper';

export const UserQuery = graphql`
  query UserListQuery {
    users {
      id
      username
      firstName
      lastName
    }
  }
`;

type Props = {
  queryReference: PreloadedQuery<UserQueryType>,
};

export default function UserList({ queryReference }: Props) {
  data = usePreloadedQuery(UserQuery, queryReference);
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Username</DataTable.Title>
        <DataTable.Title>First name</DataTable.Title>
        <DataTable.Title>Last name</DataTable.Title>
      </DataTable.Header>
      {data['users'].map(user =>
        <DataTable.Row key={user.id}>
          <DataTable.Cell>{user.username}</DataTable.Cell>
          <DataTable.Cell>{user.firstName}</DataTable.Cell>
          <DataTable.Cell>{user.lastName}</DataTable.Cell>
        </DataTable.Row>
      )}
    </DataTable>
  );
}
