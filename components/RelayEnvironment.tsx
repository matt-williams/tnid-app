import React from "react";
import { useMemo, useEffect, useContext } from "react";
import { AppContext } from '@/components/AppContext';
import { RelayEnvironmentProvider } from "react-relay";
import { Redirect } from 'expo-router';

const {
  Store,
  RecordSource,
  Environment,
  Network,
  Observable,
} = require("relay-runtime");


/**
 * Creates a new Relay environment instance for managing (fetching, storing) GraphQL data.
 */
function createEnvironment(appState) {
  /**
   * Custom fetch function to handle GraphQL requests for a Relay environment.
   *
   * This function is responsible for sending GraphQL requests over the network and returning
   * the response data. It can be customized to integrate with different network libraries or
   * to add authentication headers as needed.
   *
   * @param {RequestParameters} params - The GraphQL request parameters to send to the server.
   * @param {Variables} variables - Variables used in the GraphQL query.
   */
  function fetchFunction(params, variables) {
    const response = fetch("https://api.staging.v2.tnid.com/user", {
      method: "POST",
      headers: [["Content-Type", "application/json"],
                ["Authorization", "Bearer " + appState.token]],
      body: JSON.stringify({
        query: params.text,
        variables,
      }),
    });

    return Observable.from(response.then((data) => data.json()));
  };

  const network = Network.create(fetchFunction);
  const store = new Store(new RecordSource());
  return new Environment({ store, network });
}

export default function RelayEnvironment({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const { appState, setPhoneNumber, setToken } = useContext(AppContext)!;

  const environment = useMemo(() => {
    return createEnvironment(appState);
  }, [appState]);

  if (appState.token == null) {
    return <Redirect href="/login" />;
  }

  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  )
}
