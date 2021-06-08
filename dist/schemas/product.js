"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productTypeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.productTypeDefs = apollo_server_1.gql `
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
//# sourceMappingURL=product.js.map