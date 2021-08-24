import jwt from "jsonwebtoken"
import { User } from "../entity/User"

export async function iCanDoIt(permission: string, ctx: any): Promise<Boolean> {
	if (!ctx) throw new Error("Context not found")

	const { logged } = await getAccount(ctx)
	if (!logged) throw new Error("Authorization fail")

	let user

	if (logged.userType == "user") user = logged.user

	if (!user.permissions[permission]) {
		throw new Error("You dont have permission to perform this action")
	}

	return true
}

export async function getAccount(ctx: any) {
	let logged: any = null

	const Authorization = ctx.req.get("authorization")
	if (Authorization) {
		const token = Authorization.replace("Bearer ", "")
		logged = jwt.verify(token, process.env.APP_SECRET || "secret")
	}
	
	if (ctx.req.body) {
		const args = ctx.req.body ? ctx.req.body.variables : null
	}

	if (logged) {
		logged.user = await User.findOne(logged.loggedId)
	}

	return { logged }
}
