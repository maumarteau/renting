import "reflect-metadata"
import express from "express"
import morgan from "morgan"
import { ApolloServer, PubSub } from "apollo-server-express"
// import { graphqlUploadExpress } from "graphql-upload"

import http from "http"
const moesif = require("moesif-nodejs")

import typeDefs from "./resolvers/typeDefs"
import resolvers from "./resolvers/resolvers"

const PORT = process.env.PORT || "3000"
const app = express()

// app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }))

const pubsub = new PubSub()
const server = new ApolloServer({
	typeDefs,
	resolvers,
	subscriptions: "/subscriptions",
	// uploads: false,
	context: context => {
		return {
			...context,
			pubsub
		}
	}
})

// // error pyload too large al hacer ALPR
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb" }))

app.use(morgan("dev")) //HTTP request logger middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const moesifMiddleware = moesif({
	applicationId: "eyJhcHAiOiIzNjU6MzA0IiwidmVyIjoiMi4wIiwib3JnIjoiNjkwOjIxOCIsImlhdCI6MTYxNzIzNTIwMH0.ywtILvlHKWkufOCntRpUyRhwtlkIcv1AIg2HGEvqrpg",
	identifyUser: function (req: any, res: any) {
		return req.user ? req.user.id : undefined
	}
})
app.use(moesifMiddleware)

import moment from "moment"
moment.locale("es")
// moment.tz.setDefault('Etc/UTC')
require("dotenv").config()

import { createConnection, getConnectionOptions } from "typeorm"


import { patchSelectQueryBuilder } from "typeorm-global-scopes"

;(async function () {
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
