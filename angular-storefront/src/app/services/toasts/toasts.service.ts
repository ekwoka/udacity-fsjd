import { Injectable } from '@angular/core';
import { Toast } from 'src/app/components/toast-item/toast-item.component';

@Injectable({
  providedIn: 'root',
})
export class ToastsService {
  toasts: Toast[] = [];

  addToast(
    heading: string,
    message: string,
    type: Toast['type'] = 'info',
    timeout: number = 5000,
    buttons: Toast['buttons'] = []
  ): void {
    this.toasts.push({
      shown: false,
      heading,
      message,
      type,
      timeout,
      buttons,
    });
  }

  constructor() {}
}
