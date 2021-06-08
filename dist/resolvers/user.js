"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = exports.singleUser = void 0;
const product_1 = require("./product");
const user_1 = require("./../models/user");
const singleUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.findById(userId).catch((e) => null);
    return user;
});
exports.singleUser = singleUser;
exports.userResolvers = {
    Query: {
        users: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const users = yield user_1.User.find();
                const res = users.map((user) => (Object.assign(Object.assign({}, user._doc), { products: product_1.findProductByUserId.bind(this, user._doc.id) })));
                return res;
            }
            catch (err) {
                throw err;
            }
        }),
        me: (parent, args, context) => {
            return context.user; // in case active user is added to context user
        },
    },
    Mutation: {
        register: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            const user = new user_1.User(Object.assign({}, args));
            const result = yield user.save().catch((err) => {
                throw err;
            });
            return result;
        }),
        login: (parent, { email, password }) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield user_1.User.findOne({ email }).catch((err) => {
                throw err;
            });
            if (user && user.validatePassword(password)) {
                // generate token
                return { authToken: "user token here" };
            }
            return null;
        }),
    },
};
//# sourceMappingURL=user.js.map