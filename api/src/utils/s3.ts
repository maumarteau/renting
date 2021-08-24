import S3 from "aws-sdk/clients/s3"
import fs from "fs"
import  request from "request"
import { Any } from "typeorm"
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

// const bucketName = process.env.AWS_BUCKET_NAME

// uploads a file to S3
export async function uploadFile(createReadStream: any, filename: string) {
	const region = process.env.AWS_BUCKET_REGION
	const bucketName = process.env.AWS_BUCKET_NAME
	const accessKeyId = process.env.AWS_ACCESS_KEY
	const secretAccessKey = process.env.AWS_SECRET_KEY

	const s3 = new S3({
		region,
		accessKeyId,
		secretAccessKey
	})

	
	const stream = createReadStream()
	const uploadParams: any = {
		Bucket: bucketName,
		Body: stream,
		Key: `uploads/${filename}`
	}
	const uploadedData = await s3
		.upload(uploadParams, function (err: any, data: any) {
			console.log(err, data)
		})
		.promise()
	console.log(uploadedData.Location)
	return { url: uploadedData.Location }
}


export async function copyFile(fileOrigin: any) {
	
	const region = process.env.AWS_BUCKET_REGION
	const bucketName = process.env.AWS_BUCKET_NAME
	const accessKeyId = process.env.AWS_ACCESS_KEY
	const secretAccessKey = process.env.AWS_SECRET_KEY

	const s3 = new S3({
		region,
		accessKeyId,
		secretAccessKey
	})

	const filename = fileOrigin.substring(fileOrigin.lastIndexOf('/')+1);
	
	return new Promise(function (resolve, reject) {
		request({
			url: fileOrigin, 
			encoding: null
		}, async (err, res, body) => {
			if (err) {
				console.log('errerrerrerrerr',err)
				reject(err)
			}

			const uploadParams: any = {
				Bucket: bucketName,
				Body: body,
				Key: `uploads/${filename}`
			}
			const uploadedData = await s3
			.upload(uploadParams, function (err: any, data: any) {
				console.log('UPLOAD',err, data)
			})
			.promise()
			resolve({ filename, url: uploadedData.Location })
		})
	})
}

export async function isFileExists(filename: String ) {
	
	console.log('isFileExists', filename)
	
	const region = process.env.AWS_BUCKET_REGION
	const bucketName = process.env.AWS_BUCKET_NAME || ''
	const accessKeyId = process.env.AWS_ACCESS_KEY
	const secretAccessKey = process.env.AWS_SECRET_KEY

	const s3 = new S3({
		region,
		accessKeyId,
		secretAccessKey
	})

	let fileExists:any =  await s3.headObject({Bucket: bucketName,Key: `uploads/${filename}`}).promise().catch(()=> false);

	// const fileExists = await new Promise(function (resolve, reject) {
	// 	s3.headObject({
	// 		Bucket: bucketName,
	// 		Key: `uploads/${filename}`
	// 	}, ( err:any, data:any) => {
	// 		if (err && ['NotFound', 'Forbidden'].indexOf(err.statuscode) > -1) return resolve(`https://${bucketName}.s3-${region}.amazonaws.com/uploads/${filename}`);
	// 		else if (err) {
	// 			return reject(err);
	// 		}
	// 		return resolve(data);
	// 	})
	// 	.promise()
	// })

	if(fileExists){
		fileExists = { filename, url: `https://${bucketName}.s3-${region}.amazonaws.com/uploads/${filename}`}
	}
	
	return fileExists

}


// export function getFileStream(filename: string) {
// 	const downloadParams: any = {
// 		Key: `uploads/${filename}`,
// 		Bucket: bucketName
// 	}
// 	return s3.getObject(downloadParams).createReadStream()
// }

// downloads as file from s3
