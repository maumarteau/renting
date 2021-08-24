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
exports.getDataLoggedMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../entity/User");
function getDataLoggedMiddleware(req, res, next) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        let account = null;
        let logged = null;
        if (req.originalUrl != "/graphql" || req.body.operationName == "IntrospectionQuery")
            return next();
        if (!req.hostname.includes("local") && !req.hostname.includes("lestido") && !req.hostname.includes("54.232.166.19")) {
            throw new Error(`Unknown origin: ${req.hostname}`);
        }
        if (((_a = req.body) === null || _a === void 0 ? void 0 : _a.operationName) == "userLogin" && (((_c = (_b = req.body) === null || _b === void 0 ? void 0 : _b.variables) === null || _c === void 0 ? void 0 : _c.accessTo) == "admin" || ((_e = (_d = req.body) === null || _d === void 0 ? void 0 : _d.variables) === null || _e === void 0 ? void 0 : _e.accessTo) == "app"))
            return next();
        const Authorization = req.get("authorization");
        if (Authorization) {
            const token = Authorization.replace("Bearer ", "");
            logged = jsonwebtoken_1.default.verify(token, process.env.APP_SECRET || "secret");
        }
        if (req.body) {
            const args = req.body ? req.body.variables : null;
            if (!account && args) {
            }
            if (logged) {
                if (logged.userType == "user")
                    logged.user = yield User_1.User.findOne(logged.loggedId, { relations: ["office"] });
            }
            if (logged)
                req.logged = logged;
        }
        return next();
    });
}
exports.getDataLoggedMiddleware = getDataLoggedMiddleware;
