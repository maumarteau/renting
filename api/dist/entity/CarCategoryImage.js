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
exports.CarCategoryImage = void 0;
const typeorm_1 = require("typeorm");
const CarCategory_1 = require("./CarCategory");
const File_1 = require("./File");
let CarCategoryImage = class CarCategoryImage extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], CarCategoryImage.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => CarCategory_1.CarCategory),
    __metadata("design:type", CarCategory_1.CarCategory)
], CarCategoryImage.prototype, "carCategory", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 150 }),
    __metadata("design:type", String)
], CarCategoryImage.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CarCategoryImage.prototype, "body", void 0);
__decorate([
    typeorm_1.ManyToOne(() => File_1.File, { nullable: true }),
    __metadata("design:type", File_1.File)
], CarCategoryImage.prototype, "image", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: "datetime" }),
    __metadata("design:type", Date)
], CarCategoryImage.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: "datetime" }),
    __metadata("design:type", Date)
], CarCategoryImage.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.DeleteDateColumn({ type: "datetime" }),
    __metadata("design:type", Date)
], CarCategoryImage.prototype, "deletedAt", void 0);
CarCategoryImage = __decorate([
    typeorm_1.Entity()
], CarCategoryImage);
exports.CarCategoryImage = CarCategoryImage;
