import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarExperienceComponent } from './car-experience.component';

describe('CarExperienceComponent', () => {
  let component: CarExperienceComponent;
  let fixture: ComponentFixture<CarExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarExperienceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
