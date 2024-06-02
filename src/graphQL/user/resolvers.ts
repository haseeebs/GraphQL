import UserService, { CreateUserPayload, getUserTokenPayload } from "../../services/user";

const queries = {
  getUserToken: async (_, payload: getUserTokenPayload) => {
      const token = await UserService.getUserToken(payload)
      return token;
    },

  getCurrentLoggedInUser: async (_, parameters, context) => {
    if(context && context.user) {
      const id = context.user.id;
      const user = await UserService.getUserById(id);
      return user;
    }; 
    
    return new Error('kya bhiya kya cahn riya hai...')
  }
};

const mutation = {
    createUser: async (_: any, payload: CreateUserPayload) => {
      const result = await UserService.createUser(payload);
      return result.id
    }
};

export const resolvers = { queries, mutation };