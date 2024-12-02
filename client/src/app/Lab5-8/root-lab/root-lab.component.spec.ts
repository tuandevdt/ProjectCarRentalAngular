import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootLabComponent } from './root-lab.component';

describe('RootLabComponent', () => {
  let component: RootLabComponent;
  let fixture: ComponentFixture<RootLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootLabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RootLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
