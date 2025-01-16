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
exports.bookingMaintenanceCreate = void 0;
const BookingMaintenance_1 = require("../entity/BookingMaintenance");
function bookingMaintenanceCreate(data, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("bookingMaintenanceCreate", data);
        const item = yield BookingMaintenance_1.BookingMaintenance.create(data).save();
        return item;
    });
}
exports.bookingMaintenanceCreate = bookingMaintenanceCreate;
