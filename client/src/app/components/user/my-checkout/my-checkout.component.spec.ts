import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCheckoutComponent } from './my-checkout.component';

describe('MyCheckoutComponent', () => {
  let component: MyCheckoutComponent;
  let fixture: ComponentFixture<MyCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCheckoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
