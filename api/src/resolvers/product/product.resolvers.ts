import { productCreate, productSort, productUpdate } from "../../controllers/productController"
import { Product as ProductEntity, ProductStatus } from "../../entity/Product"
import { createListQuery, findOne } from "../../utils"

const Product = {}
const Query = {
	products: async (_: any, args: any, ctx: any) => {
		let query = await createListQuery(ProductEntity, args, ctx)
		
		if (args.search) {
			const searchTerms = args.search.split(" ")
			searchTerms.forEach((searchTerm: string) => {
				query.andWhere("(l.title like :title OR l.description like :description OR l.brand like :brand OR l.model like :model)", { 
					title: `%${searchTerm.toLowerCase()}%`,
					description: `%${searchTerm.toLowerCase()}%`,
					brand: `%${searchTerm.toLowerCase()}%`,
					model: `%${searchTerm.toLowerCase()}%`
				})
			})
		}
		
		if (Object.values(ProductStatus).includes(args.status)) {
			query.andWhere("l.status = :status", { status: args.status})
		}
		
		if (args.brand) {
			query.andWhere("l.brand = :brand", { brand: args.brand})
		}
		
		if (args.model) {
			query.andWhere("l.model = :model", { model: args.model})
		}
		
		if (args.minPrice) {
			query.andWhere("l.price >= :minPrice", { minPrice: args.minPrice})
		}
		
		if (args.maxPrice) {
			query.andWhere("l.price <= :maxPrice", { maxPrice: args.maxPrice})
		}
		
		if (args.year) {
			query.andWhere("l.year = :year", { year: args.year})
		}
		
		if (args.fuel) {
			query.andWhere("l.fuel = :fuel", { fuel: args.fuel})
		}
		
		if (args.transmission) {
			query.andWhere("l.transmission = :transmission", { transmission: args.transmission})
		}
		
		query.leftJoinAndSelect("l.files", "files")
		const [items, totalCount] = await query.getManyAndCount()
		return { data: items, pageInfo: { totalItems: totalCount } }
	},

	product: async (_: any, args: any, ctx: any) => {
		let where = args.slug ? { slug: args.slug } : { id: args.id }
		const item = await findOne(ProductEntity, ctx, undefined, { where, relations: ["files"] })
		if (!item) throw new Error("Product not found")
		return item
	},

	productCheckSlug: async (_: any, args: any, ctx: any) => {
		let item: ProductEntity | null = null
		if (args.slug) {
			item = await findOne(ProductEntity, ctx, _, { where: { slug: args.slug } })
		}
		return item
	}
}

const Mutation = {
	productCreate: async (_: any, args: any, ctx: any) => {
		const result: any = await productCreate(args.data)
		return result
	},

	productUpdate: async (_: any, args: any, ctx: any) => {
		const result = await productUpdate(args.id, args.data)
		return result
	},
	
	productDelete: async (_: any, args: any, ctx: any) => {
		const item: ProductEntity = await findOne(ProductEntity, ctx, args.id)
		if (!item) throw new Error("Product not found")
		const result = { ...item }
		await item.remove().catch(() => {
			throw new Error("Product no se puede eliminar")
		})
		
		return result
	},

	productToggleStatus: async (_: any, args: any, ctx: any) => {
		if (!Object.values(ProductStatus).includes(args.status)) throw new Error("Invalid status ")		
		const result = await productUpdate(args.id, {status: args.status})

		return result
	},

	productSort: async (_: any, args: any, ctx: any) => {
		const result = await productSort(args.list)
		return result
	},
}

export default {
	Product,
	Query,
	Mutation
}
