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
const carCategoryController_1 = require("../../controllers/carCategoryController");
const CarCategory_1 = require("../../entity/CarCategory");
const utils_1 = require("../../utils");
const CarCategory = {};
const Query = {
    carCategories: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        let query = yield utils_1.createListQuery(CarCategory_1.CarCategory, args, ctx);
        if (args.search) {
            const searchTerms = args.search.split(" ");
            searchTerms.forEach((searchTerm) => {
                query.andWhere("l.title like :title", { title: `%${searchTerm.toLowerCase()}%` });
            });
        }
        if (args.featured) {
            query.andWhere("l.featured = true");
        }
        if (Object.values(CarCategory_1.CarCategoryStatus).includes(args.status)) {
            query.andWhere("l.status = :status", { status: args.status });
        }
        query.leftJoinAndSelect("l.image", "image");
        query.leftJoinAndSelect("l.imageMain", "imageMain");
        query.leftJoinAndSelect("l.images", "images");
        query.leftJoinAndSelect("l.gallery", "gallery");
        const [items, totalCount] = yield query.getManyAndCount();
        return { data: items, pageInfo: { totalItems: totalCount } };
    }),
    carCategory: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        let where = args.slug ? { slug: args.slug } : { id: args.id };
        const item = yield utils_1.findOne(CarCategory_1.CarCategory, ctx, undefined, { where, relations: ["image", "imageMain", "images", "gallery", "dataSheet"] });
        if (!item)
            throw new Error("CarCategory not found");
        return item;
    }),
    carCategoryCheckSlug: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        let item = null;
        if (args.slug) {
            item = yield utils_1.findOne(CarCategory_1.CarCategory, ctx, _, { where: { slug: args.slug } });
        }
        return item;
    })
};
const Mutation = {
    carCategoryCreate: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield carCategoryController_1.carCategoryCreate(args.data);
        return result;
    }),
    carCategoryUpdate: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield carCategoryController_1.carCategoryUpdate(args.id, args.data);
        return result;
    }),
    carCategoryDelete: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const item = yield utils_1.findOne(CarCategory_1.CarCategory, ctx, args.id);
        if (!item)
            throw new Error("CarCategory not found");
        const result = Object.assign({}, item);
        yield item.remove().catch(() => {
            throw new Error("CarCategory no se puede eliminar");
        });
        return result;
    }),
    carCategoryToggleStatus: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        if (!Object.values(CarCategory_1.CarCategory).includes(args.status))
            throw new Error("Invalid status ");
        const result = yield carCategoryController_1.carCategoryUpdate(args.id, { status: args.status });
        return result;
    }),
    carCategorySort: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield carCategoryController_1.carCategorySort(args.list);
        return result;
    }),
};
exports.default = {
    CarCategory,
    Query,
    Mutation
};
