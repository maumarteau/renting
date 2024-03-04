import "reflect-metadata"
import express from "express"
import { ApolloServer, PubSub } from "apollo-server-express"
import http from "http"

import typeDefs from "./resolvers/typeDefs"
import resolvers from "./resolvers/resolvers"

const PORT = process.env.PORT || "3000"
const app = express()


const pubsub = new PubSub()
const server = new ApolloServer({
	typeDefs,
	resolvers,
	subscriptions: "/subscriptions",
	context: context => {
		return {
			...context,
			pubsub
		}
	}
})


app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb" }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


import moment from "moment"
moment.locale("es")
require("dotenv").config()

import { createConnection, getConnectionOptions } from "typeorm"


import { patchSelectQueryBuilder } from "typeorm-global-scopes"

;import { emailCheckConnection } from "./utils/email"
(async function () {
	console.log("Connecting...")
	patchSelectQueryBuilder()
	let connectionOptions = await getConnectionOptions()
	const conn = await createConnection(connectionOptions)
})()

if (process.env.NODE_ENV == "production") {
	app.use("/uploads", express.static(__dirname + "/../uploads"))
	app.use("/assets/brands", express.static(__dirname + "/../assets/brands"))
} else {
	app.use("/uploads", express.static("./uploads"))
	app.use("/assets/brands", express.static("./assets/brands"))
}

app.get("/", function (req: any, res: any) {
	res.send("Hey, what are you trying to see around here?.")
})
app.get("/test", function (req: any, res: any) {
	res.send("Working OK.")
})
app.get("/check-email-connection", async function (req: any, res: any) {
	const isOk = await emailCheckConnection()
	res.send(isOk)
})


async function startApolloServer() {
	await server.start()
	server.applyMiddleware({ app })

	const httpServer = http.createServer(app)
	server.installSubscriptionHandlers(httpServer)

	await new Promise(resolve =>
		httpServer.listen(PORT, () => {
			console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
			console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
		})
	)
	return { server, app, httpServer }
}

startApolloServer()
