import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../our-products/services/product.service';
import { RouterModule } from '@angular/router';
import { CheckoutModalComponent } from '../../components/checkout-modal/checkout-modal.component';

@Component({
  selector: 'app-about-us',
  imports: [NgFor, NgIf, RouterModule, CheckoutModalComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {
  teamMembers: any[] = [
    {
      name: 'Nada Jaouadi',
      role: 'Founder & CEO',
      bio: 'Coffee explorer and sustainability advocate with 15 years of experience in global coffee sourcing.',
      image: 'https://avatar.iran.liara.run/public/girl',
      socialLinks: {
        linkedin: 'https://tn.linkedin.com/in/jaouadi-nada-92224b245',
        instagram: 'https://www.instagram.com/jd_nadaa',
      },
    },
    {
      name: 'Mohamed Ben Ali',
      role: 'Head Roastmaster',
      bio: 'Passionate about perfecting roasting techniques and bringing out the unique flavors of each bean.',
      image: 'https://avatar.iran.liara.run/public/boy',
      socialLinks: {
        linkedin: '#',
      },
    },
    {
      name: 'Leila Ben Youssef',
      role: 'Sustainability Director',
      bio: 'Dedicated to ensuring fair trade practices and environmental sustainability in our coffee supply chain.',
      image: 'https://avatar.iran.liara.run/public/girl',
      socialLinks: {
        twitter: '#',
      },
    },
  ];

  companyValues: any[] = [
    {
      title: 'Quality First',
      description:
        'We never compromise on the quality of our beans, ensuring every cup is an exceptional experience.',
      icon: 'fas fa-medal',
    },
    {
      title: 'Sustainability',
      description:
        'Committed to ethical sourcing and supporting coffee farming communities around the world.',
      icon: 'fas fa-leaf',
    },
    {
      title: 'Community',
      description:
        'Building connections through our love for coffee and sharing knowledge with our customers.',
      icon: 'fas fa-users',
    },
  ];

  cartOpen = false;
  cart: any[] = [];
  isCheckoutModalOpen = false;
  isDropdownOpen = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.cart = this.productService.getCart();
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
