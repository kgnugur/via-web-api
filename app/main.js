import "@babel/polyfill"
import "source-map-support/register"
import express from "express"
import cookieParser from "cookie-parser"
import { urlencoded } from "body-parser"
import compression from "compression"
import path from "path"
import WSSInitializer from "./web-socket/wss-initializer"
import getConfig from "./util/config-fetcher"
import http from "http"
import videoRoutes from "./routes/video"
import searchRoutes from "./routes/search-router"

const app = express()
const server = http.createServer(app)
const port = getConfig("server:port")
const domain = getConfig("server:domain")

app.use(compression())
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname)))

new WSSInitializer(server).attachHandlers()

app.get("/", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../client-test-pages/home.html"))
})

app.get("/test", function (req, res) {
  res.sendFile(
    path.resolve(__dirname, "../client-test-pages/test-page-home.html")
  )
})

app.get("/test/search-test", function (req, res) {
  res.sendFile(
    path.resolve(__dirname, "../client-test-pages/test-page-search.html")
  )
})

app.get("/test/file-upload", function (req, res) {
  res.sendFile(
    path.resolve(__dirname, "../client-test-pages/test-page-upload-file.html")
  )
})

app.use("/video", urlencoded({ extended: true }), videoRoutes)

app.use("/search", searchRoutes)

server.listen(port, () => {
  console.log(`Application is online at ${domain}:${port}`)
})
