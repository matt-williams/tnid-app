import React from "react";
import { useMemo } from "react";
import { RelayEnvironmentProvider } from "react-relay";

const {
  Store,
  RecordSource,
  Environment,
  Network,
  Observable,
} = require("relay-runtime");

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
  const response = fetch("https://api.staging.v2.tnid.com/company", {
    method: "POST",
    headers: [["Content-Type", "application/json"],
              ["Authorization", "Bearer xxx"]],
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  return Observable.from(response.then((data) => data.json()));
};

/**
 * Creates a new Relay environment instance for managing (fetching, storing) GraphQL data.
 */
function createEnvironment() {
  const network = Network.create(fetchFunction);
  const store = new Store(new RecordSource());
  return new Environment({ store, network });
}

export default function RelayEnvironment({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const environment = useMemo(() => {
    return createEnvironment();
  }, []);

  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
}
