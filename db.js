const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

initializeApp({ credential: cert(require('./google-credentials.json')) })
module.exports = getFirestore()