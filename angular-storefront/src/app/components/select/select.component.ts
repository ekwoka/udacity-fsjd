import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-select',
  template: `
    <select
      id="quantity-0"
      name="quantity-0"
      class="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
      (change)="handleChange($event)"
      [value]="value">
      <option *ngFor="let option of options" [value]="option.value">
        {{ option.label }}
      </option>
    </select>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  @Input() options: Option[] = [];
  value: any = 1;
  propogateChange: (value: any) => void = () => {};
  handleChange(event: any): void {
    this.propogateChange(event.target.value);
  }

  writeValue(value: any): void {
    if (value) this.value = value;
  }
  registerOnChange(fn: any): void {
    this.propogateChange = fn;
  }
  registerOnTouched(fn: any): void {}

  constructor() {}

  ngOnInit(): void {}
}

export type Option = {
  value: any;
  label: string;
};
