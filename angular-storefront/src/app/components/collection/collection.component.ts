import { Component, OnInit } from '@angular/core';
import {
  Product,
  ProductsService,
} from '../../services/products/products.service';

@Component({
  selector: 'storefront-collection',
  template: `
    <div class="px-12">
      <div
        class="mx-auto grid max-w-screen-lg grid-flow-row grid-cols-2 gap-4 md:grid-cols-3">
        <storefront-product
          *ngFor="let product of products"
          [product]="product"></storefront-product>
      </div>
    </div>
  `,
})
export class CollectionComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.productList.subscribe((products) => {
      this.products = products;
    });
  }
}
