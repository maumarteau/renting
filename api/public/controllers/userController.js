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
exports.userLogin = exports.userDelete = exports.userUpdate = exports.userCreate = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = require("../entity/User");
function userCreate(data, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("userCreate");
        const result = yield User_1.User.create(data).save();
        return result;
    });
}
exports.userCreate = userCreate;
function userUpdate(id, data, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("userUpdate", id);
        const item = yield User_1.User.findOne(id);
        if (!item)
            throw new Error("User not found");
        const result = yield User_1.User.merge(item, data).save();
        return result;
    });
}
exports.userUpdate = userUpdate;
function userDelete(id, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("carDelete", id);
        const item = yield User_1.User.findOne(id, { loadEagerRelations: false });
        if (!item)
            throw new Error("User not found");
        const result = Object.assign({}, item);
        yield item.remove().catch(() => {
            throw new Error(`The user ${item.name} ${item.lastname} cannot be deleted`);
        });
        result.id = id;
        return result;
    });
}
exports.userDelete = userDelete;
function userLogin(email, password, accessTo, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({ where: { email }, relations: ["avatar"] });
        if (!user)
            throw new Error(`No client found for email: ${email}`);
        if (!user) {
            throw new Error(`No user found for email: ${email}`);
        }
        const passwordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordValid) {
            throw new Error("Invalid password");
        }
        return {
            token: jsonwebtoken_1.sign({
                loggedId: user.id,
                userType: "user"
            }, process.env.APP_SECRET || "secret"),
            user
        };
    });
}
exports.userLogin = userLogin;
