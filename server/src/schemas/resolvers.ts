import { Park, User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

// Define types for the arguments
interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  };
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface SaveFavSpeciesArgs {
  species: string;
}

interface DeleteFavSpeciesArgs {
  species: string;
}

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('Could not authenticate user.');
    },
    getParksByName: async (_parent: any, { name }: { name: string }) => {
      return Park.find({ name: new RegExp(name, 'i') });
    },
    getParkByCode: async (_parent: any, { code }: { code: string }) => {
      return Park.findOne({ code });
    },
  },

  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      const user = await User.create(input);
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    saveFavSpecies: async (_parent: any, { species }: SaveFavSpeciesArgs, context: any) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { favoriteSpecies: species } },
          { new: true }
        );
      }
      throw new AuthenticationError('Not logged in');
    },

    deleteFavSpecies: async (_parent: any, { species }: DeleteFavSpeciesArgs, context: any) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          context.user._id,
          { $pull: { favoriteSpecies: species } },
          { new: true }
        );
      }
      throw new AuthenticationError('Not logged in');
    },
  },
};

export default resolvers;