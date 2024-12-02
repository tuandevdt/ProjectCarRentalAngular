import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewProductComponent } from './form-new-product.component';

describe('FormNewProductComponent', () => {
  let component: FormNewProductComponent;
  let fixture: ComponentFixture<FormNewProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormNewProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
