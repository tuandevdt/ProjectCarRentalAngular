import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderHotComponent } from './slider-hot.component';

describe('SliderHotComponent', () => {
  let component: SliderHotComponent;
  let fixture: ComponentFixture<SliderHotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderHotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderHotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
