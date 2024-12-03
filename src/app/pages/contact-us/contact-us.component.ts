import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../our-products/services/product.service';
import { CheckoutModalComponent } from '../../components/checkout-modal/checkout-modal.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CheckoutModalComponent,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  cartOpen = false;
  cart: any[] = [];
  isCheckoutModalOpen = false;
  isDropdownOpen = false;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    this.cart = this.productService.getCart();
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form Submitted', this.contactForm.value);
      alert('Merci pour votre message ! Nous vous répondrons bientôt.');
      this.contactForm.reset();
    }
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
