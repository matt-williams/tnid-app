import { View } from 'react-native';
import User from './User';

import { graphql } from 'relay-runtime';
import { usePreloadedQuery } from 'react-relay';

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
    <View>
      {data['users'].map(user => <User key={user.id} user={user} />)}
    </View>
  );
}
