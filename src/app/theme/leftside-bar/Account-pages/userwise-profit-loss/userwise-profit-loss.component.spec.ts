import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserwiseProfitLossComponent } from './userwise-profit-loss.component';

describe('UserwiseProfitLossComponent', () => {
  let component: UserwiseProfitLossComponent;
  let fixture: ComponentFixture<UserwiseProfitLossComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserwiseProfitLossComponent]
    });
    fixture = TestBed.createComponent(UserwiseProfitLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
