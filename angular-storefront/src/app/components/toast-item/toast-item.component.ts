import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit, Output } from '@angular/core';
import { nextTick } from 'src/utils/nextTick';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'toast-item',
  template: `
    <div
      [@state]="remove ? 'none' : toast.shown ? 'visible' : 'hidden'"
      class="pointer-events-auto w-full max-w-sm rounded-lg bg-white shadow-lg
      ring-1 ring-black ring-opacity-5">
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0 pt-0.5">
            <img
              class="h-10 w-10 rounded-full"
              src="https://placekitten.com/100/100"
              alt=""
              width="1"
              height="1"
              loading="lazy" />
          </div>
          <div class="ml-3 w-0 flex-1">
            <p class="text-sm font-medium text-gray-900">{{ toast.heading }}</p>
            <p class="mt-1 text-sm text-gray-500">
              {{ toast.message }}
            </p>
            <div class="mt-4 flex gap-2">
              <button-primary
                *ngFor="let button of toast.buttons"
                type="button"
                (click)="performAction(button.action)"
                [text]="button.label">
              </button-primary>
            </div>
          </div>
          <div class="ml-4 flex flex-shrink-0">
            <button
              type="button"
              (click)="hideToast()"
              class="group inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
              <span class="sr-only">Close</span>
              <hero-icon
                name="x"
                type="solid"
                class="h-5 w-5 fill-gray-400 text-transparent group-hover:fill-gray-500"></hero-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  host: {
    class: 'w-full max-w-sm',
  },
  animations: [
    trigger('state', [
      state(
        'visible',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      state(
        'hidden',
        style({
          opacity: 0,
          transform: 'translateX(120%)',
        })
      ),
      state('none', style({ display: 'none' })),
      transition('hidden => visible', [animate('400ms ease-out')]),
      transition('visible => hidden', [animate('200ms ease-in')]),
    ]),
  ],
})
export class ToastItemComponent implements OnInit {
  @Input() toast: Toast;
  @Output() removeToast = new EventEmitter<Toast>()
  _remove: boolean = false
  get remove(): boolean {
    return this._remove;
  }
  set remove(value: boolean) {
    if (value) this.removeToast.emit(this.toast);
    this._remove = value;
  }

  constructor() {
    this.toast = {
      shown: false,
      heading: '',
      message: '',
      type: 'info',
      timeout: 1000,
    };
  }

  async ngOnInit(): Promise<void> {
    await nextTick();
    this.toast.shown = true;
    setTimeout(() => this.hideToast(), this.toast.timeout);
  }

  hideToast(): void {
    this.toast.shown = false;
    setTimeout(() => (this.remove = true), 400);
  }

  performAction(action: () => void): void {
    action();
    this.hideToast();
  }
}

export type Toast = {
  shown: boolean;
  heading: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  timeout: number;
  buttons?: {
    type: 'primary' | 'secondary';
    label: string;
    action: () => void;
  }[];
};
