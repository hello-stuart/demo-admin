import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitLossMarketsComponent } from './profit-loss-markets.component';

describe('ProfitLossMarketsComponent', () => {
  let component: ProfitLossMarketsComponent;
  let fixture: ComponentFixture<ProfitLossMarketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfitLossMarketsComponent]
    });
    fixture = TestBed.createComponent(ProfitLossMarketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
