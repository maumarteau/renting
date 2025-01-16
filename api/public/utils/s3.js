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
exports.isFileExists = exports.copyFile = exports.uploadFile = void 0;
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const request_1 = __importDefault(require("request"));
function uploadFile(createReadStream, filename) {
    return __awaiter(this, void 0, void 0, function* () {
        const region = process.env.AWS_BUCKET_REGION;
        const bucketName = process.env.AWS_BUCKET_NAME;
        const accessKeyId = process.env.AWS_ACCESS_KEY;
        const secretAccessKey = process.env.AWS_SECRET_KEY;
        const s3 = new s3_1.default({
            region,
            accessKeyId,
            secretAccessKey
        });
        const stream = createReadStream();
        const uploadParams = {
            Bucket: bucketName,
            Body: stream,
            Key: `uploads/${filename}`
        };
        const uploadedData = yield s3
            .upload(uploadParams, function (err, data) {
            console.log(err, data);
        })
            .promise();
        console.log(uploadedData.Location);
        return { url: uploadedData.Location };
    });
}
exports.uploadFile = uploadFile;
function copyFile(fileOrigin) {
    return __awaiter(this, void 0, void 0, function* () {
        const region = process.env.AWS_BUCKET_REGION;
        const bucketName = process.env.AWS_BUCKET_NAME;
        const accessKeyId = process.env.AWS_ACCESS_KEY;
        const secretAccessKey = process.env.AWS_SECRET_KEY;
        const s3 = new s3_1.default({
            region,
            accessKeyId,
            secretAccessKey
        });
        const filename = fileOrigin.substring(fileOrigin.lastIndexOf('/') + 1);
        return new Promise(function (resolve, reject) {
            request_1.default({
                url: fileOrigin,
                encoding: null
            }, (err, res, body) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.log('errerrerrerrerr', err);
                    reject(err);
                }
                const uploadParams = {
                    Bucket: bucketName,
                    Body: body,
                    Key: `uploads/${filename}`
                };
                const uploadedData = yield s3
                    .upload(uploadParams, function (err, data) {
                    console.log('UPLOAD', err, data);
                })
                    .promise();
                resolve({ filename, url: uploadedData.Location });
            }));
        });
    });
}
exports.copyFile = copyFile;
function isFileExists(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('isFileExists', filename);
        const region = process.env.AWS_BUCKET_REGION;
        const bucketName = process.env.AWS_BUCKET_NAME || '';
        const accessKeyId = process.env.AWS_ACCESS_KEY;
        const secretAccessKey = process.env.AWS_SECRET_KEY;
        const s3 = new s3_1.default({
            region,
            accessKeyId,
            secretAccessKey
        });
        let fileExists = yield s3.headObject({ Bucket: bucketName, Key: `uploads/${filename}` }).promise().catch(() => false);
        if (fileExists) {
            fileExists = { filename, url: `https://${bucketName}.s3-${region}.amazonaws.com/uploads/${filename}` };
        }
        return fileExists;
    });
}
exports.isFileExists = isFileExists;
