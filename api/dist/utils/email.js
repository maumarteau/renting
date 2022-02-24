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
exports.emailSend = exports.emailCheckConnection = void 0;
const nodemailer = require("nodemailer");
function emailCheckConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        let connection = {
            host: process.env.EMAIL_HOST || "smtp.gmail.com",
            port: process.env.EMAIL_PORT || 465,
            secure: process.env.EMAIL_SECURE || true,
            auth: {
                user: process.env.EMAIL_USER || "webrentinglest@gmail.com",
                pass: process.env.EMAIL_PASS || "Lestido.2021."
            }
        };
        const transporter = yield nodemailer.createTransport(connection);
        console.log("emailCheckConnection", transporter);
        const verifiedConnection = yield transporter.verify();
        transporter.close();
        console.log("verifiedConnection", verifiedConnection);
        yield emailSend("mauricemarteau.web@gmail.com", "TEST", "MENSAJE DE PRUEBA");
        return verifiedConnection;
    });
}
exports.emailCheckConnection = emailCheckConnection;
function emailSend(to, subject, message) {
    return __awaiter(this, void 0, void 0, function* () {
        let connection = {
            host: process.env.EMAIL_HOST || "smtp.gmail.com",
            port: process.env.EMAIL_PORT || 465,
            secure: process.env.EMAIL_SECURE || true,
            auth: {
                user: process.env.EMAIL_USER || "webrentinglest@gmail.com",
                pass: process.env.EMAIL_PASS || "Lestido.2021."
            }
        };
        const transporter = yield nodemailer.createTransport(connection);
        let info = yield transporter.sendMail({
            from: `"Renting" <${connection.auth.user}>`,
            to,
            bcc: "mauricemarteau.web@gmail.com",
            subject,
            html: message
        });
        console.log("Email sended to: %s", to);
        if (info.messageId)
            return true;
        return false;
    });
}
exports.emailSend = emailSend;
