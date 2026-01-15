import Product from "./public/constructors/Product.js";

export const fetchProducts = async (category) => {
    const url =
        category && category !== "all"
            ? `/api/products?category=${category}`
            : "/api/products";

    const response = await fetch(url);
    const data = await response.json();

    return data.map(p =>
        new Product(
            p.id,
            p.title,
            p.price,
            p.category,
            p.description,
            p.image
        )
    );
};

export const getProductById = async (id) => {
    const response = await fetch(`/api/products/${id}`);
    const p = await response.json();

    return new Product(
        p.id,
        p.title,
        p.price,
        p.category,
        p.description,
        p.image
    );
};


export const getFavoriteProductsByuserId = async (userId) => {
    try {
        const response = await fetch(`/api/users/${userId}/favorites`);
        const favoriteProductsData = await response.json();
        return favoriteProductsData.map(p =>
            new Product(p.id, p.name, p.price, p.category, p.description, p.image)
        );
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
};