import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderCategoryItemComponent } from './slider-category-item.component';

describe('SliderCategoryItemComponent', () => {
  let component: SliderCategoryItemComponent;
  let fixture: ComponentFixture<SliderCategoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderCategoryItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderCategoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
