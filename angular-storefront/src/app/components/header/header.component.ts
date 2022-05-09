import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';

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
  constructor(private cartService: CartService, private router: Router) {}

  get cartCount() {
    return this.cartService.count;
  }

  navigateToCart() {
    this.router.navigate(['cart']);
  }

  ngOnInit(): void {}
}

type Link = {
  url: string;
  label: string;
};
