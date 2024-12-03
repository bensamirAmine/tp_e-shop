import { Component, OnInit } from '@angular/core';
import { ProductService } from '../our-products/services/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { CheckoutModalComponent } from '../../components/checkout-modal/checkout-modal.component';

@Component({
  selector: 'app-product-details',
  imports: [NgIf, NgFor, RouterLink, CheckoutModalComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  cartOpen = false;
  cart: any[] = [];
  isCheckoutModalOpen = false;
  isDropdownOpen = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.product = this.productService.getProductById(Number(productId));
    this.cart = this.productService.getCart();
  }

  addToCart(): void {
    this.cart = this.productService.addToCart(this.product) || [];
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
