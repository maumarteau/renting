const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
// var enforce = require('express-sslify')

const app = express()
// app.use(enforce.HTTPS({ trustProtoHeader: true }))

//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/')))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function(req, res) {
	res.sendFile(path.join(__dirname, '/index.html'))
})

const port = process.env.PORT || 8080
app.listen(port)
console.log(`app is listening on port: ${port}`)
