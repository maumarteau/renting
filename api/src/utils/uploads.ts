import { nanoid } from "nanoid"
import fs from "fs"
// @ts-ignore
import thumb from "node-thumbnail"
import { uploadFile } from "./s3"

require("dotenv").config()

const API_URL = process.env.API_URL || ""
const uploadfolder = process.env.NODE_ENV == "production" ? __dirname + "/../../uploads" : "./uploads"
const uploadfolderThumbs = process.env.NODE_ENV == "production" ? __dirname + "/../../uploads/thumbs" : "./uploads/thumbs"

export async function processUpload(upload: any, ctx: any) {
	console.log("processUpload")
	
	var uploadedFile: any = {}
	var type = null
	var thumb = null
	var extension = null

	let { createReadStream, filename, mimetype, encoding } = await upload

	const filenameSplitted = filename.split(".")
	extension = filenameSplitted.pop()
	filename = filenameSplitted[0].replace(/[^a-z0-9]/gi, "_").toLowerCase() + "_"+nanoid()+"." + extension

	const acceptedFiles = ["application/pdf", "text/plain", "application/octet-stream"]
	const acceptedImages = ["image/png", "image/jpeg", "image/gif"]

	if (acceptedFiles.includes(mimetype)) {
		type = "file"
	}
	if (acceptedImages.includes(mimetype)) {
		type = "image"
	}

	if (type) {
		uploadedFile = await uploadFile(createReadStream, filename)
		console.log("uploadedFile", uploadedFile)
	} else {
		throw new Error("Archivo no permitido")
	}

	if (type == "image") {
		// if (process.env.NODE_ENV != "production") {
		// 	console.log("generating Thumbnail")
		// 	thumb = await generateThumb({ uploadedFile, filename })
		// }
	}

	return {
		filename,
		url: uploadedFile.url,
		// urlThumb: thumb,
		mimetype,
		type,
		extension,
	}
}

const uploadToServer = async ({ createReadStream, filename }: any) => {
	const id = nanoid()
	// if (!fs.existsSync(uploadfolder)) {
	// 	await fs.promises.mkdir(uploadfolder, { recursive: true })
	// }
	const path = `${uploadfolder}/${id}-${filename}`

	const url = `${uploadfolder}/${id}-${filename}`
	return new Promise((resolve, reject) =>
		createReadStream()
			.pipe(fs.createWriteStream(path))
			.on("finish", async () => {
				resolve({ id, url: `uploads/${id}-${filename}` })
			})
			.on("error", reject)
	)
}

const generateThumb = async ({ uploadedFile, filename }: any) => {
	// if (!fs.existsSync(uploadfolderThumbs)) {
	// 	await fs.promises.mkdir(uploadfolderThumbs, { recursive: true })
	// }
	const urlThumb = `${uploadfolderThumbs}/${uploadedFile.id}-${filename}`
	return thumb
		.thumb({
			source: `${uploadfolder}/${uploadedFile.id}-${filename}`,
			destination: `${uploadfolderThumbs}`,
			width: 400,
			quiet: true,
			suffix: "",
			concurrency: 4
		})
		.then(function () {
			return `uploads/thumbs/${uploadedFile.id}-${filename}`
		})
}
