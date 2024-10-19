const {useRelayEnvironment} = require('react-relay');
import {Suspense} from 'react';
import { loadQuery, useQueryLoader, usePreloadedQuery } from 'react-relay';
import React, { useState, useEffect } from "react";
import UserList, {UserQuery} from '@/components/UserList';

export default function UserPanel(props) {
  const [queryReference, setQueryReference] = useState(null);

  const environment = useRelayEnvironment();

  useEffect(() => {
    if (queryReference == null) {
      setQueryReference(loadQuery<UserQueryType>(
        environment,
        UserQuery,
        {},
      ))
    }
  }, []);

//  const [queryReference, _loadQuery] = useQueryLoader(
//    UserQuery,
//    initialQueryReference,
//  );

  return (
    <Suspense fallback="Loading...">
      {queryReference != null
        ? <UserList queryReference={queryReference} />
        : null
      }
    </Suspense>
  );
}
