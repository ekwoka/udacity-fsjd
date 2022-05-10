import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/services/products/products.service';
import { CartItem, CartService } from '../../services/cart/cart.service';
import { Option } from '../select/select.component';

@Component({
  selector: 'cart-product',
  template: `
    <li class="flex py-6 sm:py-10" id="cart-{{ product.id }}">
      <div class="flex-shrink-0">
        <img
          src="{{ product.image || 'https://placekitten.com/300/300' }}"
          alt="{{ product.name }}"
          class="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
          loading="lazy"
          width="165"
          height="248" />
      </div>

      <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div class="flex justify-between">
              <h3 class="text-sm">
                <a
                  routerLink="{{ '/products/' + product.id }}"
                  class="font-medium text-gray-700 hover:text-gray-800">
                  {{ product.name }}
                </a>
              </h3>
            </div>
            <p class="mt-1 text-sm font-medium text-gray-900">
              $ {{ product.price }}
            </p>
          </div>

          <div class="mt-4 sm:mt-0 sm:pr-9">
            <label for="quantity-0" class="sr-only">
              Quantity, {{ product.name }}</label
            >
            <input-select
              [(ngModel)]="product.quantity"
              [options]="quantityOptions"></input-select>

            <div class="absolute top-0 right-0">
              <button
                type="button"
                class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                (click)="remove(product)">
                <span class="sr-only">Remove</span>
                <hero-icon
                  name="x"
                  type="solid"
                  class="h-5 w-5 fill-gray-500 text-transparent"></hero-icon>
              </button>
            </div>
          </div>
        </div>

        <p class="mt-4 flex space-x-2 text-sm text-gray-700">
          <hero-icon
            name="check"
            type="solid"
            class="h-5 w-5 fill-emerald-500 text-transparent"></hero-icon>
          <span>In stock</span>
        </p>
      </div>
    </li>
  `,
})
export class CartProductComponent implements OnInit {
  @Input() product: CartItem;
  quantityOptions: Option[] = quantityOptions;
  constructor(private cartService: CartService) {
    this.product = {
      id: 0,
      name: '',
      price: 0,
      quantity: 0,
      image: '',
      description: '',
    };
  }
  remove(product: Product): void {
    this.cartService.removeFromCart(product);
  }

  ngOnInit(): void {}
}

const quantityOptions: Option[] = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 6,
    label: '6',
  },
  {
    value: 7,
    label: '7',
  },
];
