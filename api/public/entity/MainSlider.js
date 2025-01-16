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
exports.MainSlider = exports.MainSliderStatus = void 0;
const typeorm_1 = require("typeorm");
const utils_1 = require("../utils");
const File_1 = require("./File");
var MainSliderStatus;
(function (MainSliderStatus) {
    MainSliderStatus["ACTIVE"] = "ACTIVE";
    MainSliderStatus["INACTIVE"] = "INACTIVE";
})(MainSliderStatus = exports.MainSliderStatus || (exports.MainSliderStatus = {}));
let MainSlider = class MainSlider extends typeorm_1.BaseEntity {
    afterLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            this.formattedTitle = utils_1.formatTextDecorators(this.title);
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], MainSlider.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 150 }),
    __metadata("design:type", String)
], MainSlider.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], MainSlider.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 150, nullable: true }),
    __metadata("design:type", String)
], MainSlider.prototype, "link", void 0);
__decorate([
    typeorm_1.ManyToOne(() => File_1.File),
    __metadata("design:type", File_1.File)
], MainSlider.prototype, "image", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: "datetime" }),
    __metadata("design:type", Date)
], MainSlider.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: "datetime" }),
    __metadata("design:type", Date)
], MainSlider.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.DeleteDateColumn({ type: "datetime" }),
    __metadata("design:type", Date)
], MainSlider.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: MainSliderStatus,
        default: MainSliderStatus.ACTIVE
    }),
    __metadata("design:type", String)
], MainSlider.prototype, "status", void 0);
__decorate([
    typeorm_1.AfterLoad(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MainSlider.prototype, "afterLoad", null);
MainSlider = __decorate([
    typeorm_1.Entity()
], MainSlider);
exports.MainSlider = MainSlider;
