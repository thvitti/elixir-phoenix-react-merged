import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { hasSubscription } from "@jumpn/utils-graphql";
import * as AbsintheSocket from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { Socket as PhoenixSocket } from "phoenix";

const BACKEND_IP = process.env.REACT_APP_IP
const BACKEND_PORT = process.env.REACT_APP_PORT

// CORS - include proxy setup
const HTTP_ENDPOINT = `/api`;
const WS_ENDPOINT = `ws://${BACKEND_IP}:${BACKEND_PORT}/socket`;

const httpLink = createHttpLink({
  uri: HTTP_ENDPOINT
});

const socketLink = createAbsintheSocketLink(
  AbsintheSocket.create(new PhoenixSocket(WS_ENDPOINT))
);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("auth-token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const link = new ApolloLink.split(
  operation => hasSubscription(operation.query),
  socketLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
