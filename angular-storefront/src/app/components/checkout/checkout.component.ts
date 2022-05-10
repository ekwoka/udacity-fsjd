import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'storefront-checkout',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  inputNotValid({ form }: NgForm, prop: string): boolean {
    if (!form.controls[prop]) return false;
    return form.controls[prop].invalid && form.controls[prop].touched;
  }

  placeOrder(orderForm: NgForm): void {
    Object.entries(orderForm.form.controls).forEach(([key, value]) => {
      if (value.valid) return;
      console.log(key, value.errors);
    });
    if (!orderForm.valid) return console.log('Form Incomplete');
    this.router.navigate(['/order-confirmation']);
  }
}
