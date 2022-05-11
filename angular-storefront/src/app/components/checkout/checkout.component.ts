import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService, Price } from 'src/app/services/order.service';

@Component({
  selector: 'storefront-checkout',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {
  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {}

  inputNotValid({ form }: NgForm, prop: string): boolean {
    if (!form.controls[prop]) return false;
    return form.controls[prop].invalid && form.controls[prop].touched;
  }

  placeOrder(orderForm: NgForm): void {
    if (!orderForm.valid) return console.log('Form Incomplete');
    const price: Price = {
      subtotal: this.cartService.subtotal,
      tax: this.cartService.taxEstimate,
      total: this.cartService.total,
    };
    this.orderService.confirmOrder(
      orderForm.value,
      this.cartService.contents,
      price
    );
    this.router.navigate(['/order']);
    this.cartService.clearCart();
  }
}
