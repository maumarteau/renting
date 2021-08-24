import { bookingMaintenanceCreate } from "../../controllers/bookingMaintenanceController"
import { BookingMaintenance as BookingMaintenanceEntity } from "../../entity/BookingMaintenance"
import { createListQuery, findOne } from "../../utils"

const BookingMaintenance = {}

const Query = {
	bookingMaintenances: async (_: any, args: any, ctx: any) => {
		let query = await createListQuery(BookingMaintenanceEntity, args, ctx)
		
		const [items, totalCount] = await query.getManyAndCount()
		return { data: items, pageInfo: { totalItems: totalCount } }
	},

	bookingMaintenance: async (_: any, args: any, ctx: any) => {
		let where = args.slug ? { slug: args.slug } : { id: args.id }
		const item = await findOne(BookingMaintenanceEntity, ctx, undefined, { where, relations: ["image"] })
		if (!item) throw new Error("BookingMaintenance not found")
		return item
	},
}
const Mutation = {
	bookingMaintenanceCreate: async (_: any, args: any, ctx: any) => {
		const result = await bookingMaintenanceCreate(args.data, ctx)
		return result
	}
}

// const Subscription = {
// 	messageAnswered: {
// 		subscribe: withFilter(
// 			(_: any, __: any, { pubsub }: any) => pubsub.asyncIterator("messageAnswered"),
// 			(payload: any, variables: any) => {
// 				return payload.messageAnswered.conversationCode == variables.conversationCode
// 			}
// 		)
// 	}
// }

export default {
	BookingMaintenance,
	Query,
	Mutation,
	// Subscription
}
