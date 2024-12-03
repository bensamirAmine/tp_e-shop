import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private cart: any[] = [];

  private favorites: number[] = [];

  private checkoutHistory: any[] = [];

  private products = [
    {
      id: 1,
      name: 'Ethiopian Yirgacheffe',
      price: 18.99,
      category: 'Light Roast',
      image: 'assets/espresso.jpg',
      description: 'A floral, citrusy light roast from Ethiopia.',
      origin: 'Ethiopia',
    },
    {
      id: 2,
      name: 'Colombian Supremo',
      price: 15.99,
      category: 'Medium Roast',
      image: 'assets/espresso.jpg',
      description: 'A smooth, nutty medium roast from Colombia.',
      origin: 'Colombia',
    },
    {
      id: 3,
      name: 'Sumatra Mandheling',
      price: 20.99,
      category: 'Dark Roast',
      image: 'assets/espresso.jpg',
      description: 'A bold, earthy dark roast from Sumatra.',
      origin: 'Indonesia',
    },
    {
      id: 4,
      name: 'Kenyan AA',
      price: 22.99,
      category: 'Light Roast',
      image: 'assets/espresso.jpg',
      description: 'A bright, fruity light roast from Kenya.',
      origin: 'Kenya',
    },
    {
      id: 5,
      name: 'Guatemalan Antigua',
      price: 17.99,
      category: 'Medium Roast',
      image: 'assets/espresso.jpg',
      description: 'A chocolaty, rich medium roast from Guatemala.',
      origin: 'Guatemala',
    },
  ];

  constructor() {}

  getProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find((product) => product.id === id);
  }

  getFavorites() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }

  updateFavorites(favorites: number[]) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  getCart() {
    if (localStorage.getItem('cart')) {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        this.cart = JSON.parse(cartData);
      }
    }
    return this.cart;
  }

  addToCart(product: any) {
    if (!product) {
      return;
    }
    if (this.cart.includes(product)) {
      product.quantity++;
      this.cart = this.cart.map((item) =>
        item.id === product.id ? product : item
      );
    } else {
      product.quantity = 1;
      this.cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));
    return this.cart;
  }

  removeFromCart(product: any) {
    if (!product) {
      return;
    }
    const index = this.cart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));

    return this.cart;
  }

  getCheckoutHistory() {
    const checkoutHistory = localStorage.getItem('checkoutHistory');
    return checkoutHistory ? JSON.parse(checkoutHistory) : [];
  }

  addToCheckoutHistory(order: any) {
    let checkoutHistory = this.getCheckoutHistory();
    checkoutHistory.push(order);
    localStorage.setItem('checkoutHistory', JSON.stringify(checkoutHistory));
    this.clearCart();
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem('cart');
  }

  clearCheckoutHistory() {
    localStorage.removeItem('checkoutHistory');
  }
}
