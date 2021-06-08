import { gql } from "apollo-server";

export const userTypeDefs = gql`
  type User {
    id: ID
    email: String!
    firstName: String!
    lastName: String!
    password: String!
    products: [Product]!
  }

  type LoginCred {
    authToken: String!
  }
`;
