require('isomorphic-fetch')

class EdumentSource{

    getProducts()
    {   
        return fetch('https://demo.edument.se/api/products')
        .then(response => response.json())
    }

    getProduct(id)
    {
        return fetch(`https://demo.edument.se/api/products/${id}`)
        .then(response => response.json())
    }
}

module.exports = EdumentSource