import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'checkout-cart',
  template: `
    <div class="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
      <h2 id="summary-heading" class="sr-only">Order summary</h2>

      <dl>
        <dt class="text-sm font-medium">Amount due</dt>
        <dd class="mt-1 text-3xl font-extrabold text-white">
          $ {{ cartService.total.toFixed(2) }}
        </dd>
      </dl>

      <ul
        role="list"
        class="divide-y divide-white divide-opacity-10 text-sm font-medium">
        <checkout-product
          *ngFor="let product of contents"
          [product]="product"></checkout-product>
      </ul>

      <dl
        class="space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium">
        <div class="flex items-center justify-between">
          <dt>Subtotal</dt>
          <dd>$ {{ cartService.subtotal.toFixed(2) }}</dd>
        </div>

        <div class="flex items-center justify-between">
          <dt>Shipping</dt>
          <dd>FREE</dd>
        </div>

        <div class="flex items-center justify-between">
          <dt>Taxes</dt>
          <dd>$ {{ cartService.taxEstimate.toFixed(2) }}</dd>
        </div>

        <div
          class="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-white">
          <dt class="text-base">Total</dt>
          <dd class="text-base">$ {{ cartService.total.toFixed(2) }}</dd>
        </div>
      </dl>
    </div>
  `,
})
export class CheckoutCartComponent implements OnInit {
  get contents(): CartItem[] {
    return this.cartService.contents;
  }
  constructor(public cartService: CartService) {}

  ngOnInit(): void {}
}
