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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processUpload = void 0;
const nanoid_1 = require("nanoid");
const fs_1 = __importDefault(require("fs"));
const node_thumbnail_1 = __importDefault(require("node-thumbnail"));
const s3_1 = require("./s3");
require("dotenv").config();
const API_URL = process.env.API_URL || "";
const uploadfolder = process.env.NODE_ENV == "production" ? __dirname + "/../../uploads" : "./uploads";
const uploadfolderThumbs = process.env.NODE_ENV == "production" ? __dirname + "/../../uploads/thumbs" : "./uploads/thumbs";
function processUpload(upload, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("processUpload");
        var uploadedFile = {};
        var type = null;
        var thumb = null;
        var extension = null;
        let { createReadStream, filename, mimetype, encoding } = yield upload;
        const filenameSplitted = filename.split(".");
        extension = filenameSplitted.pop();
        filename = filenameSplitted[0].replace(/[^a-z0-9]/gi, "_").toLowerCase() + "_" + nanoid_1.nanoid() + "." + extension;
        const acceptedFiles = ["application/pdf", "text/plain", "application/octet-stream"];
        const acceptedImages = ["image/png", "image/jpeg", "image/gif"];
        if (acceptedFiles.includes(mimetype)) {
            type = "file";
        }
        if (acceptedImages.includes(mimetype)) {
            type = "image";
        }
        if (type) {
            uploadedFile = yield s3_1.uploadFile(createReadStream, filename);
            console.log("uploadedFile", uploadedFile);
        }
        else {
            throw new Error("Archivo no permitido");
        }
        if (type == "image") {
        }
        return {
            filename,
            url: uploadedFile.url,
            mimetype,
            type,
            extension,
        };
    });
}
exports.processUpload = processUpload;
const uploadToServer = ({ createReadStream, filename }) => __awaiter(void 0, void 0, void 0, function* () {
    const id = nanoid_1.nanoid();
    const path = `${uploadfolder}/${id}-${filename}`;
    const url = `${uploadfolder}/${id}-${filename}`;
    return new Promise((resolve, reject) => createReadStream()
        .pipe(fs_1.default.createWriteStream(path))
        .on("finish", () => __awaiter(void 0, void 0, void 0, function* () {
        resolve({ id, url: `uploads/${id}-${filename}` });
    }))
        .on("error", reject));
});
const generateThumb = ({ uploadedFile, filename }) => __awaiter(void 0, void 0, void 0, function* () {
    const urlThumb = `${uploadfolderThumbs}/${uploadedFile.id}-${filename}`;
    return node_thumbnail_1.default
        .thumb({
        source: `${uploadfolder}/${uploadedFile.id}-${filename}`,
        destination: `${uploadfolderThumbs}`,
        width: 400,
        quiet: true,
        suffix: "",
        concurrency: 4
    })
        .then(function () {
        return `uploads/thumbs/${uploadedFile.id}-${filename}`;
    });
});
