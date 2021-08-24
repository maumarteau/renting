import { File as FileEntity } from "../../entity/File"
import { processUpload } from "../../utils/uploads"

const File = {}
const Query = {
	files: async () => {
		const items = await FileEntity.find()
		return items
	},
	file: async (_: any, args: any) => {
		const item = await FileEntity.findOne(args.id)
		if (item) {
			return item
		}
		throw new Error("File not found")
	}
}
const Mutation = {
	uploadFile: async (_: any, args: any, ctx: any) => {
		let image = await processUpload(args.file, ctx)
		if (image) {
			const newItem = FileEntity.create(image)
			const saved: any = await FileEntity.save(newItem)
			if (saved) return await FileEntity.findOne(saved.id)
		}
		return null
	}
}
export default {
	File,
	Query,
	Mutation
}
