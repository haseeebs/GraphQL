import { prisma } from "../../lib/database";

const queries = {
        hello: () => "Hey there, I'm graphQL server.",

        sayMyName: (_, { name }) => {
          return `Hey my name is ${name}`;
        }
};

const mutation = {
    createUser: async (_, { firstName, lastName, email, password }) => {
        await prisma.user.create({
          data: {
            firstName,
            lastName,
            email,
            password,
            salt: "GenerateSaltUsingBcrypt",
          },
        });

        return true;
      },
};

export const resolvers = { queries, mutation };