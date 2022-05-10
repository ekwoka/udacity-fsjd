import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'button-primary',
  template: `
    <button
      type="button"
      (click)="onclick($event)"
      class="min-w-max rounded-2xl bg-emerald-700 px-6 py-2 text-emerald-100 shadow hover:bg-emerald-600 hover:text-emerald-50">
      {{ text }}
    </button>
  `,
})
export class ButtonPrimaryComponent implements OnInit {
  @Input() text: string = '';
  @Input() onclick: (e: Event) => void = () => {};
  constructor() {}

  ngOnInit(): void {}
}
