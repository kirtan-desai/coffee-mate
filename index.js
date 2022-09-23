const express = require('express')
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { fetchNews, sendNews } = require('./apiHandlers');

const app = express()

initializeApp({ credential: cert(require('./creds.json')) })
const db = getFirestore()

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.post('/', async (req, res) => {
    try {
        //validate data before posting
        console.log(req.body)
        const doc = db.collection('users').doc(req.body.name);
        await doc.set(req.body)
        res.send('Record saved successfully')
    } catch (error) {
        res.status(400).send(error.message)
    }
})

/*
TODO: 
3. delete operation for unsubscribe user
3. set up chron job to send emails
4. what to do when someone signs up with email which already exists?

*/


// (async () => {
//     sendNews(await fetchNews())
// })()

app.listen(3000)
