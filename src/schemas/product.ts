import { gql } from "apollo-server";

export const productTypeDefs = gql`
  type Category {
    id: ID
    name: String!
  }

  type Product {
    id: ID
    category: Category!
    name: String!
    price: Float!
    description: String!
    user: User!
  }
`;
