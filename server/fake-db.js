const Product = require('./model/product')

class FakeDb {
    constructor () {
        this.products = [
            {
                coverImage: './assets/img/phone-cover.jpg',
                name: 'Phone XL',
                price: 799,
                description: 'A large phone with one of the best screens',
                hedding1: 'hedding 1-1',
                hedding2: 'hedding 2-1',
                hedding3: 'hedding 3-1',
                heddingtext1: 'text1-1',
                heddingtext2: 'text2-1',
                heddingtext3: 'text3-1',
            },
            {
                coverImage: './assets/img/phone-cover.jpg',
                name: 'Phone Mini',
                price: 699,
                description: 'A great phone with one of the best cameras',
                hedding1: 'hedding 1-2',
                hedding2: 'hedding 2-2',
                hedding3: 'hedding 3-2',
                heddingtext1: 'text1-2',
                heddingtext2: 'text2-2',
                heddingtext3: 'text3-2',
            },
            {
                coverImage: './assets/img/phone-cover.jpg',
                name: 'Phone Standard',
                price: 299,
                description: 'A greater phone!',
                hedding1: 'hedding 1-3',
                hedding2: 'hedding 2-3',
                hedding3: 'hedding 3-3',
                heddingtext1: 'text1-3',
                heddingtext2: 'text2-3',
                heddingtext3: 'text3-3',
            },
            {
                coverImage: './assets/img/phone-cover.jpg',
                name: 'Phone Special',
                price: 399,
                description: 'A greatest phone!',
                hedding1: 'hedding 1-4',
                hedding2: 'hedding 2-4',
                hedding3: 'hedding 3-4',
                heddingtext1: 'text1-4',
                heddingtext2: 'text2-4',
                heddingtext3: 'text3-4',
            }
        ]
    }

    async initDb() {
        await this.cleanDb()
        this.pushProductsToDb()
    }
    
    async cleanDb() {
        await Product.deleteMany({})
    }

    pushProductsToDb() {
        this.products.forEach(
            (product) => {
                const newProduct = new Product(product)
                newProduct.save()
            }
        )
    }

    seeDb() {
        this.pushProductsToDb()
    }
}

module.exports = FakeDb