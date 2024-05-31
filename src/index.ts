import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { prisma } from "./lib/database";

const app = express();
app.use(express.json());
const PORT = 8000;

const serverInit = async () => {
  // Create graphQL server

  const server = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String,
            sayMyName(name: String): String
        }

        type Mutation {
          createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean
        }
    `,
    resolvers: {
      Query: {
        hello: () => "Hey there, I'm graphQL server.",
        sayMyName: (_, { name }) => {
          return `Hey my name is ${name}`;
        },
      },
      Mutation: {
        createUser: async (_, {firstName, lastName, email, password}) => {
          await prisma.user.create({
            data: {
              firstName,
              lastName,
              email,
              password,
              salt: 'GenerateSaltUsingBcrypt'
            }
          })

          return true;
        }
      }
    },
  });

  // Start the server
  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(Number(process.env.PORT) || PORT, () => {
    console.log(`Connected on port ${PORT}`);
  });
};

serverInit().catch((error) => {
  console.error(error);
});
