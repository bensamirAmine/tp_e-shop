import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../pages/our-products/services/product.service';

@Component({
  selector: 'app-checkout-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout-modal.component.html',
  styleUrl: './checkout-modal.component.scss',
})
export class CheckoutModalComponent {
  @Input() cart: any[] = [];
  @Input() total: number = 0;
  @Output() closeModal = new EventEmitter<void>();
  @Output() confirmOrder = new EventEmitter<any>();

  name: string = '';
  email: string = '';
  address: string = '';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';

  isProcessing: boolean = false;

  constructor(private productService: ProductService) {}

  closeCheckoutModal() {
    this.closeModal.emit();
  }

  submitOrder() {
    if (this.validateForm()) {
      this.isProcessing = true;
      const orderID = Date.now();

      setTimeout(() => {
        const orderDetails = {
          id: orderID,
          items: this.cart,
          total: this.total,
          customerInfo: {
            name: this.name,
            email: this.email,
            address: this.address,
          },
        };
        this.productService.addToCheckoutHistory(orderDetails);
        this.confirmOrder.emit(orderDetails);
        this.isProcessing = false;
      }, 2000);
    }
  }

  private validateForm(): boolean {
    return !!(
      this.name &&
      this.email &&
      this.address &&
      this.cardNumber &&
      this.expiryDate &&
      this.cvv
    );
  }

  formatCardNumber(value: string) {
    return value
      .replace(/\s+/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  }
}
