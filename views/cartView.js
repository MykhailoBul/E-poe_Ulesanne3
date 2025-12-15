// export const displayCartView = (cart) => {
//     const container = document.getElementById('cart-view');
//     container.innerHTML = '<h2>Ostukorv</h2>';

//     const cartContainer = document.createElement('div');
//     cartContainer.classList.add('cart-container');

//     if (cart.items.length === 0) {
//         cartContainer.innerHTML = '<p>Teie ostukorv on tühi.</p>';
//     } else {
//         cart.items.forEach(item => {
//             const itemElement = document.createElement('div');
//             itemElement.classList.add('cart-item');
//             itemElement.innerHTML = `
//                 <p>${item.product.title} x${item.quantity}</p>
//                 <p>Hind: $${(item.product.price * item.quantity).toFixed(2)}</p>
//             `;
//             cartContainer.appendChild(itemElement);
//         });

//         const totalElement = document.createElement('div');
//         totalElement.innerHTML = `<p>Kogusumma: $${cart.calculateTotal().toFixed(2)}</p>`;
//         cartContainer.appendChild(totalElement);
//     }

//     container.appendChild(cartContainer);
// };
export const displayCartView = (cart) => {
    const container = document.getElementById('main-container');
    container.innerHTML = '<h2>Ostukorv</h2>';

    if (cart.items.length === 0) {
        container.innerHTML += '<p>Ostukorv on tühi</p>';
        return;
    }

    cart.items.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('product');
        div.innerHTML = `
            <p>${item.product.title} x${item.quantity}</p>
            <p>$${(item.product.price * item.quantity).toFixed(2)}</p>
        `;
        container.appendChild(div);
    });
};
