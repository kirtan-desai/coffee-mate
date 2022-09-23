const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

initializeApp({ credential: cert(require('./creds.json')) })
module.exports = getFirestore()