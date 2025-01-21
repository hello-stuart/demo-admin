import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedDatepickerComponent } from './customized-datepicker.component';

describe('CustomizedDatepickerComponent', () => {
  let component: CustomizedDatepickerComponent;
  let fixture: ComponentFixture<CustomizedDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomizedDatepickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomizedDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
