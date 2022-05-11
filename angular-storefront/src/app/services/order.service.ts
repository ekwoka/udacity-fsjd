import { Injectable } from '@angular/core';
import { CartItem } from './cart/cart.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private _order: Order;
  constructor() {
    this._order = {
      'email-address': 'Tony@StarkIndustries.com',
      'card-number': 'xxxx',
      'expiration-date': '01/86',
      cvc: '',
      address: '',
      city: '',
      region: '',
      'postal-code': '',
      items: [],
      price: {
        subtotal: 0,
        tax: 0,
        total: 0,
      },
    };
  }

  confirmOrder(order: OrderInfo, items: CartItem[], price: Price): void {
    this._order = {
      ...order,
      items,
      'card-number': order['card-number'].replace(/\d{12}/, ''),
      cvc: 'xxx',
      price,
    };
    console.log(this.order);
  }

  get order(): Order {
    return this._order;
  }
}

export type Order = OrderInfo & {
  items: CartItem[];
  price: Price;
};

export type Price = {
  subtotal: number;
  tax: number;
  total: number;
};

export type OrderInfo = {
  'email-address': string;
  'card-number': string;
  'expiration-date': string;
  cvc: string;
  address: string;
  city: string;
  region: string;
  'postal-code': string;
};
