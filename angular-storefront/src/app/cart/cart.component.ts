import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../cart.service';

@Component({
  selector: 'storefront-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  get contents(): CartItem[] {
    return this.cartService.contents;
  }
  constructor(public cartService: CartService) {}

  ngOnInit(): void {}
}
