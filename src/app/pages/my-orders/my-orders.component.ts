import { Component } from '@angular/core';
import { ProductService } from '../our-products/services/product.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  imports: [NgIf, NgFor, DatePipe, RouterModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
})
export class MyOrdersComponent {
  orders: any[] = [];
  cartOpen = false;
  cart: any[] = [];
  isCheckoutModalOpen = false;
  isDropdownOpen = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadOrders();
    this.cart = this.productService.getCart();
  }

  loadOrders(): void {
    this.orders = this.productService.getCheckoutHistory();
  }

  viewOrderDetails(order: any): void {
    alert(`Viewing details for Order ID: ${order.id}`);
  }

  clearOrders(): void {
    this.productService.clearCheckoutHistory();
    this.loadOrders();
  }

  removeFromCart(product: any) {
    this.cart = this.productService.removeFromCart(product) as any[];
  }

  calculateTotal() {
    return this.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  toggleCart() {
    this.cartOpen = !this.cartOpen;
  }

  openCheckoutModal() {
    this.isCheckoutModalOpen = true;
  }

  closeCheckoutModal() {
    this.isCheckoutModalOpen = false;
  }

  confirmOrder(orderDetails: any) {
    this.productService.clearCart();
    this.cart = [];
    this.closeCheckoutModal();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
