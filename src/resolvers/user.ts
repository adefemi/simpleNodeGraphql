import { findProductByUserId } from "./product";
import { IUser, User } from "./../models/user";

export const singleUser = async (userId: string) => {
  const user = await User.findById(userId).catch((e) => null);
  return user;
};

export const userResolvers = {
  Query: {
    users: async () => {
      try {
        const users = await User.find();
        const res = users.map((user) => ({
          ...user._doc,
          products: findProductByUserId.bind(this, user._doc.id),
        }));
        return res;
      } catch (err) {
        throw err;
      }
    },
    me: (parent, args, context): IUser => {
      return context.user; // in case active user is added to context user
    },
  },
  Mutation: {
    register: async (parent, args) => {
      const user = new User({ ...args });
      const result = await user.save().catch((err) => {
        throw err;
      });
      return result;
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email }).catch((err) => {
        throw err;
      });

      if (user && user.validatePassword(password)) {
        // generate token
        return { authToken: "user token here" };
      }
      return null;
    },
  },
};
