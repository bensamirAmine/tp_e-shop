import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../../pages/our-products/services/product.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  @Output() cart: EventEmitter<any> = new EventEmitter();

  products: any[] = [];
  filteredProducts: any[] = [];
  favorites: any[] = [];
  searchQuery = '';
  sortOption = 'name-asc';
  selectedCategory = 'all';
  priceRange: any[] = [0, 25];
  selectedPrice: number = 25;
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.favorites = this.productService.getFavorites();
    this.filteredProducts = this.products;
    this.applyFilters();
    this.priceRange = [0, Math.max(...this.products.map((p) => p.price)) + 5];
    this.selectedPrice = this.priceRange[1];
  }

  toggleFavorite(productId: number) {
    if (this.favorites.includes(productId)) {
      this.favorites = this.favorites.filter((id) => id !== productId);
    } else {
      this.favorites.push(productId);
    }
    this.productService.updateFavorites(this.favorites);
  }

  isFavorite(productId: number): boolean {
    return this.favorites.includes(productId);
  }

  applyFilters() {
    let products = [...this.products];

    if (this.selectedCategory !== 'all') {
      products = products.filter((p) => p.category === this.selectedCategory);
    }

    products = products.filter(
      (p) => p.price >= 0 && p.price <= this.selectedPrice
    );

    if (this.searchQuery) {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    if (this.sortOption === 'name-asc') {
      products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortOption === 'name-desc') {
      products.sort((a, b) => b.name.localeCompare(a.name));
    } else if (this.sortOption === 'price-asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (this.sortOption === 'price-desc') {
      products.sort((a, b) => b.price - a.price);
    }

    this.filteredProducts = products;
  }

  addToCart(event: any) {
    this.cart.emit(event);
  }

  navigateToProduct(product: any) {
    this.router.navigate(['/product', product.id]);
  }
}
