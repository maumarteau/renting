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
exports.formatTextDecorators = exports.findOne = exports.createListQuery = void 0;
const security_1 = require("./security");
function createListQuery(entity, args, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = entity.createQueryBuilder("l");
        if (args.take) {
            query.take(args.take);
        }
        if (args.skip) {
            query.skip(args.skip);
        }
        return query;
    });
}
exports.createListQuery = createListQuery;
function findOne(entity, ctx, id, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = {};
        const { logged } = yield security_1.getAccount(ctx);
        if (ctx.req && logged && logged.userType == "user") {
            options.withDeleted = true;
        }
        if (id) {
            query = entity.findOne(id, options);
        }
        else {
            query = entity.findOne(options);
        }
        return query;
    });
}
exports.findOne = findOne;
function formatTextDecorators(string) {
    string = string.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
    string = string.replace(/\_(.*?)\_/g, '<em>$1</em>');
    string = string.replace(/\~(.*?)\~/g, '<del>$1</del>');
    return string;
}
exports.formatTextDecorators = formatTextDecorators;
class AuthError extends Error {
    constructor() {
        super("Not authorized");
    }
}
