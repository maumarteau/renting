import { Request, Response } from "express"
import { File as FileEntity } from "../entity/File"
import { nanoid } from "nanoid"
import { uploadFile } from "../utils/s3"
import { Readable } from "stream"

/****************************************************************************************/
/******************************************* UPLOAD ************************************/
/****************************************************************************************/

// Función para parsear multipart form data desde un buffer
function parseMultipartFormDataFromBuffer(buffer: Buffer, contentType: string): { file: Buffer, filename: string, mimetype: string } {
	// Extraer boundary del content-type
	const boundaryMatch = contentType.match(/boundary=(.+)$/)
	if (!boundaryMatch) {
		throw new Error('No se encontró boundary en Content-Type')
	}
	const boundary = '--' + boundaryMatch[1]
	const boundaryBuffer = Buffer.from(boundary)
	
	// Buscar el inicio del archivo
	const fileStart = buffer.indexOf(boundaryBuffer)
	if (fileStart === -1) {
		throw new Error('No se encontró el boundary inicial')
	}
	
	// Buscar el final del header del archivo
	const headerEnd = buffer.indexOf('\r\n\r\n', fileStart)
	if (headerEnd === -1) {
		throw new Error('No se encontró el final del header')
	}
	
	// Extraer información del header
	const header = buffer.slice(fileStart, headerEnd).toString()
	const filenameMatch = header.match(/filename="([^"]+)"/)
	const mimetypeMatch = header.match(/Content-Type:\s*([^\r\n]+)/)
	
	const filename = filenameMatch ? filenameMatch[1] : ''
	const mimetype = mimetypeMatch ? mimetypeMatch[1].trim() : ''
	
	// Buscar el final del archivo
	const fileEnd = buffer.indexOf(boundaryBuffer, headerEnd)
	if (fileEnd === -1) {
		throw new Error('No se encontró el boundary final')
	}
	
	// Extraer el contenido del archivo
	const fileContent = buffer.slice(headerEnd + 4, fileEnd - 2) // -2 para quitar \r\n
	
	return {
		file: fileContent,
		filename,
		mimetype
	}
}

export async function uploadFileREST(req: Request, res: Response): Promise<void> {
	try {
		// Verificar que tengamos el body como buffer
		if (!req.body || !Buffer.isBuffer(req.body)) {
			res.status(500).json({ 
				error: "Error de configuración del servidor",
				details: "El body no está disponible como Buffer"
			})
			return
		}
		
		// Parsear el formulario desde el buffer
		const contentType = req.headers['content-type'] || ''
		const { file: fileBuffer, filename: originalname, mimetype } = parseMultipartFormDataFromBuffer(req.body, contentType)
		
		// Verificar tipo de archivo
		const acceptedFiles = ["application/pdf", "text/plain", "application/octet-stream"]
		const acceptedImages = ["image/png", "image/jpeg", "image/gif", "image/jpg"]
		
		if (!acceptedFiles.includes(mimetype) && !acceptedImages.includes(mimetype)) {
			res.status(400).json({ error: "Tipo de archivo no permitido" })
			return
		}
		
		// Determinar tipo
		let type = null
		if (acceptedFiles.includes(mimetype)) {
			type = "file"
		}
		if (acceptedImages.includes(mimetype)) {
			type = "image"
		}
		
		// Procesar nombre del archivo
		const filenameSplitted = originalname.split(".")
		const extension = filenameSplitted.pop()
		const filename = filenameSplitted[0].replace(/[^a-z0-9]/gi, "_").toLowerCase() + "_" + nanoid() + "." + extension
		
		// Crear stream desde el buffer
		const createReadStream = () => {
			const stream = new Readable()
			stream.push(fileBuffer)
			stream.push(null)
			return stream
		}
		
		// Subir archivo a S3
		const uploadedFile = await uploadFile(createReadStream, filename)
		
		// Guardar en base de datos
		const fileData = {
			filename,
			url: uploadedFile.url,
			mimetype: mimetype || undefined,
			type: type || undefined,
			extension,
		}
		
		const newItem = FileEntity.create(fileData)
		const saved = await FileEntity.save(newItem)
		const result = await FileEntity.findOne({ where: { id: saved.id } })
		
		res.status(200).json({
			success: true,
			data: result
		})
		
	} catch (error) {
		console.error("Error en uploadFileREST:", error)
		res.status(500).json({ 
			error: "Error interno del servidor",
			details: error instanceof Error ? error.message : "Error desconocido"
		})
	}
}

/****************************************************************************************/
/******************************************* GET FILES *********************************/
/****************************************************************************************/

export async function getFiles(req: Request, res: Response): Promise<void> {
	try {
		console.log("getFiles")
		const files = await FileEntity.find()
		res.status(200).json({
			success: true,
			data: files
		})
	} catch (error) {
		console.error("Error en getFiles:", error)
		res.status(500).json({ 
			error: "Error interno del servidor",
			details: error instanceof Error ? error.message : "Error desconocido"
		})
	}
}

/****************************************************************************************/
/******************************************* GET FILE **********************************/
/****************************************************************************************/

export async function getFile(req: Request, res: Response): Promise<void> {
	try {
		console.log("getFile", req.params.id)
		const file = await FileEntity.findOne(req.params.id)
		
		if (!file) {
			res.status(404).json({ error: "Archivo no encontrado" })
			return
		}

		res.status(200).json({
			success: true,
			data: file
		})
	} catch (error) {
		console.error("Error en getFile:", error)
		res.status(500).json({ 
			error: "Error interno del servidor",
			details: error instanceof Error ? error.message : "Error desconocido"
		})
	}
}
