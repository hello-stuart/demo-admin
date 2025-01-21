import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExposureDetailComponent } from './exposure-detail.component';

describe('ExposureDetailComponent', () => {
  let component: ExposureDetailComponent;
  let fixture: ComponentFixture<ExposureDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExposureDetailComponent]
    });
    fixture = TestBed.createComponent(ExposureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
