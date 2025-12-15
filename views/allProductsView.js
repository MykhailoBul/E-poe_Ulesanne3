// export const displayAllProductsView = (products) => {
//     const container = document.getElementById('main-container');
//     container.innerHTML = '<h2>Tooted</h2>';

//     const productsContainer = document.createElement('div');
//     productsContainer.classList.add('products-container');

//     products.forEach(product => {
//         const productCard = document.createElement('div');
//         productCard.classList.add('product');

//         productCard.innerHTML = `
//             <h3>${product.title}</h3>
//             <p>Kategooria: ${product.category}</p>
//             <p>Hind: $${product.price.toFixed(2)}</p>
//             <button id="favourites${product.id}">Lisa lemmikutesse</button>
//         `;

//         const cartButton = document.createElement('button');
//         cartButton.textContent = "Lisa ostukorvi";

//         productCard.appendChild(cartButton);

//         productsContainer.append(productCard);
//     });

//     container.append(productsContainer);
// }
import { cartConstructor } from '../constructors/Cart.js';
import { customerConstructor } from '../constructors/Customer.js';

export const displayAllProductsView = (products) => {
    const container = document.getElementById('main-container');
    container.innerHTML = '<h2>Tooted</h2>';

    const productsContainer = document.createElement('div');

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product');

        const favBtn = document.createElement('button');
        favBtn.textContent = 'Lisa lemmikutesse';

        if (customerConstructor.getAllFavorites().some(p => p.id === product.id)) {
            favBtn.classList.add('favourite-active');
        }

        favBtn.onclick = () => {
            customerConstructor.toggleFavorites(product);
            favBtn.classList.toggle('favourite-active');
        };

        const cartBtn = document.createElement('button');
        cartBtn.textContent = 'Lisa ostukorvi';
        cartBtn.onclick = () => {
            cartConstructor.addProduct(product, 1);
        };

        productCard.innerHTML = `
            <h3>${product.title}</h3>
            <p>Kategooria: ${product.category}</p>
            <p>Hind: $${product.price.toFixed(2)}</p>
        `;

        productCard.append(favBtn, cartBtn);
        productsContainer.append(productCard);
    });

    container.append(productsContainer);
};
