function removeObjectsFromList(list, propertyName, propertyValue, count) {
    let i = list.length
    let numberOfRemovedObjects = 0

    while (i !== 0 && numberOfRemovedObjects !== count) {
        i--

        if (list[i][propertyName] === propertyValue) {
            list.splice(i, 1)
            numberOfRemovedObjects++;
        }
    }
};

// const products = [
//     {
//         id: 1,
//         name: 'Product A',
//         price: 200
//     },
//     {
//         id: 2,
//         name: 'Product B',
//         price: 350
//     }
// ];

const shoppingCart = []

let products;

fetch('/api/products')
    .then(response => {
        if(!response.ok)
        {
            throw {
                status: response.status,
                message: response.statusText
            };
        }

        return response.json()
    })
    .then(productList => {
        return productList.map(
            // ({ Id, Name, Price}) => ({
            //     return {
            //        id: Id,
            //        name: Name,
            //        price: Price
            //     };
            // }

            // ({ Id, Name, Price}) => ({
            //     id: Id,
            //     name: Name,
            //     price: Price
            // })

            ({ Id: id, Name: name, Price: price }) => ({ id, name, price })
        );
    })
    .then(formattedProductList => {
        products = formattedProductList

        for (let i = 0; i < products.length; i++) {

            // destruct object
            const {
                id,
                name,
                price
            } = products[i]

            // use backticks
            // use prefix "data-" to use the id 
            const htmlString = `
                <div>
                    <p> ${name}</p>
                    <p> ${price}</p>
                    <button class="add-to-cart" data-product-id=${id}>Add to cart</button> 
                </div>
            `;

            $('#products').append(htmlString);
        }

        $('.add-to-cart').on(
            'click',
            (event) => {
                const productId = Number($(event.target).attr('data-product-id'));
                const product = products.find(p => p.id === productId)
                if (!product) {
                    console.log('Cannot find product')
                    return
                }

                const productsInCart = shoppingCart.filter(p => p.id === productId)

                // add product to cart before updating cart status
                shoppingCart.push(product);

                const {
                    id,
                    name,
                    price
                } = product;

                if (productsInCart.length === 0) {
                    $('#cart-status').append(`
                        <div id="status-${id}">
                            <span>${name}</span>
                            <span class="quantity">1</span>
                            <span class="totalPrice">${price}</span>
                            <button id="remove-one-${id}"> Remove One </button>
                            <button id="remove-all-${id}"> Remove All </button>
                        </div>
                    `);

                    $(`#remove-one-${id}`).on(
                        'click',
                        () => {
                            removeObjectsFromList(shoppingCart, 'id', id, 1);
                            const productsInCart = shoppingCart.filter(p => p.id === id)
                            if (productsInCart.length === 0) {
                                $(`#status-${id}`).remove();
                            } else {
                                $(`#status-${id} > .quantity`).html(`${productsInCart.length}`)
                                $(`#status-${id} > .totalPrice`).html(`${productsInCart.length * price}`)
                            }
                        }
                    );

                    $(`#remove-all-${id}`).on(
                        'click',
                        () => {
                            removeObjectsFromList(shoppingCart, 'id', id);
                            const productsInCart = shoppingCart.filter(p => p.id === id)
                            if (productsInCart.length === 0) {
                                $(`#status-${id}`).remove();
                            }
                        }
                    );
                }
                else {
                    const nbrOfProducts = productsInCart.length + 1;
                    $(`#status-${productId} > .quantity`).html(`${nbrOfProducts}`)
                    $(`#status-${productId} > .totalPrice`).html(`${nbrOfProducts * price}`)
                }
            })
    })
    .catch(error => console.log(error));