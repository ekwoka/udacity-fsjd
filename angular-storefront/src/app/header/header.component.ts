import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'storefront-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  links: Link[] = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'View All',
      url: '/collection',
    },
    {
      label: 'Cart',
      url: '/cart',
    },
  ];
  constructor(private cartService: CartService) {}

  get cartCount() {
    return this.cartService.count;
  }

  ngOnInit(): void {}
}

type Link = {
  url: string;
  label: string;
};
