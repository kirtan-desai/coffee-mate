const express = require('express')
const { body, validationResult } = require('express-validator')
const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const { fetchNews, sendNews } = require('./apiHandlers')
const nodeCron = require("node-cron");

const app = express()

initializeApp({ credential: cert(require('./creds.json')) })
const db = getFirestore()

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.post('/',
    body('email').trim().rtrim().notEmpty().withMessage('Email is empty').isEmail().withMessage('Invalid email'),
    body('name').trim().rtrim().notEmpty().withMessage('Name is empty').isLength({ max: 100 }),
    body('checkbox-categories').isArray({ min: 1, max: 5 }).withMessage('Categories should be an array with length between 1 and 5 inclusive'),
    body('checkbox-categories.*').isIn(['sports', 'technology', 'science', 'business', 'health']).withMessage('Invalid categories'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        try {
            const data = req.body
            console.log(data)
            const doc = db.collection('users').doc(data.email);
            await doc.set(data)
            res.send('Record saved successfully')

            // send sample email
            fetchNewsAndSendEmail()
        } catch (error) {
            res.status(400).send(error.message)
        }
    })

const job = nodeCron.schedule("* * * * *", async function jobYouNeedToExecute() {
    // Do whatever you want in here. Send email, Make  database backup or download data.
    const snapshot = await db.collection('users').get();
    snapshot.forEach((doc) => {
        console.log(doc.get("name"));
        console.log(doc.get("email"));
        console.log(doc.get("checkbox-categories"));
        });
});

const fetchNewsAndSendEmail = async (email) => {
    let news_obj
    for (let i = 0; i < 5; i++) {
        try {
            news_obj = await fetchNews()
            sendNews(news_obj)
            break
        } catch (err) {
            console.log(err)
        }
    }
}

/*
TODO: 
3. delete operation for unsubscribe user
4. update data when user already exists
5. handle duplicates of checkboxes
*/

app.listen(3000)
