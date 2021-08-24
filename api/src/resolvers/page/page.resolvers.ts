import { Page as PageEntity } from "../../entity/Page"
import { createListQuery, findOne } from "../../utils"
import { getAccount } from "../../utils/security"

const Page = {}
const Query = {
	pages: async (_: any, args: any, ctx: any) => {
		let query = await createListQuery(PageEntity, args, ctx)
		if (args.search) {
			const searchTerms = args.search.split(" ")
			searchTerms.forEach((searchTerm: string) => {
				query.andWhere("l.title like :title", { title: `%${searchTerm.toLowerCase()}%` })
			})
		}
		if (args.featured) {
			query.andWhere("l.featured=1")
		}
		query.leftJoinAndSelect("l.image", "image")
		const [items, totalCount] = await query.getManyAndCount()
		return { data: items, pageInfo: { totalItems: totalCount } }
	},

	page: async (_: any, args: any, ctx: any) => {
		let where = args.slug ? { slug: args.slug } : { id: args.id }
		const item = await findOne(PageEntity, ctx, undefined, { where, relations: ["image"] })
		if (!item) throw new Error("Page not found")
		return item
	},

	pageCheckSlug: async (_: any, args: any, ctx: any) => {
		let page: PageEntity | null = null
		if (args.slug) {
			page = await findOne(PageEntity, ctx, _, { where: { slug: args.slug } })
		}
		return page
	}
}

const Mutation = {
	pageCreate: async (_: any, args: any, ctx: any) => {
	
		const newItem = PageEntity.create(args.data)
		const result: any = await PageEntity.save(newItem)
		return result
	},

	pageUpdate: async (_: any, args: any, ctx: any) => {
		const item: PageEntity = await findOne(PageEntity, ctx, args.id)
		if (!item) throw new Error("Page not found")
		PageEntity.merge(item, args.data)
		const result = await PageEntity.save(item)
		return result
	},

	pageDelete: async (_: any, args: any, ctx: any) => {
		const item: PageEntity = await findOne(PageEntity, ctx, args.id)
		if (!item) throw new Error("Page not found")
		const result = { ...item }
		await item.remove().catch(() => {
			throw new Error("Page no se puede eliminar")
		})


		return result
	}
}
export default {
	Page,
	Query,
	Mutation
}
