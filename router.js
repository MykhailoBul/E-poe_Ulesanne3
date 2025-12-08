import { displayAllProductsView } from './views/allProductsView';
import { displayCartView } from './views/cartView.js';
import { displayFavoritesView } from './views/favoritesView.js';
import { displayProductDetailView } from './views/productDetailView.js';

export const initRouter = (products, cart, favorites) => {
    displayAllProductsView(products);
    displayCartView(cart);
    displayFavoritesView(favorites);
    displayProductDetailView(products[0]); 
};