// import "reflect-metadata"
import express, { Application } from "express"
import { ApolloServer, PubSub } from "apollo-server-express"
import http from "http"
import moment from "moment"
moment.locale("es")


import { createConnection, getConnectionOptions } from "typeorm"
import { patchSelectQueryBuilder } from "typeorm-global-scopes"
import { emailCheckConnection } from "./utils/email"

// Importamos el framework de funciones de GCP
const functions = require("@google-cloud/functions-framework")

import typeDefs from "./resolvers/typeDefs"
import resolvers from "./resolvers/resolvers"

// ----------------------------------------------------------------------------
// 1) Creamos las variables globales que necesitamos
// ----------------------------------------------------------------------------
const app: Application = express();


const pubsub = new PubSub()
const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: "/subscriptions",
  context: (context) => {
    return {
      ...context,
      pubsub,
    }
  },
})

// Configuración para permitir JSON grandes, etc.
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Moment y patch de TypeORM
;(async function () {
  console.log("Connecting...")
  patchSelectQueryBuilder()
  let connectionOptions = await getConnectionOptions()
  await createConnection(connectionOptions)
  console.log("TypeORM connected")
  console.log('Server running at http://localhost:3000')
})()

// Rutas estáticas según entorno
if (process.env.NODE_ENV === "production") {
  app.use("/uploads", express.static(__dirname + "/../uploads"))
  app.use("/assets/brands", express.static(__dirname + "/../assets/brands"))
} else {
  app.use("/uploads", express.static("./uploads"))
  app.use("/assets/brands", express.static("./assets/brands"))
}

// Rutas de prueba
app.get("/", (req, res) => {
  res.send("Hey, what are you trying to see around here?.")
})
app.get("/test", (req, res) => {
  res.send("Working OK.")
})
app.get("/check-email-connection", async (req, res) => {
  const isOk = await emailCheckConnection()
  res.send(isOk)
})

// ----------------------------------------------------------------------------
// 2) Función asíncrona para iniciar el servidor Apollo (sin hacer listen())
// ----------------------------------------------------------------------------
let isApolloServerInitialized = false

async function startApolloServer() {
  if (isApolloServerInitialized) return

  await server.start()
  server.applyMiddleware({ app });


  const httpServer = http.createServer(app)
  server.installSubscriptionHandlers(httpServer)

  console.log("Apollo Server started. Subscriptions ready at /subscriptions.")

  isApolloServerInitialized = true
}

// ----------------------------------------------------------------------------
// 3) Exportamos la función HTTP (nombre "api") para GCP con lazy initialization
// ----------------------------------------------------------------------------
functions.http("api", async (req: any, res: any) => {
	// En la primera invocación se inicializa ApolloServer y todo lo demás.
	if (!isApolloServerInitialized) {
	  await startApolloServer()
	}
	// Delegamos la llamada a Express
	app(req, res)

})
  
  