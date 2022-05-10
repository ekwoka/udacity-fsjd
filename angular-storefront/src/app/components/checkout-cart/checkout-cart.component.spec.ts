import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutCartComponent } from './checkout-cart.component';

describe('CheckoutCartComponent', () => {
  let component: CheckoutCartComponent;
  let fixture: ComponentFixture<CheckoutCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
