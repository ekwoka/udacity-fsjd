import { Injectable } from '@angular/core';
import { Toast } from 'src/app/components/toast-item/toast-item.component';
import { getStorage } from 'src/utils/getStorage';
import { Product } from '../products/products.service';
import { ToastsService } from '../toasts/toasts.service';

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

  constructor(private toastsService: ToastsService) {}

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
    this.toastSuccess(product);
    if (productInCart) {
      productInCart.quantity++;
      return;
    }
    this.cartContents.push({ ...product, quantity: 1 });
  }

  toastSuccess(product: Product): void {
    const buttons: Toast['buttons'] = [
      {
        label: 'View Cart',
        action: () => console.log('View Cart'),
        type: 'primary',
      },
      {
        label: 'Checkout',
        action: () => console.log('Checkout'),
        type: 'secondary',
      },
    ];
    this.toastsService.addToast(
      'Success',
      `${product.name} added to cart`,
      'success',
      undefined,
      buttons
    );
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
