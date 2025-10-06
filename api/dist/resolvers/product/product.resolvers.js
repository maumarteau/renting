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
const productController_1 = require("../../controllers/productController");
const Product_1 = require("../../entity/Product");
const utils_1 = require("../../utils");
const Product = {};
const Query = {
    products: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        let query = yield utils_1.createListQuery(Product_1.Product, args, ctx);
        if (args.search) {
            const searchTerms = args.search.split(" ");
            searchTerms.forEach((searchTerm) => {
                query.andWhere("(l.title like :title OR l.description like :description OR l.brand like :brand OR l.model like :model)", {
                    title: `%${searchTerm.toLowerCase()}%`,
                    description: `%${searchTerm.toLowerCase()}%`,
                    brand: `%${searchTerm.toLowerCase()}%`,
                    model: `%${searchTerm.toLowerCase()}%`
                });
            });
        }
        if (Object.values(Product_1.ProductStatus).includes(args.status)) {
            query.andWhere("l.status = :status", { status: args.status });
        }
        if (args.brand) {
            query.andWhere("l.brand = :brand", { brand: args.brand });
        }
        if (args.model) {
            query.andWhere("l.model = :model", { model: args.model });
        }
        if (args.minPrice) {
            query.andWhere("l.price >= :minPrice", { minPrice: args.minPrice });
        }
        if (args.maxPrice) {
            query.andWhere("l.price <= :maxPrice", { maxPrice: args.maxPrice });
        }
        if (args.year) {
            query.andWhere("l.year = :year", { year: args.year });
        }
        if (args.fuel) {
            query.andWhere("l.fuel = :fuel", { fuel: args.fuel });
        }
        if (args.transmission) {
            query.andWhere("l.transmission = :transmission", { transmission: args.transmission });
        }
        query.leftJoinAndSelect("l.files", "files");
        const [items, totalCount] = yield query.getManyAndCount();
        return { data: items, pageInfo: { totalItems: totalCount } };
    }),
    product: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        let where = args.slug ? { slug: args.slug } : { id: args.id };
        const item = yield utils_1.findOne(Product_1.Product, ctx, undefined, { where, relations: ["files"] });
        if (!item)
            throw new Error("Product not found");
        return item;
    }),
    productCheckSlug: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        let item = null;
        if (args.slug) {
            item = yield utils_1.findOne(Product_1.Product, ctx, _, { where: { slug: args.slug } });
        }
        return item;
    })
};
const Mutation = {
    productCreate: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield productController_1.productCreate(args.data);
        return result;
    }),
    productUpdate: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield productController_1.productUpdate(args.id, args.data);
        return result;
    }),
    productDelete: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const item = yield utils_1.findOne(Product_1.Product, ctx, args.id);
        if (!item)
            throw new Error("Product not found");
        const result = Object.assign({}, item);
        yield item.remove().catch(() => {
            throw new Error("Product no se puede eliminar");
        });
        return result;
    }),
    productToggleStatus: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        if (!Object.values(Product_1.ProductStatus).includes(args.status))
            throw new Error("Invalid status ");
        const result = yield productController_1.productUpdate(args.id, { status: args.status });
        return result;
    }),
    productSort: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield productController_1.productSort(args.list);
        return result;
    }),
};
exports.default = {
    Product,
    Query,
    Mutation
};
