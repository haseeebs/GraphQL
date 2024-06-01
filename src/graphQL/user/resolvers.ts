import UserService, { CreateUserPayload, getUserTokenPayload } from "../../services/user";

const queries = {
  getUserToken: async (_, payload: getUserTokenPayload) => {
      const token = await UserService.getUserToken(payload)
      return token;
    }
};

const mutation = {
    createUser: async (_: any, payload: CreateUserPayload) => {
      const result = await UserService.createUser(payload);
      return result.id
    }
};

export const resolvers = { queries, mutation };