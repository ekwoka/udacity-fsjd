import { Component, OnInit } from '@angular/core';
import { ToastsService } from 'src/app/services/toasts/toasts.service';
import { Toast } from '../toast-item/toast-item.component';

@Component({
  selector: 'toast-controller',
  template: `
    <div
      aria-live="assertive"
      class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
      <div class="flex w-full flex-col items-center gap-y-4 sm:items-end">
        <toast-item *ngFor="let toast of toasts" [toast]="toast"></toast-item>
      </div>
    </div>
  `,
})
export class ToastControllerComponent implements OnInit {
  get toasts(): Toast[] {
    return this.toastService.toasts;
  }
  constructor(private toastService: ToastsService) {}

  ngOnInit(): void {}
}
