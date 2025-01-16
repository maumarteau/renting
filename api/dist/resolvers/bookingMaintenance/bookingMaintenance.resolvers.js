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
const bookingMaintenanceController_1 = require("../../controllers/bookingMaintenanceController");
const BookingMaintenance_1 = require("../../entity/BookingMaintenance");
const utils_1 = require("../../utils");
const BookingMaintenance = {};
const Query = {
    bookingMaintenances: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        let query = yield utils_1.createListQuery(BookingMaintenance_1.BookingMaintenance, args, ctx);
        const [items, totalCount] = yield query.getManyAndCount();
        return { data: items, pageInfo: { totalItems: totalCount } };
    }),
    bookingMaintenance: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        let where = args.slug ? { slug: args.slug } : { id: args.id };
        const item = yield utils_1.findOne(BookingMaintenance_1.BookingMaintenance, ctx, undefined, { where, relations: ["image"] });
        if (!item)
            throw new Error("BookingMaintenance not found");
        return item;
    }),
};
const Mutation = {
    bookingMaintenanceCreate: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield bookingMaintenanceController_1.bookingMaintenanceCreate(args.data, ctx);
        return result;
    })
};
exports.default = {
    BookingMaintenance,
    Query,
    Mutation,
};
