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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.File = void 0;
const typeorm_1 = require("typeorm");
const fs_1 = __importDefault(require("fs"));
const CarCategory_1 = require("./CarCategory");
let File = class File extends typeorm_1.BaseEntity {
    afterLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            this.urlThumb = this.url;
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], File.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 200 }),
    __metadata("design:type", String)
], File.prototype, "filename", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar" }),
    __metadata("design:type", String)
], File.prototype, "url", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], File.prototype, "urlThumb", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 20 }),
    __metadata("design:type", String)
], File.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 20 }),
    __metadata("design:type", String)
], File.prototype, "extension", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: "datetime" }),
    __metadata("design:type", Date)
], File.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: "datetime" }),
    __metadata("design:type", Date)
], File.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.DeleteDateColumn({ type: "datetime" }),
    __metadata("design:type", Date)
], File.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => CarCategory_1.CarCategory, carCategory => carCategory.gallery),
    typeorm_1.JoinColumn({ name: 'carCategoryId', referencedColumnName: 'id' }),
    __metadata("design:type", CarCategory_1.CarCategory)
], File.prototype, "carCategory", void 0);
__decorate([
    typeorm_1.AfterLoad(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], File.prototype, "afterLoad", null);
File = __decorate([
    typeorm_1.Entity()
], File);
exports.File = File;
function deleteFile(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("deleteFile");
        const file = yield File.findOneOrFail(id);
        if (file.url && fs_1.default.existsSync(file.url))
            fs_1.default.unlinkSync(file.url);
        return yield file.remove();
    });
}
exports.deleteFile = deleteFile;
