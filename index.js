const express = require('express')
const { body, validationResult } = require('express-validator')
require('dotenv').config()
const db = require('./db')
const fetchNewsAndSendEmail = require('./apiHandlers')
const port = process.env.PORT || 3000

const app = express()

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
            const doc = db.collection('users').doc(data.email);
            await doc.set(data)
            res.send('Record saved successfully')

            // send sample email
            fetchNewsAndSendEmail(data.email, data.name, data["checkbox-categories"])
        } catch (error) {
            res.status(400).send(error.message)
        }
    })

app.get('/unsubscribe', async (req, res) => {
    const email = req.query.email ? req.query.email : "default"
    try {
        await db.collection('users').doc(email).delete()
        res.status(200).send(`Unsubscribed ${email} successfully!`)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

app.get('/' + process.env.CRON_ROUTE, async (req, res) => {
    const snapshot = await db.collection('users').get()
    snapshot.forEach(doc => fetchNewsAndSendEmail(doc.get('email'), doc.get('name'), doc.get('checkbox-categories')))
})

app.listen(port)
