export const userResolvers = {
  createUser: async (_, { name, username, email, password }) => {
    return await userService.createUser({ name, username, email, password });
  },
  loginUser: async (_, { email, password }) => {
    try {
      return await userService.loginUser({ email, password });
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }
  },
};
