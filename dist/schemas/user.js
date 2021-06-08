"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTypeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.userTypeDefs = apollo_server_1.gql `
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
//# sourceMappingURL=user.js.map