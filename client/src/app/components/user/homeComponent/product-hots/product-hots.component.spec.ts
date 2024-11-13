import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHotsComponent } from './product-hots.component';

describe('ProductHotsComponent', () => {
  let component: ProductHotsComponent;
  let fixture: ComponentFixture<ProductHotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductHotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductHotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
