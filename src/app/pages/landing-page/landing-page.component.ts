import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ProductService } from '../our-products/services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { CheckoutModalComponent } from '../../components/checkout-modal/checkout-modal.component';

@Component({
  selector: 'app-landing-page',
  imports: [RouterModule, NgFor, NgIf, CheckoutModalComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  cartOpen = false;
  cart: any[] = [];
  isCheckoutModalOpen = false;
  products: any[] = [];

  services: any[] = [
    {
      icon: 'fa-solid fa-leaf',
      title: 'Sustainable Sourcing',
      description: 'Ethically sourced beans supporting local farmers',
    },
    {
      icon: 'fa-solid fa-truck',
      title: 'Quick Delivery',
      description: 'Fresh coffee delivered right to your doorstep',
    },
    {
      icon: 'fa-solid fa-graduation-cap',
      title: 'Brewing Workshops',
      description: 'Learn from expert baristas and elevate your skills',
    },
  ];

  testimonials: any[] = [
    {
      name: 'Sarah Johnson',
      quote:
        'AromaVault changed my morning routine forever. Their beans are simply extraordinary!',
      avatar: 'https://avatar.iran.liara.run/public/girl',
    },
    {
      name: 'Michael Chen',
      quote: 'The most incredible coffee experience. Every sip tells a story.',
      avatar: 'https://avatar.iran.liara.run/public/boy',
    },
  ];

  useSteps: any[] = [
    {
      icon: 'fa-solid fa-coffee',
      title: 'Choose Your Beans',
      description: 'Select from our premium, globally sourced coffee varieties',
    },
    {
      icon: 'fa-solid fa-filter',
      title: 'Grind to Perfection',
      description: 'Use our professional grinder for the ideal consistency',
    },
    {
      icon: 'fa-solid fa-temperature-half',
      title: 'Brew with Care',
      description: 'Follow our expert brewing guides for the best flavor',
    },
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.cart = this.productService.getCart();
    this.products = this.productService.getProducts().slice(0, 3);
  }

  toggleCart() {
    this.cartOpen = !this.cartOpen;
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
}
