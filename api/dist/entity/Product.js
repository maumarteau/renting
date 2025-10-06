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
exports.getStatus = exports.Product = exports.ProductStatus = void 0;
const typeorm_1 = require("typeorm");
const File_1 = require("./File");
var ProductStatus;
(function (ProductStatus) {
    ProductStatus["ACTIVE"] = "ACTIVE";
    ProductStatus["INACTIVE"] = "INACTIVE";
    ProductStatus["SOLD"] = "SOLD";
})(ProductStatus = exports.ProductStatus || (exports.ProductStatus = {}));
let Product = class Product extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.parseSlug = () => __awaiter(this, void 0, void 0, function* () {
            this.slug = this.title.toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
        });
        this.assignOrder = () => __awaiter(this, void 0, void 0, function* () {
            const query = typeorm_1.createQueryBuilder("Product");
            query.select("MAX(Product.order)", "max");
            const result = yield query.getRawOne();
            (result && result.max > 0) ? this.order = result.max + 1 : this.order = 1;
        });
    }
    afterLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            let status = getStatus(this.status);
            if (status) {
                this.statusText = status.text;
                this.statusHelp = status.help;
                this.statusClass = status.class;
            }
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 200, unique: true }),
    __metadata("design:type", String)
], Product.prototype, "slug", void 0);
__decorate([
    typeorm_1.Column({ type: 'text' }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: "double precision", scale: 2 }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    typeorm_1.OneToMany(type => File_1.File, file => file.product),
    __metadata("design:type", Array)
], Product.prototype, "gallery", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "brand", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "model", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "year", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "mileage", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "fuel", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "transmission", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "color", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "contactPhone", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "contactEmail", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: ProductStatus,
        default: ProductStatus.ACTIVE
    }),
    __metadata("design:type", String)
], Product.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "order", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime' }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime' }),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.DeleteDateColumn({ type: 'datetime' }),
    __metadata("design:type", Date)
], Product.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.BeforeUpdate(),
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Object)
], Product.prototype, "parseSlug", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Object)
], Product.prototype, "assignOrder", void 0);
__decorate([
    typeorm_1.AfterLoad(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Product.prototype, "afterLoad", null);
Product = __decorate([
    typeorm_1.Entity({
        orderBy: {
            createdAt: 'DESC'
        }
    })
], Product);
exports.Product = Product;
function getStatus(status) {
    if (status == ProductStatus.ACTIVE) {
        return { text: "Activo", help: "Vehículo disponible", class: "success" };
    }
    if (status == ProductStatus.INACTIVE) {
        return { text: "Inactivo", help: "Vehículo no disponible", class: "warning" };
    }
    if (status == ProductStatus.SOLD) {
        return { text: "Vendido", help: "Vehículo vendido", class: "danger" };
    }
    return false;
}
exports.getStatus = getStatus;
