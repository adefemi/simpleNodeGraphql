import { mainTypeDefs } from "./mainTypeDefs";
import { productTypeDefs } from "./schemas/product";
import { userResolvers } from "./resolvers/user";
import { userTypeDefs } from "./schemas/user";
import { ApolloServer, gql } from "apollo-server";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { productResolvers } from "./resolvers/product";

dotenv.config();

const server = new ApolloServer({
  typeDefs: [userTypeDefs, productTypeDefs, mainTypeDefs],
  resolvers: [userResolvers, productResolvers],
});

const mongoDBURL = `mongodb+srv://${process.env.DB_ACCESS_USER}:${process.env.DB_ACCESS_PASSWORD}@cluster0.3zx2p.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((_) => {
    server.listen().then(({ url }) => {
      console.log(`Server started at: ${url}`);
    });
  })
  .catch((e) => console.log(e));
