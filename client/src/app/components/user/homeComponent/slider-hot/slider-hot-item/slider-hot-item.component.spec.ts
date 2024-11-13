import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderHotItemComponent } from './slider-hot-item.component';

describe('SliderHotItemComponent', () => {
  let component: SliderHotItemComponent;
  let fixture: ComponentFixture<SliderHotItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderHotItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderHotItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
