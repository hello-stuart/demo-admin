import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitLossEventsComponent } from './profit-loss-events.component';

describe('ProfitLossEventsComponent', () => {
  let component: ProfitLossEventsComponent;
  let fixture: ComponentFixture<ProfitLossEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfitLossEventsComponent]
    });
    fixture = TestBed.createComponent(ProfitLossEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
