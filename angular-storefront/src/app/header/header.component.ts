import { Component, OnInit } from '@angular/core';

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
  constructor() {}

  ngOnInit(): void {}
}

type Link = {
  url: string;
  label: string;
};
