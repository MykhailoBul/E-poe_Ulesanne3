import { displayFavoritesView } from "./views/favoritesView.js";
import { displayProductDetailView } from "./views/productDetailView.js";
import { displayCartView } from "./views/cartView.js";
import { displayAllProductsView } from "./views/allProductsView.js";

export const navigate = (view, param, push = true) => {
    const views = {
        allProducts: () => displayAllProductsView(param),
        productDetail: () => displayProductDetailView(param),
        cart: () => displayCartView(),
        favorites: () => displayFavoritesView()
    };

    if (views[view]) {
        views[view]();
        // Update browser history
        if (push) {
            const url = constructUrl(view, param);
            window.history.pushState({ view, param }, '', url);
        }
    }
};

const constructUrl = (view, param) => {
    switch (view) {
        case "allProducts":
            return param && param !== "all" ? `/category/${param}` : "/";
        case "productDetail":
            return `/product/${param}`;
        case "cart":
            return "/cart";
        case "favorites":
            return "/favorites";
        default:
            return "/";
    }
};