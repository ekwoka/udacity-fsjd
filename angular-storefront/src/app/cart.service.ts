import { Injectable } from '@angular/core';
import { Product } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartContents: CartItem[] = [];

  constructor() {}

  get count(): number {
    return this.cartContents.reduce(
      (count: number, i: CartItem) => count + Number(i.quantity),
      0
    );
  }

  get subtotal(): number {
    return this.cartContents.reduce(
      (sub: number, item: CartItem) => sub + item.price * item.quantity,
      0
    );
  }

  get taxEstimate(): number {
    return this.subtotal * 0.085;
  }

  get total(): number {
    return this.subtotal + this.taxEstimate;
  }

  get contents(): CartItem[] {
    return this.cartContents;
  }

  addToCart(product: Product): void {
    console.log(product.name, 'adding to cart');
    const productInCart = this.cartContents.find((p) => p.id === product.id);
    if (productInCart) {
      productInCart.quantity++;
      return;
    }
    this.cartContents.push({ ...product, quantity: 1 });
  }
}

export type CartItem = Product & {
  quantity: number;
};
