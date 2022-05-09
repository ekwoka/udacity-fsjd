import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'toast-controller',
  template: `
    <p>
      toast-controller works!
    </p>
  `
})
export class ToastControllerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
