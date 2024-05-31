import { ApolloServer } from "@apollo/server";
import { User } from "./user";

const server = async () => {
  // Create graphQL server

  const server = new ApolloServer({
    typeDefs: `
        type Query {
          ${User.queries}
        }

        type Mutation {
          ${User.mutation}
        }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries
      },
      Mutation: {
        ...User.resolvers.mutation
      },
    },
  });

  // Start the server
  await server.start();

  return server
};

export default server;
