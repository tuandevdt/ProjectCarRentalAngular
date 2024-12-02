import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoryManagerComponent } from './list-category-manager.component';

describe('ListCategoryManagerComponent', () => {
  let component: ListCategoryManagerComponent;
  let fixture: ComponentFixture<ListCategoryManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCategoryManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCategoryManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
