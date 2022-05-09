import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Product } from '../../services/products/products.service';

@Component({
  selector: 'storefront-product',
  template: `
    <div
      class="flex flex-col items-center justify-center gap-4 p-8"
      id="product-{{ product.id }}">
      <img
        class="h-auto w-full rounded"
        src="https://placekitten.com/{{ 300 + product.id * 12 }}/{{
          300 + product.id * 12
        }}"
        width="1"
        height="1"
        alt="{{ product.name }}" />
      <h2 class="text-xl">{{ product.name }}</h2>
      <p class="text-2xl font-semibold">$ {{ product.price }}</p>
      <button-primary
        [text]="'add to cart'"
        [onclick]="clickHandler"></button-primary>
    </div>
  `,
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  clickHandler = (e: Event): void => {
    this.cartService.addToCart(this.product);
  };
  constructor(private cartService: CartService) {
    this.product = {
      id: 0,
      name: '',
      price: 0,
      image: '',
      descriptions: '',
    };
  }

  ngOnInit(): void {}
}
