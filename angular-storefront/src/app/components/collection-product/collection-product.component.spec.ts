import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionProductComponent } from './collection-product.component';

describe('ProductComponent', () => {
  let component: CollectionProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionProductComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
