import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import server from "./graphQL";
import UserService from "./services/user";

const app = express();
app.use(express.json());
const PORT = 8000;

const serverInit = async () => {

  app.use("/graphql", expressMiddleware(await server(), {
    context: async ({req}) => {
      const token = req.headers.authorization
      
      try {
        const user = UserService.decodeJWTToken(token);
        if(user){
          return { user };
        }
      } catch (error) {
        return {};
      }
    }
  }));

  app.listen(Number(process.env.PORT) || PORT, () => {
    console.log(`Connected on port ${PORT}`);
  });
};

serverInit().catch((error) => {
  console.error(error);
});
