import { singleUser } from "./user";
import { Category, Product } from "./../models/products";

export const singleCategory = async (categoryId: string) => {
  return await Category.findById(categoryId).catch((e) => null);
};

export const findProductByUserId = async (userId: string) => {
  return await Category.find({ user: userId }).catch((e) => null);
};

export const productResolvers = {
  Query: {
    products: async () => {
      try {
        const products = await Product.find();
        const res = products.map((product) => ({
          ...product._doc,
          user: singleUser.bind(this, product._doc.user),
          category: singleCategory.bind(this, product._doc.category),
        }));
        return res;
      } catch (err) {
        throw err;
      }
    },
    product: async (parent, { id }) => {
      const result = await Product.findOne({ id }).catch((err) => {
        throw err;
      });
      return result;
    },
    categories: () => Category.find(),
  },
  Mutation: {
    createCategory: async (parent, args) => {
      const category = new Category({ ...args });
      const result = await category.save().catch((err) => {
        throw err;
      });
      return result;
    },

    createProduct: async (parent, args) => {
      // create product
      const product = new Product(args);
      const result = await product.save().catch((err) => {
        throw err;
      });
      return result;
    },
  },
};
