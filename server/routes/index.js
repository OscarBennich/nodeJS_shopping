const express = require('express')

const route = express.Router()
route.use('/api', require('./product'))

module.exports = route