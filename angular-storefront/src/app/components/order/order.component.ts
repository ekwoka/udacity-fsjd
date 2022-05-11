import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/services/cart/cart.service';
import { Order, OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'order-confirmation',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
  tracking: string;
  constructor(private orderService: OrderService) {
    this.tracking = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 10)
    ).join('');
  }

  get orderContents(): CartItem[] {
    return this.orderService.order.items;
  }

  get order(): Order {
    return this.orderService.order;
  }

  ngOnInit(): void {}
}
