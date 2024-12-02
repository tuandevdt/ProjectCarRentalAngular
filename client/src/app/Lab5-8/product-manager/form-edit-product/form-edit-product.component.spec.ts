import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditProductComponent } from './form-edit-product.component';

describe('FormEditProductComponent', () => {
  let component: FormEditProductComponent;
  let fixture: ComponentFixture<FormEditProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEditProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
