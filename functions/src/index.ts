import * as functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { gql } from "apollo-server-express";
import { ApolloServer } from "@apollo/server";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";
const { json } = bodyParser;

// Initialize Firebase Admin SDK
initializeApp();

// Define your schema using GraphQL SDL
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define your resolvers
const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

// Create an express app instance
const app = express();

// Create a new Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  //   playground: true,
});

await server.start();

app.use("/graphql", cors(), json(), expressMiddleware(server));

// Apply the Apollo middleware to the express app
// server.applyMiddleware({ app });

// Create an HTTPS server using the Firebase Admin SDK
const httpsServer = functions.https.onRequest(app);

// Export the HTTPS server
export { httpsServer };
