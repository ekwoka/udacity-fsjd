import { Component } from '@angular/core';

@Component({
  selector: 'storefront-root',
  template: `
    <storefront-header></storefront-header>
    <router-outlet></router-outlet>
    <toast-controller></toast-controller>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'My Store';
}
