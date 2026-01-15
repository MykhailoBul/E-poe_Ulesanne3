import { displayAllProductsView } from "./views/allProductsView.js";
import { navigate } from "./router.js";
import { fetchProducts, getAllCategories } from "./api.js";
import { cartConstructor } from "./constructors/Cart.js";

let products = [];

const updateCartCount = () => {
    const counter = document.getElementById("cart-count");
    if (counter) {
        counter.textContent = cartConstructor.totalItems;
    }
};

let userId = sessionStorage.getItem("userId");
if (!userId) {
    userId = crypto.randomUUID();
    sessionStorage.setItem("userId", userId);
}

const initApp = async () => {
    /* buttons */
    document.getElementById("home-button").onclick = () => {
        navigate("allProducts", "all");
    };

    document.getElementById("favourites").onclick = () => {
        navigate("favorites");
    };

    document.getElementById("cart-btn").onclick = () => {
        navigate("cart");
    };

    /* categories */
    const categoryMenu = document.getElementById("category-menu");
    if (categoryMenu) {
        const categories = await getAllCategories();
        categories.forEach(category => {
            const btn = document.createElement("button");
            btn.textContent = category;
            btn.onclick = () => navigate("allProducts", category);
            categoryMenu.appendChild(btn);
        });
    }

    products = await fetchProducts();
    updateCartCount();

    /* routing after refresh */
    const path = window.location.pathname;

    if (path === "/favorites") {
        navigate("favorites");
    } else if (path === "/cart") {
        navigate("cart");
    } else if (path.startsWith("/product/")) {
        const id = path.split("/").pop();
        navigate("productDetail", id);
    } else if (path.startsWith("/category/")) {
        const category = path.split("/").pop();
        navigate("allProducts", category);
    } else {
        displayAllProductsView(products);
    }
};

document.addEventListener("DOMContentLoaded", initApp);
