const EdumentSource = require('./edumentSource')
const MockSource = require('./mockSource')

class Store {
    constructor(source){
        this.source = source
    }

    getProducts(){
        return this.source.getProducts(); // Must return a promise
    }

    getProduct(id){
        return this.source.getProduct(id); // Must return a promise
    }
}

const environment = process.env.NODE_ENV 

if(environment === "development")
{
    source = new MockSource()
}

if(environment === "production")
{
    source = new EdumentSource()
}

module.exports = new Store(source)

