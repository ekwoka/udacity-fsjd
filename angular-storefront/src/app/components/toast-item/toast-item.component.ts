import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'toast-item',
  template: `
    <p>
      toast-item works!
    </p>
  `
})
export class ToastItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
