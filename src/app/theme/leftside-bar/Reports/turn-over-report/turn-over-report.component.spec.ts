import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnOverReportComponent } from './turn-over-report.component';

describe('TurnOverReportComponent', () => {
  let component: TurnOverReportComponent;
  let fixture: ComponentFixture<TurnOverReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnOverReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TurnOverReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
