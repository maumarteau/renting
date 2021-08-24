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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../../entity/User");
const utils_1 = require("../../utils");
const security_1 = require("../../utils/security");
const userController_1 = require("../../controllers/userController");
const User = {};
const Query = {
    users: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        let query = yield utils_1.createListQuery(User_1.User, args, ctx);
        if (args.search) {
            const searchTerms = args.search.split(" ");
            searchTerms.forEach((searchTerm) => {
                query.andWhere("l.name like :name", { name: `%${searchTerm.toLowerCase()}%` });
                query.orWhere("l.email like :email", { email: `%${searchTerm.toLowerCase()}%` });
            });
        }
        const [items, totalCount] = yield query.getManyAndCount();
        return { data: items, pageInfo: { totalItems: totalCount } };
    }),
    user: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const item = yield utils_1.findOne(User_1.User, ctx, args.id);
        if (!item)
            throw new Error("User not found");
        return item;
    }),
    userLogged: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const { logged } = yield security_1.getAccount(ctx);
        console.log(logged);
        if (logged.userType != "user" || !logged.loggedId)
            throw new Error("Authentication error");
        const item = yield utils_1.findOne(User_1.User, ctx, logged.loggedId);
        console.log(item);
        if (item)
            return item;
        throw new Error("Authentication error");
    })
};
const Mutation = {
    userLogin: (_, { email, password, accessTo }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const auth = yield userController_1.userLogin(email, password, accessTo, ctx);
        return auth;
    }),
    userCreate: (_, { data }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        data.password = yield bcryptjs_1.default.hash(data.password, 10);
        const result = yield userController_1.userCreate(data);
        return result;
    }),
    userUpdate: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userController_1.userUpdate(args.id, args.data, ctx);
        const result = yield User_1.User.findOne(user.id, { relations: ["avatar"] });
        return result;
    }),
    userDelete: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userController_1.userDelete(args.id);
        return result;
    })
};
exports.default = {
    User,
    Query,
    Mutation
};
