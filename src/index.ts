import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

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
    `,
    resolvers: {
      Query: {
        hello: () => "Hey there, I'm graphQL server.",
        sayMyName: (_, { name }) => {
          return `Hey my name is ${name}`;
        },
      },
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
