"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingMaintenance = void 0;
const typeorm_1 = require("typeorm");
let BookingMaintenance = class BookingMaintenance extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], BookingMaintenance.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], BookingMaintenance.prototype, "car", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], BookingMaintenance.prototype, "mat", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], BookingMaintenance.prototype, "department", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], BookingMaintenance.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], BookingMaintenance.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], BookingMaintenance.prototype, "email", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: "datetime" }),
    __metadata("design:type", Date)
], BookingMaintenance.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: "datetime" }),
    __metadata("design:type", Date)
], BookingMaintenance.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.DeleteDateColumn({ type: "datetime" }),
    __metadata("design:type", Date)
], BookingMaintenance.prototype, "deletedAt", void 0);
BookingMaintenance = __decorate([
    typeorm_1.Entity({
        orderBy: {
            createdAt: "DESC"
        }
    })
], BookingMaintenance);
exports.BookingMaintenance = BookingMaintenance;
