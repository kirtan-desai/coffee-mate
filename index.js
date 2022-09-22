const express = require('express')
const {fetchNews, sendNews} = require('./app');

const app = express()

app.use(express.static("public"))

// app.get("/", (req, res) => {
//     console.log("Here")
//     res.send("HEHEHE")
// })

// (async () => {
//     sendNews(await fetchNews())
// })()

app.listen(3000)
