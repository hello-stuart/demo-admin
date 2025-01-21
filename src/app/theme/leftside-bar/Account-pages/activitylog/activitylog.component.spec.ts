import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitylogComponent } from './activitylog.component';

describe('ActivitylogComponent', () => {
  let component: ActivitylogComponent;
  let fixture: ComponentFixture<ActivitylogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ActivitylogComponent]
    });
    fixture = TestBed.createComponent(ActivitylogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
