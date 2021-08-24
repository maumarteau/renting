import { carCategoryCreate, carCategorySort, carCategoryUpdate } from "../../controllers/carCategoryController"
import { CarCategory as CarCategoryEntity, CarCategoryStatus } from "../../entity/CarCategory"
import { createListQuery, findOne } from "../../utils"

const CarCategory = {}
const Query = {
	carCategories: async (_: any, args: any, ctx: any) => {
		let query = await createListQuery(CarCategoryEntity, args, ctx)
		if (args.search) {
			const searchTerms = args.search.split(" ")
			searchTerms.forEach((searchTerm: string) => {
				query.andWhere("l.title like :title", { title: `%${searchTerm.toLowerCase()}%` })
			})
		}
		if(args.featured){
			query.andWhere("l.featured = true")
		}
		
		if (Object.values(CarCategoryStatus).includes(args.status)) {
			query.andWhere("l.status = :status", { status: args.status})
		}
		query.leftJoinAndSelect("l.image", "image")
		query.leftJoinAndSelect("l.imageMain", "imageMain")
		query.leftJoinAndSelect("l.images", "images")
		query.leftJoinAndSelect("l.gallery", "gallery")
		const [items, totalCount] = await query.getManyAndCount()
		return { data: items, pageInfo: { totalItems: totalCount } }
	},

	carCategory: async (_: any, args: any, ctx: any) => {
		let where = args.slug ? { slug: args.slug } : { id: args.id }
		const item = await findOne(CarCategoryEntity, ctx, undefined, { where, relations: ["image","imageMain","images","gallery","dataSheet"] })
		if (!item) throw new Error("CarCategory not found")
		return item
	},

	carCategoryCheckSlug: async (_: any, args: any, ctx: any) => {
		let item: CarCategoryEntity | null = null
		if (args.slug) {
			item = await findOne(CarCategoryEntity, ctx, _, { where: { slug: args.slug } })
		}
		return item
	}
}

const Mutation = {
	carCategoryCreate: async (_: any, args: any, ctx: any) => {
		const result: any = await carCategoryCreate(args.data)
		return result
	},

	carCategoryUpdate: async (_: any, args: any, ctx: any) => {
		const result = await carCategoryUpdate(args.id, args.data)
		return result
	},
	
	carCategoryDelete: async (_: any, args: any, ctx: any) => {
		const item: CarCategoryEntity = await findOne(CarCategoryEntity, ctx, args.id)
		if (!item) throw new Error("CarCategory not found")
		const result = { ...item }
		await item.remove().catch(() => {
			throw new Error("CarCategory no se puede eliminar")
		})
		
		
		return result
	},

	carCategoryToggleStatus: async (_: any, args: any, ctx: any) => {
		
		if (!Object.values(CarCategoryEntity).includes(args.status)) throw new Error("Invalid status ")		
		const result = await carCategoryUpdate(args.id, {status: args.status})

		return result
	},

	carCategorySort: async (_: any, args: any, ctx: any) => {
		const result = await carCategorySort(args.list)
		return result
	},
}
export default {
	CarCategory,
	Query,
	Mutation
}
