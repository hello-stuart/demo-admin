import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitandLossComponent } from './profitand-loss.component';

describe('ProfitandLossComponent', () => {
  let component: ProfitandLossComponent;
  let fixture: ComponentFixture<ProfitandLossComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfitandLossComponent]
    });
    fixture = TestBed.createComponent(ProfitandLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
