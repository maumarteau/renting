import * as express from "express"
import jwt from "jsonwebtoken"
import { User } from "../entity/User"

export async function getDataLoggedMiddleware(req: any, res: express.Response, next: express.NextFunction) {
	// si estoy intentando loguear desde el admin, que no tengo publicKey salto la autenticacion.
	// console.log("getDataLoggedMiddleware", req.originalUrl, req.body?.operationName)
	// console.log("request body", req)

	let account: any = null
	let logged: any = null

	if (req.originalUrl != "/graphql" || req.body.operationName == "IntrospectionQuery") return next()

	// console.log("request from", req.hostname)

	// // controlo que las consultas vengan de origenes conocidos.											// IP AWS
	if (!req.hostname.includes("local") && !req.hostname.includes("lestido") && !req.hostname.includes("54.232.166.19")) {
		throw new Error(`Unknown origin: ${req.hostname}`)
	}

	// si estoy ingresando desde payment, dejo pasar.
	// if (req.headers.origin == process.env.PAYMENT_GATEWAY) return next()

	if (req.body?.operationName == "userLogin" && (req.body?.variables?.accessTo == "admin" || req.body?.variables?.accessTo == "app")) return next()

	// console.log("operationName", req.body?.operationName)

	// controlo a los que viene por header.
	const Authorization = req.get("authorization")
	if (Authorization) {
		const token = Authorization.replace("Bearer ", "")
		logged = jwt.verify(token, process.env.APP_SECRET || "secret")
	}

	if (req.body) {
		// controlo a los que vienen con publicKey
		const args = req.body ? req.body.variables : null
		if (!account && args) {

		}

		// if (!account) {
		// 	console.log("Account not found", req.body)
		// 	throw new Error("Account not found")
		// }

		if (logged) {
			
			if (logged.userType == "user") logged.user = await User.findOne(logged.loggedId, { relations: ["office"] })
		}
		if (logged) req.logged = logged
	}

	return next()
}
