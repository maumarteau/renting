import bcrypt from "bcryptjs"
import { User as UserEntity } from "../../entity/User"
import { createListQuery, findOne } from "../../utils"
import { getAccount, iCanDoIt } from "../../utils/security"
import { userCreate, userDelete, userLogin, userUpdate } from "../../controllers/userController"

const User = {}
const Query = {
	users: async (_: any, args: any, ctx: any) => {
		let query = await createListQuery(UserEntity, args, ctx)
		if (args.search) {
			const searchTerms = args.search.split(" ")
			searchTerms.forEach((searchTerm: string) => {
				query.andWhere("l.name like :name", { name: `%${searchTerm.toLowerCase()}%` })
				query.orWhere("l.email like :email", { email: `%${searchTerm.toLowerCase()}%` })
			})
		}
		const [items, totalCount] = await query.getManyAndCount()
		return { data: items, pageInfo: { totalItems: totalCount } }
	},

	user: async (_: any, args: any, ctx: any) => {
		const item: UserEntity = await findOne(UserEntity, ctx, args.id)
		if (!item) throw new Error("User not found")
		return item
	},

	userLogged: async (_: any, args: any, ctx: any) => {
		const { logged } = await getAccount(ctx)
		console.log(logged)
		if (logged.userType != "user" || !logged.loggedId) throw new Error("Authentication error")
		const item: UserEntity = await findOne(UserEntity, ctx, logged.loggedId)
		console.log(item)
		if (item) return item
		throw new Error("Authentication error")
	}
}

const Mutation = {
	userLogin: async (_: any, { email, password, accessTo }: any, ctx: any) => {
		const auth = await userLogin(email, password, accessTo, ctx)
		return auth
	},

	userCreate: async (_: any, { data }: any, ctx: any) => {
		
		data.password = await bcrypt.hash(data.password, 10)

		const result: any = await userCreate(data)

		return result
	},

	userUpdate: async (_: any, args: any, ctx: any) => {
		// await iCanDoIt("userManage", ctx)

		const user = await userUpdate(args.id, args.data, ctx)
		const result: any = await UserEntity.findOne(user.id, { relations: ["avatar"] })


		return result
	},

	userDelete: async (_: any, args: any, ctx: any) => {
		// await iCanDoIt("userDelete", ctx)
		const result: UserEntity = await userDelete(args.id)

			return result
	}
}
export default {
	User,
	Query,
	Mutation
}
