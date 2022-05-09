import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastControllerComponent } from './toast-controller.component';

describe('ToastControllerComponent', () => {
  let component: ToastControllerComponent;
  let fixture: ComponentFixture<ToastControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
