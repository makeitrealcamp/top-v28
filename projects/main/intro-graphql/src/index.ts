import { ApolloServer, ApolloServerOptions } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import { typeDefs } from './graphql/types.ts';
import { resolvers } from './graphql/resolvers.ts';
import { connect } from './database/index.ts';

interface MyContext {
  token?: string;
}

// const typeDefs = `
//   type Query {
//     hello: String
//     bye: String
//     time: Int
//   }
// `;

// const resolvers = {
//   Query: {
//     hello: () => 'Hello world!',
//     bye: () => 'Bye world!',
//     time: () => 123,
//   },

// };

const mainServer = async () => {
  connect();

  const app = express();
  const httpServer = http.createServer(app);
  app.use(express.json());

  const serverOptions:ApolloServerOptions<MyContext> = {
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  };

  const server = new ApolloServer(serverOptions);

  await server.start();

  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.authorization }),
  }));

  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/`);
};

mainServer();
