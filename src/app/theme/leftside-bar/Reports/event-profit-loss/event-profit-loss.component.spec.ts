import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventProfitLossComponent } from './event-profit-loss.component';

describe('EventProfitLossComponent', () => {
  let component: EventProfitLossComponent;
  let fixture: ComponentFixture<EventProfitLossComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EventProfitLossComponent]
    });
    fixture = TestBed.createComponent(EventProfitLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
