import { GraphQLClient, RequestDocument } from 'graphql-request';

const graphqlAPI: string = import.meta.env.VITE_GRAPHQL_URL;

export const client = new GraphQLClient(graphqlAPI, {
  headers: {
    authorization: 'Bearer YOUR_AUTH_TOKEN', // if you need authentication
  },
});

export const fetcher = (
  query: RequestDocument,
  variables: Record<string, any> = {}
):Promise<any> => client.request(query, variables);
