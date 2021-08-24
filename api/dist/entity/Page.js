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
exports.Page = void 0;
const typeorm_1 = require("typeorm");
const File_1 = require("./File");
let Page = class Page extends typeorm_1.BaseEntity {
    afterLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            this.hasBody = (this.body) ? true : false;
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Page.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], Page.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ type: 'text' }),
    __metadata("design:type", String)
], Page.prototype, "intro", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Page.prototype, "body", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Page.prototype, "featured", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 150, nullable: true }),
    __metadata("design:type", String)
], Page.prototype, "link", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], Page.prototype, "slug", void 0);
__decorate([
    typeorm_1.ManyToOne(type => File_1.File),
    __metadata("design:type", File_1.File)
], Page.prototype, "image", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime' }),
    __metadata("design:type", Date)
], Page.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime' }),
    __metadata("design:type", Date)
], Page.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.DeleteDateColumn({ type: 'datetime' }),
    __metadata("design:type", Date)
], Page.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.AfterLoad(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Page.prototype, "afterLoad", null);
Page = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(['slug'])
], Page);
exports.Page = Page;
