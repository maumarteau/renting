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
exports.getFile = exports.getFiles = exports.uploadFileREST = void 0;
const File_1 = require("../entity/File");
const nanoid_1 = require("nanoid");
const s3_1 = require("../utils/s3");
const stream_1 = require("stream");
function parseMultipartFormDataFromBuffer(buffer, contentType) {
    const boundaryMatch = contentType.match(/boundary=(.+)$/);
    if (!boundaryMatch) {
        throw new Error('No se encontró boundary en Content-Type');
    }
    const boundary = '--' + boundaryMatch[1];
    const boundaryBuffer = Buffer.from(boundary);
    const fileStart = buffer.indexOf(boundaryBuffer);
    if (fileStart === -1) {
        throw new Error('No se encontró el boundary inicial');
    }
    const headerEnd = buffer.indexOf('\r\n\r\n', fileStart);
    if (headerEnd === -1) {
        throw new Error('No se encontró el final del header');
    }
    const header = buffer.slice(fileStart, headerEnd).toString();
    const filenameMatch = header.match(/filename="([^"]+)"/);
    const mimetypeMatch = header.match(/Content-Type:\s*([^\r\n]+)/);
    const filename = filenameMatch ? filenameMatch[1] : '';
    const mimetype = mimetypeMatch ? mimetypeMatch[1].trim() : '';
    const fileEnd = buffer.indexOf(boundaryBuffer, headerEnd);
    if (fileEnd === -1) {
        throw new Error('No se encontró el boundary final');
    }
    const fileContent = buffer.slice(headerEnd + 4, fileEnd - 2);
    return {
        file: fileContent,
        filename,
        mimetype
    };
}
function uploadFileREST(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body || !Buffer.isBuffer(req.body)) {
                res.status(500).json({
                    error: "Error de configuración del servidor",
                    details: "El body no está disponible como Buffer"
                });
                return;
            }
            const contentType = req.headers['content-type'] || '';
            const { file: fileBuffer, filename: originalname, mimetype } = parseMultipartFormDataFromBuffer(req.body, contentType);
            const acceptedFiles = ["application/pdf", "text/plain", "application/octet-stream"];
            const acceptedImages = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
            if (!acceptedFiles.includes(mimetype) && !acceptedImages.includes(mimetype)) {
                res.status(400).json({ error: "Tipo de archivo no permitido" });
                return;
            }
            let type = null;
            if (acceptedFiles.includes(mimetype)) {
                type = "file";
            }
            if (acceptedImages.includes(mimetype)) {
                type = "image";
            }
            const filenameSplitted = originalname.split(".");
            const extension = filenameSplitted.pop();
            const filename = filenameSplitted[0].replace(/[^a-z0-9]/gi, "_").toLowerCase() + "_" + nanoid_1.nanoid() + "." + extension;
            const createReadStream = () => {
                const stream = new stream_1.Readable();
                stream.push(fileBuffer);
                stream.push(null);
                return stream;
            };
            const uploadedFile = yield s3_1.uploadFile(createReadStream, filename);
            const fileData = {
                filename,
                url: uploadedFile.url,
                mimetype: mimetype || undefined,
                type: type || undefined,
                extension,
            };
            const newItem = File_1.File.create(fileData);
            const saved = yield File_1.File.save(newItem);
            const result = yield File_1.File.findOne({ where: { id: saved.id } });
            res.status(200).json({
                success: true,
                data: result
            });
        }
        catch (error) {
            console.error("Error en uploadFileREST:", error);
            res.status(500).json({
                error: "Error interno del servidor",
                details: error instanceof Error ? error.message : "Error desconocido"
            });
        }
    });
}
exports.uploadFileREST = uploadFileREST;
function getFiles(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("getFiles");
            const files = yield File_1.File.find();
            res.status(200).json({
                success: true,
                data: files
            });
        }
        catch (error) {
            console.error("Error en getFiles:", error);
            res.status(500).json({
                error: "Error interno del servidor",
                details: error instanceof Error ? error.message : "Error desconocido"
            });
        }
    });
}
exports.getFiles = getFiles;
function getFile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("getFile", req.params.id);
            const file = yield File_1.File.findOne(req.params.id);
            if (!file) {
                res.status(404).json({ error: "Archivo no encontrado" });
                return;
            }
            res.status(200).json({
                success: true,
                data: file
            });
        }
        catch (error) {
            console.error("Error en getFile:", error);
            res.status(500).json({
                error: "Error interno del servidor",
                details: error instanceof Error ? error.message : "Error desconocido"
            });
        }
    });
}
exports.getFile = getFile;
