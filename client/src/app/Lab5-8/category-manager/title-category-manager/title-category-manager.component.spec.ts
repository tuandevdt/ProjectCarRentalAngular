import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleCategoryManagerComponent } from './title-category-manager.component';

describe('TitleCategoryManagerComponent', () => {
  let component: TitleCategoryManagerComponent;
  let fixture: ComponentFixture<TitleCategoryManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleCategoryManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleCategoryManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
