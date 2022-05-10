import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { Product } from '../../services/products/products.service';

@Component({
  selector: 'collection-product',
  template: `
    <div
      class="flex flex-col items-center justify-center gap-4"
      id="product-{{ product.id }}">
      <button type="button" (click)="navigateTo(product.id)">
        <img
          class="h-auto w-full rounded"
          src="{{ product.image || 'https://placekitten.com/300/300' }}"
          width="165"
          height="248"
          alt="{{ product.name }}"
          loading="lazy" />
      </button>
      <h2 class="text-xl">{{ product.name }}</h2>
      <p class="text-2xl font-semibold">$ {{ product.price }}</p>
      <button-primary
        [text]="'add to cart'"
        [onclick]="clickHandler"></button-primary>
    </div>
  `,
})
export class CollectionProductComponent implements OnInit {
  @Input() product: Product;
  clickHandler = (e: Event): void => {
    this.cartService.addToCart(this.product);
  };
  navigateTo(id: number): void {
    this.router.navigate(['products', id]);
  }
  constructor(private cartService: CartService, private router: Router) {
    this.product = {
      id: 0,
      name: '',
      price: 0,
      image: '',
      description: '',
    };
  }

  ngOnInit(): void {}
}
