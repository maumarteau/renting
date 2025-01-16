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
exports.getStatus = exports.CarCategory = exports.CarCategoryStatus = void 0;
const typeorm_1 = require("typeorm");
const CarCategoryImage_1 = require("./CarCategoryImage");
const File_1 = require("./File");
var CarCategoryStatus;
(function (CarCategoryStatus) {
    CarCategoryStatus["ACTIVE"] = "ACTIVE";
    CarCategoryStatus["INACTIVE"] = "INACTIVE";
})(CarCategoryStatus = exports.CarCategoryStatus || (exports.CarCategoryStatus = {}));
let CarCategory = class CarCategory extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.parseSlug = () => __awaiter(this, void 0, void 0, function* () {
            this.slug = this.name.toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '');
        });
        this.assignOrder = () => __awaiter(this, void 0, void 0, function* () {
            const query = typeorm_1.createQueryBuilder("CarCategory");
            query.select("MAX(CarCategory.order)", "max");
            const result = yield query.getRawOne();
            (result && result.max > 0) ? this.order = result.max + 1 : this.order = 1;
            console.log(this.order);
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
], CarCategory.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], CarCategory.prototype, "slug", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], CarCategory.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], CarCategory.prototype, "similary", void 0);
__decorate([
    typeorm_1.ManyToOne(type => File_1.File),
    __metadata("design:type", File_1.File)
], CarCategory.prototype, "image", void 0);
__decorate([
    typeorm_1.ManyToOne(type => File_1.File),
    __metadata("design:type", File_1.File)
], CarCategory.prototype, "imageMain", void 0);
__decorate([
    typeorm_1.ManyToOne(type => File_1.File),
    __metadata("design:type", File_1.File)
], CarCategory.prototype, "dataSheet", void 0);
__decorate([
    typeorm_1.OneToMany(type => File_1.File, file => file.carCategory),
    __metadata("design:type", Array)
], CarCategory.prototype, "gallery", void 0);
__decorate([
    typeorm_1.OneToMany(type => CarCategoryImage_1.CarCategoryImage, carCategoryImage => carCategoryImage.carCategory, { cascade: true }),
    __metadata("design:type", Array)
], CarCategory.prototype, "images", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CarCategory.prototype, "featuredDetail", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], CarCategory.prototype, "detailTitle", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CarCategory.prototype, "intro", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CarCategory.prototype, "detail", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], CarCategory.prototype, "featured", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], CarCategory.prototype, "propAirConditioner", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], CarCategory.prototype, "propPassengers", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], CarCategory.prototype, "propDoors", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], CarCategory.prototype, "propLuggages", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], CarCategory.prototype, "propHandLuggages", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], CarCategory.prototype, "propTransmission", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], CarCategory.prototype, "propFuel", void 0);
__decorate([
    typeorm_1.Column({ type: "double precision", scale: 2, default: 0 }),
    __metadata("design:type", Number)
], CarCategory.prototype, "price", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], CarCategory.prototype, "conditions", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], CarCategory.prototype, "order", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: CarCategoryStatus,
        default: CarCategoryStatus.INACTIVE
    }),
    __metadata("design:type", String)
], CarCategory.prototype, "status", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime' }),
    __metadata("design:type", Date)
], CarCategory.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime' }),
    __metadata("design:type", Date)
], CarCategory.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.DeleteDateColumn({ type: 'datetime' }),
    __metadata("design:type", Date)
], CarCategory.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.BeforeUpdate(),
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Object)
], CarCategory.prototype, "parseSlug", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Object)
], CarCategory.prototype, "assignOrder", void 0);
__decorate([
    typeorm_1.AfterLoad(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CarCategory.prototype, "afterLoad", null);
CarCategory = __decorate([
    typeorm_1.Entity({
        orderBy: {
            order: 'DESC'
        }
    })
], CarCategory);
exports.CarCategory = CarCategory;
function getStatus(status) {
    if (status == CarCategoryStatus.ACTIVE) {
        return { text: "Activa", help: "Vehículo activo", class: "success" };
    }
    if (status == CarCategoryStatus.INACTIVE) {
        return { text: "Inactiva", help: "Vehículo inactivo", class: "warning" };
    }
    return false;
}
exports.getStatus = getStatus;
