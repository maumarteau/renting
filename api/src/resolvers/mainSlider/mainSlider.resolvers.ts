import { MainSlider as MainSliderEntity } from "../../entity/MainSlider"
import { createListQuery, findOne } from "../../utils"

const MainSlider = {}
const Query = {
	mainSliders: async (_: any, args: any, ctx: any) => {
		let query = await createListQuery(MainSliderEntity, args, ctx)
		if (args.search) {
			const searchTerms = args.search.split(" ")
			searchTerms.forEach((searchTerm: string) => {
				query.andWhere("l.title like :title", { title: `%${searchTerm.toLowerCase()}%` })
			})
		}
		query.leftJoinAndSelect("l.image", "image")
		const [items, totalCount] = await query.getManyAndCount()
		return { data: items, pageInfo: { totalItems: totalCount } }
	},

	mainSlider: async (_: any, args: any, ctx: any) => {
		const item: MainSliderEntity = await findOne(MainSliderEntity, ctx, args.id, { relations: ["image"] })
		if (!item) throw new Error("MainSlider not found")
		return item
	}
}

const Mutation = {
	mainSliderCreate: async (_: any, args: any, ctx: any) => {
		
		const newItem = MainSliderEntity.create(args.data)
		const result: any = await MainSliderEntity.save(newItem)

		return result
	},

	mainSliderUpdate: async (_: any, args: any, ctx: any) => {
		const item: MainSliderEntity = await findOne(MainSliderEntity, ctx, args.id)
		if (!item) throw new Error("MainSlider not found")
		MainSliderEntity.merge(item, args.data)
		const result = await MainSliderEntity.save(item)


		return result
	},

	mainSliderDelete: async (_: any, args: any, ctx: any) => {
		const item: MainSliderEntity = await findOne(MainSliderEntity, ctx, args.id)
		if (!item) throw new Error("MainSlider not found")
		const result = { ...item }
		await item.remove().catch(() => {
			throw new Error("MainSlider no se puede eliminar")
		})


		return result
	}
}
export default {
	MainSlider,
	Query,
	Mutation
}
