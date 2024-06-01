import UserService, { CreateUserPayload } from "../../services/user";

const queries = {
        hello: () => "Hey there, I'm graphQL server.",

        sayMyName: (_, { name }) => {
          return `Hey my name is ${name}`;
        }
};

const mutation = {
    createUser: async (_: any, payload: CreateUserPayload) => {
      const result = await UserService.createUser(payload);
      return result.id
    }
};

export const resolvers = { queries, mutation };