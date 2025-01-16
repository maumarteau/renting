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
exports.carCategorySort = exports.carCategoryDelete = exports.carCategoryUpdate = exports.carCategoryCreate = void 0;
const CarCategory_1 = require("../entity/CarCategory");
const CarCategoryImage_1 = require("../entity/CarCategoryImage");
const File_1 = require("../entity/File");
function carCategoryCreate(data, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("carCategoryCreate");
        console.log("data.gallery", data.gallery);
        let gallery = [];
        if (data.gallery) {
            for (const g of data.gallery) {
                const photo = yield File_1.File.findOne(g);
                console.log('photo', photo);
                if (photo)
                    gallery.push(photo);
            }
            data.gallery = gallery;
        }
        console.log("data.gallery", data.gallery);
        const result = yield CarCategory_1.CarCategory.create(data).save();
        return result;
    });
}
exports.carCategoryCreate = carCategoryCreate;
function carCategoryUpdate(id, data, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("carCategoryUpdate");
        console.log('data', data.gallery);
        const item = yield CarCategory_1.CarCategory.findOne(id, { relations: ['gallery'] });
        if (!item)
            throw new Error("CarCategory not found");
        if (data.images) {
            item.images = [];
            yield CarCategoryImage_1.CarCategoryImage.delete({ carCategory: item });
        }
        if (data.gallery) {
            item.gallery = [];
            data.gallery.forEach((g) => __awaiter(this, void 0, void 0, function* () {
                const photo = yield File_1.File.findOne(g);
                if (photo)
                    item.gallery.push(photo);
            }));
        }
        const result = yield CarCategory_1.CarCategory.merge(item, data).save();
        return result;
    });
}
exports.carCategoryUpdate = carCategoryUpdate;
function carCategoryDelete(id, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('carCategoryDelete');
        let carCategory = yield CarCategory_1.CarCategory.findOne(id);
        if (!carCategory)
            throw new Error("CarCategory not found");
        const result = carCategory;
        yield carCategory.remove().catch((err) => {
            console.log('err', err);
            throw new Error("CarCategory no se puede eliminar");
        });
        result.id = id;
        return result;
    });
}
exports.carCategoryDelete = carCategoryDelete;
function carCategorySort(list, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("carCategorySort", list);
        if (list && list.length > 0) {
            for (const item of list) {
                yield CarCategory_1.CarCategory.update(item.id, { order: item.order });
            }
        }
        return true;
    });
}
exports.carCategorySort = carCategorySort;
