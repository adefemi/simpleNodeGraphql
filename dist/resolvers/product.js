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
exports.productResolvers = exports.findProductByUserId = exports.singleCategory = void 0;
const user_1 = require("./user");
const products_1 = require("./../models/products");
const singleCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield products_1.Category.findById(categoryId).catch((e) => null);
});
exports.singleCategory = singleCategory;
const findProductByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield products_1.Category.find({ user: userId }).catch((e) => null);
});
exports.findProductByUserId = findProductByUserId;
exports.productResolvers = {
    Query: {
        products: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const products = yield products_1.Product.find();
                const res = products.map((product) => (Object.assign(Object.assign({}, product._doc), { user: user_1.singleUser.bind(this, product._doc.user), category: exports.singleCategory.bind(this, product._doc.category) })));
                return res;
            }
            catch (err) {
                throw err;
            }
        }),
        product: (parent, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield products_1.Product.findOne({ id }).catch((err) => {
                throw err;
            });
            return result;
        }),
        categories: () => products_1.Category.find(),
    },
    Mutation: {
        createCategory: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            const category = new products_1.Category(Object.assign({}, args));
            const result = yield category.save().catch((err) => {
                throw err;
            });
            return result;
        }),
        createProduct: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            // create product
            const product = new products_1.Product(args);
            const result = yield product.save().catch((err) => {
                throw err;
            });
            return result;
        }),
    },
};
//# sourceMappingURL=product.js.map