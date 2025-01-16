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
exports.getAccount = exports.iCanDoIt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../entity/User");
function iCanDoIt(permission, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!ctx)
            throw new Error("Context not found");
        const { logged } = yield getAccount(ctx);
        if (!logged)
            throw new Error("Authorization fail");
        let user;
        if (logged.userType == "user")
            user = logged.user;
        if (!user.permissions[permission]) {
            throw new Error("You dont have permission to perform this action");
        }
        return true;
    });
}
exports.iCanDoIt = iCanDoIt;
function getAccount(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        let logged = null;
        const Authorization = ctx.req.get("authorization");
        if (Authorization) {
            const token = Authorization.replace("Bearer ", "");
            logged = jsonwebtoken_1.default.verify(token, process.env.APP_SECRET || "secret");
        }
        if (ctx.req.body) {
            const args = ctx.req.body ? ctx.req.body.variables : null;
        }
        if (logged) {
            logged.user = yield User_1.User.findOne(logged.loggedId);
        }
        return { logged };
    });
}
exports.getAccount = getAccount;
