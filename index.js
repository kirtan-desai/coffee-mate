const express = require('express')
const { fetchNews, sendNews } = require('./app');

const app = express()

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.post('/', async (req, res) => {
    console.log("post req made")
    const data = req.body
    console.log(data)
    //store data in firebase
})

/*
TODO: 
1. set up firebase
2. app.post('/) for taking in form submission
3. delete operation for unsubscribe user
3. set up chron job to send emails
*/

// app.get("/", (req, res) => {
//     console.log("Here")
//     res.send("HEHEHE")
// })

// (async () => {
//     sendNews(await fetchNews())
// })()

app.listen(3000)
