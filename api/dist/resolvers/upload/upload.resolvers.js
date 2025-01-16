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
const File_1 = require("../../entity/File");
const uploads_1 = require("../../utils/uploads");
const File = {};
const Query = {
    files: () => __awaiter(void 0, void 0, void 0, function* () {
        const items = yield File_1.File.find();
        return items;
    }),
    file: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
        const item = yield File_1.File.findOne(args.id);
        if (item) {
            return item;
        }
        throw new Error("File not found");
    })
};
const Mutation = {
    uploadFile: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        let image = yield uploads_1.processUpload(args.file, ctx);
        if (image) {
            const newItem = File_1.File.create(image);
            const saved = yield File_1.File.save(newItem);
            if (saved)
                return yield File_1.File.findOne(saved.id);
        }
        return null;
    })
};
exports.default = {
    File,
    Query,
    Mutation
};
