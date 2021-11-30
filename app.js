const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

// Static frontend files
app.use(express.static(path.join(__dirname, 'frontend')))

// Statick jk files
app.use(express.static(path.join(__dirname, 'jk')))

// Main jk file
app.get('/jk', (req, res) => {
    res.sendFile(__dirname + '/jk/jk.js')
})

// always send index.html
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html')
})

app.listen(PORT, () => {console.info('App kører på: ' + PORT)})