import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import server from "./graphQL";

const app = express();
app.use(express.json());
const PORT = 8000;

const serverInit = async () => {

  app.use("/graphql", expressMiddleware(await server()));

  app.listen(Number(process.env.PORT) || PORT, () => {
    console.log(`Connected on port ${PORT}`);
  });
};

serverInit().catch((error) => {
  console.error(error);
});
