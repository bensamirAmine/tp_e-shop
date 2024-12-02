import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-products',
  templateUrl: './our-products.component.html',
  styleUrls: ['./our-products.component.css']
})
export class OurProductsComponent implements OnInit {
  products = [
    {
      id: 1,
      name: 'Espresso Roast',
      description: 'Rich and bold espresso roast coffee.',
      price: 12.99,
      image: 'assets/images/espresso-roast.jpg'
    },
    {
      id: 2,
      name: 'Colombian Blend',
      description: 'Smooth and aromatic Colombian coffee.',
      price: 14.99,
      image: 'assets/images/colombian-blend.jpg'
    },
    {
      id: 3,
      name: 'French Vanilla',
      description: 'Light roast with a hint of vanilla flavor.',
      price: 10.99,
      image: 'assets/images/french-vanilla.jpg'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
