import { withFilter } from "apollo-server"
import { messageCreate, messageReaded } from "../../controllers/messageController"
import { Message as MessageEntity } from "../../entity/Message"
import { createListQuery } from "../../utils"

const Message = {}

const Query = {
	messages: async (_: any, args: any, ctx: any) => {
		let query = await createListQuery(MessageEntity, args, ctx)
		
		const [items, totalCount] = await query.getManyAndCount()
		return { data: items, pageInfo: { totalItems: totalCount } }
	}
}
const Mutation = {
	messageCreate: async (_: any, args: any, ctx: any) => {
		
		const result = await messageCreate(args.data, ctx)

		return result
	},
	messageReaded: async (_: any, args: any, ctx: any) => {
		
		const result = await messageReaded(args.id, ctx)
		return result
	}
}

const Subscription = {
	messageAnswered: {
		subscribe: withFilter(
			(_: any, __: any, { pubsub }: any) => pubsub.asyncIterator("messageAnswered"),
			(payload: any, variables: any) => {
				return payload.messageAnswered.conversationCode == variables.conversationCode
			}
		)
	}
}

export default {
	Message,
	Query,
	Mutation,
	Subscription
}
