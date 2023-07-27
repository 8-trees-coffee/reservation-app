import { Component } from '@angular/core';
import { products } from '../../products';

@Component({
  selector: 'app-product-listings',
  templateUrl: './product-listings.component.html',
  styleUrls: ['./product-listings.component.scss']
})
export class ProductListingsComponent {
  products: any

  constructor() {}
  
  ngOnInit() {
    this.products = products
  }
}
