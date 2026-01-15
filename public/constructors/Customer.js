import { getFavoriteProductsByuserId } from '../../api.js';
import Order from './Order.js';

class Customer {
    constructor(name) {
        this.name = name;
        this.orderHistory = [];
        this.favorites = [];
    }

    async login(userName) {
        const randomID = Math.floor(Math.random() * 1000);
        return { name: userName, id: randomID };

        sessionStorage.setItem('userID', randomID);
        await this.getAllFavorites();
    }

    placeOrder(cart) {
        const order = new Order(cart);
        this.orderHistory.push(order);
        return order;
    }

    toggleFavorites(product) {
        const index = this.favorites.findIndex(p => p.id === product.id);
        if (index !== -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(product);
        }
    }

    isFavorite(product) {
        return this.favorites.some(p => p.id === product.id);
    }

    async getAllFavorites() {
        const data = await getFavoriteProductsByuserId(this.name);
        this.favorites = await data.json();
    }
}

export default Customer;
export const customerConstructor = new Customer("Mike");
