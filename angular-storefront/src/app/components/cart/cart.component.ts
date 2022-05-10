import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem, CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'storefront-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  get contents(): CartItem[] {
    return this.cartService.contents;
  }
  constructor(public cartService: CartService, public router: Router) {}

  ngOnInit(): void {}
}
