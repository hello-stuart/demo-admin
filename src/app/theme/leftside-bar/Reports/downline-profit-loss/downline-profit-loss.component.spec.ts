import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownlineProfitLossComponent } from './downline-profit-loss.component';

describe('DownlineProfitLossComponent', () => {
  let component: DownlineProfitLossComponent;
  let fixture: ComponentFixture<DownlineProfitLossComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DownlineProfitLossComponent]
    });
    fixture = TestBed.createComponent(DownlineProfitLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
