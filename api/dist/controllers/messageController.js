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
exports.messageReaded = exports.messageCreate = void 0;
const Message_1 = require("../entity/Message");
const email_1 = require("../utils/email");
function messageCreate(data, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("messageCreate", data);
        const item = yield Message_1.Message.create(data).save();
        const message = `
	Nombre: ${item.name} <br>
	Email: ${item.email}<br>
	Tel: ${item.phone}<br>
	${item.message}`;
        if (item.subject == "Agenda mantenimiento") {
            email_1.emailSend("service@renting.com.uy", item.subject, message);
        }
        else {
            email_1.emailSend("mauricemarteau.web@gmail.com", item.subject, message);
        }
        return item;
    });
}
exports.messageCreate = messageCreate;
function messageReaded(id, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = yield Message_1.Message.findOneOrFail(id);
        if (!message)
            throw new Error("CarCategory not found");
        message.readed = true;
        const result = yield message.save();
        return result;
    });
}
exports.messageReaded = messageReaded;
