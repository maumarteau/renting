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
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const http_1 = __importDefault(require("http"));
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale("es");
const typeorm_1 = require("typeorm");
const typeorm_global_scopes_1 = require("typeorm-global-scopes");
const email_1 = require("./utils/email");
const functions = require("@google-cloud/functions-framework");
const typeDefs_1 = __importDefault(require("./resolvers/typeDefs"));
const resolvers_1 = __importDefault(require("./resolvers/resolvers"));
const app = express_1.default();
const pubsub = new apollo_server_express_1.PubSub();
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers: resolvers_1.default,
    subscriptions: "/subscriptions",
    context: (context) => {
        return Object.assign(Object.assign({}, context), { pubsub });
    },
});
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb" }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Connecting...");
        typeorm_global_scopes_1.patchSelectQueryBuilder();
        let connectionOptions = yield typeorm_1.getConnectionOptions();
        yield typeorm_1.createConnection(connectionOptions);
        console.log("TypeORM connected");
        console.log('Server running at http://localhost:3000');
    });
})();
if (process.env.NODE_ENV === "production") {
    app.use("/uploads", express_1.default.static(__dirname + "/../uploads"));
    app.use("/assets/brands", express_1.default.static(__dirname + "/../assets/brands"));
}
else {
    app.use("/uploads", express_1.default.static("./uploads"));
    app.use("/assets/brands", express_1.default.static("./assets/brands"));
}
app.get("/", (req, res) => {
    res.send("Hey, what are you trying to see around here?.");
});
app.get("/test", (req, res) => {
    res.send("Working OK.");
});
app.get("/check-email-connection", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isOk = yield email_1.emailCheckConnection();
    res.send(isOk);
}));
let isApolloServerInitialized = false;
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        if (isApolloServerInitialized)
            return;
        yield server.start();
        server.applyMiddleware({ app });
        const httpServer = http_1.default.createServer(app);
        server.installSubscriptionHandlers(httpServer);
        console.log("Apollo Server started. Subscriptions ready at /subscriptions.");
        isApolloServerInitialized = true;
    });
}
functions.http("api", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!isApolloServerInitialized) {
        yield startApolloServer();
    }
    app(req, res);
}));
