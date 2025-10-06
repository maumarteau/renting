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
exports.productSort = exports.productDelete = exports.productUpdate = exports.productCreate = void 0;
const Product_1 = require("../entity/Product");
const File_1 = require("../entity/File");
function productCreate(data, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("productCreate");
        console.log("data.gallery", data.gallery);
        let files = [];
        if (data.gallery) {
            for (const f of data.gallery) {
                const file = yield File_1.File.findOne(f);
                console.log('file', file);
                if (file)
                    files.push(file);
            }
            data.gallery = files;
        }
        console.log("data.gallery", data.gallery);
        const result = yield Product_1.Product.create(data).save();
        return result;
    });
}
exports.productCreate = productCreate;
function productUpdate(id, data, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("productUpdate");
        console.log('data', data.gallery);
        const item = yield Product_1.Product.findOne(id, { relations: ['files'] });
        if (!item)
            throw new Error("Product not found");
        if (data.gallery) {
            item.gallery = [];
            data.gallery.forEach((f) => __awaiter(this, void 0, void 0, function* () {
                const file = yield File_1.File.findOne(f);
                if (file)
                    item.gallery.push(file);
            }));
        }
        const result = yield Product_1.Product.merge(item, data).save();
        return result;
    });
}
exports.productUpdate = productUpdate;
function productDelete(id, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('productDelete');
        let product = yield Product_1.Product.findOne(id);
        if (!product)
            throw new Error("Product not found");
        const result = product;
        yield product.remove().catch((err) => {
            console.log('err', err);
            throw new Error("Product no se puede eliminar");
        });
        result.id = id;
        return result;
    });
}
exports.productDelete = productDelete;
function productSort(list, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("productSort", list);
        if (list && list.length > 0) {
            for (const item of list) {
                yield Product_1.Product.update(item.id, { order: item.order });
            }
        }
        return true;
    });
}
exports.productSort = productSort;
