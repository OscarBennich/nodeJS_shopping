const mockProducts = [
    {
        Id: 1,
        Name: 'A',
        Price: 200
    },
    {
        Id: 2,
        Name: 'B',
        Price: 300
    }
]

class MockSource{
    getProducts(){
        return Promise.resolve(mockProducts);
    }

    getProduct(id){
        return new Promise(
            (resolve, reject) => {
                const product = mockProducts.find(p => p.Id === id)
                product ? resolve(product) : reject(`Product ${id} not found`)
            }
        )
    }
}

module.exports = MockSource