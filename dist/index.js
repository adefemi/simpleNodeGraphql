"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mainTypeDefs_1 = require("./mainTypeDefs");
const product_1 = require("./schemas/product");
const user_1 = require("./resolvers/user");
const user_2 = require("./schemas/user");
const apollo_server_1 = require("apollo-server");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const product_2 = require("./resolvers/product");
dotenv_1.default.config();
const server = new apollo_server_1.ApolloServer({
    typeDefs: [user_2.userTypeDefs, product_1.productTypeDefs, mainTypeDefs_1.mainTypeDefs],
    resolvers: [user_1.userResolvers, product_2.productResolvers],
});
const mongoDBURL = `mongodb+srv://${process.env.DB_ACCESS_USER}:${process.env.DB_ACCESS_PASSWORD}@cluster0.3zx2p.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose_1.default
    .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((_) => {
    server.listen().then(({ url }) => {
        console.log(`Server started at: ${url}`);
    });
})
    .catch((e) => console.log(e));
//# sourceMappingURL=index.js.map