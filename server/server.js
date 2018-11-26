const path = require('path')
const express = require('express')

const routes = require('./routes')

const app = express() 

app.use(routes)
app.use(express.static(path.join(__dirname, '../client')))

app.listen(8888)

console.log('Web server running @ localhost:8888')

