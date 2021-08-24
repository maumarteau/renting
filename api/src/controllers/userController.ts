import bcrypt from "bcryptjs"
import { sign } from "jsonwebtoken"
import { User } from "../entity/User"

type UserAuth = {
	token: any
	user: User
}

/****************************************************************************************/
/******************************************* CREATE *************************************/
/****************************************************************************************/

export async function userCreate(data: User, ctx?: any): Promise<User> {
	console.log("userCreate")
	const result: User = await User.create(data).save()
	return result
}

/****************************************************************************************/
/******************************************* UPDATE *************************************/
/****************************************************************************************/

export async function userUpdate(id: User["id"], data: User, ctx?: any): Promise<User> {
	console.log("userUpdate", id)

	const item: User | undefined = await User.findOne(id)
	if (!item) throw new Error("User not found")

	const result: User = await User.merge(item, data).save()
	return result
}

/****************************************************************************************/
/******************************************* DELETE *************************************/
/****************************************************************************************/

export async function userDelete(id: User["id"], ctx?: any): Promise<User> {
	console.log("carDelete", id)

	const item: User | undefined = await User.findOne(id, { loadEagerRelations: false })
	if (!item) throw new Error("User not found")

	const result: any = { ...item }

	await item.remove().catch(() => {
		throw new Error(`The user ${item.name} ${item.lastname} cannot be deleted`)
	})
	result.id = id
	return result
}

/****************************************************************************************/
/******************************************* LOGIN *************************************/
/****************************************************************************************/

export async function userLogin(email: string, password: string, accessTo: string, ctx: any): Promise<UserAuth> {
	const user: User | undefined = await User.findOne({ where: { email }, relations: [ "avatar"] })
	if (!user) throw new Error(`No client found for email: ${email}`)

	if (!user) {
		throw new Error(`No user found for email: ${email}`)
	}
	const passwordValid = await bcrypt.compare(password, user.password)
	if (!passwordValid) {
		throw new Error("Invalid password")
	}
	
	return {
		token: sign(
			{
				loggedId: user.id,
				userType: "user"
			},
			process.env.APP_SECRET || "secret"
		),
		user
	}
}
