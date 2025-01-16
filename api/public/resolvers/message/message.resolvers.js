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
const messageController_1 = require("../../controllers/messageController");
const Message_1 = require("../../entity/Message");
const utils_1 = require("../../utils");
const Message = {};
const Query = {
    messages: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        let query = yield utils_1.createListQuery(Message_1.Message, args, ctx);
        const [items, totalCount] = yield query.getManyAndCount();
        return { data: items, pageInfo: { totalItems: totalCount } };
    })
};
const Mutation = {
    messageCreate: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield messageController_1.messageCreate(args.data, ctx);
        return result;
    }),
    messageReaded: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield messageController_1.messageReaded(args.id, ctx);
        return result;
    })
};
exports.default = {
    Message,
    Query,
    Mutation,
};
