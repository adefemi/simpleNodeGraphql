import { gql } from "apollo-server";

export const mainTypeDefs = gql`
  type Query {
    users: [User]!
    me: User
    products: [Product]!
    product(id: ID!): Product
    categories: [Category]!
  }

  type Mutation {
    createCategory(name: String!): Category
    createProduct(
      user: String
      category: String!
      name: String!
      price: Float!
      description: String!
    ): Product
    register(
      email: String!
      firstName: String!
      lastName: String!
      password: String!
    ): User
    login(email: String!, password: String!): LoginCred
  }
`;
