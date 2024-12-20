import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { CheckoutModalComponent } from '../../components/checkout-modal/checkout-modal.component';

@Component({
  selector: 'app-our-products',
  templateUrl: './our-products.component.html',
  styleUrls: ['./our-products.component.scss'],
  imports: [
    NgFor,
    NgIf,
    RouterModule,
    ProductListComponent,
    CheckoutModalComponent,
  ],
  standalone: true,
})
export class OurProductsComponent implements OnInit {
  products: any[] = [];
  cartItemsCount: number = 0;
  cart: any[] = [];
  cartOpen = false;
  isCheckoutModalOpen = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.cart = this.productService.getCart();
  }

  addToCart(product: any[]) {
    this.cart = this.productService.addToCart(product) as any[];
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

  isDropdownOpen = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
