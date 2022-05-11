import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'storefront-hero',
  template: `
    <div class="bg-white">
      <div class="relative bg-emerald-900">
        <div aria-hidden="true" class="absolute inset-0 overflow-hidden">
          <img
            src="https://tailwindui.com/img/ecommerce-images/home-page-01-hero-full-width.jpg"
            alt=""
            class="h-full w-full object-cover object-center" />
        </div>
        <div
          aria-hidden="true"
          class="absolute inset-0 bg-emerald-900 opacity-50"></div>

        <div
          class="relative mx-auto flex max-w-3xl flex-col items-center py-32 px-6 text-center sm:py-64 lg:px-0">
          <h1
            class="text-4xl font-extrabold tracking-tight text-white lg:text-6xl">
            New arrivals are here
          </h1>
          <p class="mt-4 text-xl text-white">
            The new arrivals have, well, newly arrived. Check out the latest
            options from our summer small-batch release while they're still in
            stock.
          </p>
          <a
            routerLink="/collection"
            class="mt-8 inline-block rounded-md border border-transparent bg-white py-3 px-8 text-base font-medium text-gray-900 hover:bg-emerald-100">
            Shop New Arrivals
          </a>
        </div>
      </div>
    </div>
  `,
})
export class HeroComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
