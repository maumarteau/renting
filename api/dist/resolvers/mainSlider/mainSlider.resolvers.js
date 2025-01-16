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
const MainSlider_1 = require("../../entity/MainSlider");
const utils_1 = require("../../utils");
const MainSlider = {};
const Query = {
    mainSliders: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        let query = yield utils_1.createListQuery(MainSlider_1.MainSlider, args, ctx);
        if (args.search) {
            const searchTerms = args.search.split(" ");
            searchTerms.forEach((searchTerm) => {
                query.andWhere("l.title like :title", { title: `%${searchTerm.toLowerCase()}%` });
            });
        }
        query.leftJoinAndSelect("l.image", "image");
        const [items, totalCount] = yield query.getManyAndCount();
        return { data: items, pageInfo: { totalItems: totalCount } };
    }),
    mainSlider: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const item = yield utils_1.findOne(MainSlider_1.MainSlider, ctx, args.id, { relations: ["image"] });
        if (!item)
            throw new Error("MainSlider not found");
        return item;
    })
};
const Mutation = {
    mainSliderCreate: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const newItem = MainSlider_1.MainSlider.create(args.data);
        const result = yield MainSlider_1.MainSlider.save(newItem);
        return result;
    }),
    mainSliderUpdate: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const item = yield utils_1.findOne(MainSlider_1.MainSlider, ctx, args.id);
        if (!item)
            throw new Error("MainSlider not found");
        MainSlider_1.MainSlider.merge(item, args.data);
        const result = yield MainSlider_1.MainSlider.save(item);
        return result;
    }),
    mainSliderDelete: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const item = yield utils_1.findOne(MainSlider_1.MainSlider, ctx, args.id);
        if (!item)
            throw new Error("MainSlider not found");
        const result = Object.assign({}, item);
        yield item.remove().catch(() => {
            throw new Error("MainSlider no se puede eliminar");
        });
        return result;
    })
};
exports.default = {
    MainSlider,
    Query,
    Mutation
};
