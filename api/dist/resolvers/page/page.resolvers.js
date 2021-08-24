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
const Page_1 = require("../../entity/Page");
const utils_1 = require("../../utils");
const Page = {};
const Query = {
    pages: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        let query = yield utils_1.createListQuery(Page_1.Page, args, ctx);
        if (args.search) {
            const searchTerms = args.search.split(" ");
            searchTerms.forEach((searchTerm) => {
                query.andWhere("l.title like :title", { title: `%${searchTerm.toLowerCase()}%` });
            });
        }
        if (args.featured) {
            query.andWhere("l.featured=1");
        }
        query.leftJoinAndSelect("l.image", "image");
        const [items, totalCount] = yield query.getManyAndCount();
        return { data: items, pageInfo: { totalItems: totalCount } };
    }),
    page: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        let where = args.slug ? { slug: args.slug } : { id: args.id };
        const item = yield utils_1.findOne(Page_1.Page, ctx, undefined, { where, relations: ["image"] });
        if (!item)
            throw new Error("Page not found");
        return item;
    }),
    pageCheckSlug: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        let page = null;
        if (args.slug) {
            page = yield utils_1.findOne(Page_1.Page, ctx, _, { where: { slug: args.slug } });
        }
        return page;
    })
};
const Mutation = {
    pageCreate: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const newItem = Page_1.Page.create(args.data);
        const result = yield Page_1.Page.save(newItem);
        return result;
    }),
    pageUpdate: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const item = yield utils_1.findOne(Page_1.Page, ctx, args.id);
        if (!item)
            throw new Error("Page not found");
        Page_1.Page.merge(item, args.data);
        const result = yield Page_1.Page.save(item);
        return result;
    }),
    pageDelete: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const item = yield utils_1.findOne(Page_1.Page, ctx, args.id);
        if (!item)
            throw new Error("Page not found");
        const result = Object.assign({}, item);
        yield item.remove().catch(() => {
            throw new Error("Page no se puede eliminar");
        });
        return result;
    })
};
exports.default = {
    Page,
    Query,
    Mutation
};
