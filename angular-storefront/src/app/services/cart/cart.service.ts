import { Injectable } from '@angular/core';
import { getStorage } from 'src/utils/getStorage';
import { Product } from '../products/products.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cartContents: CartItem[] = getStorage<CartItem[]>('cart', []);
  private get cartContents(): CartItem[] {
    return this._cartContents;
  }
  private set cartContents(val: CartItem[]) {
    this._cartContents = getStorage<CartItem[]>('cart', val, true);
  }

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
    const productInCart = this.cartContents.find((p) => p.id === product.id);
    if (productInCart) {
      productInCart.quantity++;
      return;
    }
    this.cartContents.push({ ...product, quantity: 1 });
  }

  removeFromCart(product: Product): void {
    this.cartContents = this.cartContents.filter(
      (item) => item.id !== product.id
    );
  }
}

export type CartItem = Product & {
  quantity: number;
};
