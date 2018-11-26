const express = require('express')
const store = require('../store')

const subRoute = express.Router()

subRoute.get('/products', (req, res) => {
    store.getProducts()
    .then(products => res.json(products))
})

subRoute.get('/products/:id', (req, res) => {
    const productId = Number(req.params.id)
    store.getProducts(productId)
        .then(products => res.json(products))
        .catch(error => res.status(404).json({
            error
        }))
})

module.exports = subRoute 