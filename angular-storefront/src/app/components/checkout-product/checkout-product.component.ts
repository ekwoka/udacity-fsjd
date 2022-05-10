import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'checkout-product',
  template: `
    <li class="flex items-start space-x-4 py-6">
      <img
        src="{{ product.image }}"
        alt="Front of zip tote bag with white canvas, white handles, and black drawstring top."
        class="h-20 w-20 flex-none rounded-md object-cover object-center" />
      <div class="flex-auto space-y-1">
        <h3 class="text-white">{{ product.name }}</h3>
        <p>Quantity: {{ product.quantity }}</p>
      </div>
      <p class="flex-none text-base font-medium text-white">
        $ {{ product.price }}
      </p>
    </li>
  `,
})
export class CheckoutProductComponent implements OnInit {
  @Input() product: CartItem;
  constructor() {
    this.product = {
      id: 0,
      name: '',
      price: 0,
      quantity: 0,
      image: '',
      description: '',
    };
  }

  ngOnInit(): void {}
}
