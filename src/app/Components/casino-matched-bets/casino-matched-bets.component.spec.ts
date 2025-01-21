import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasinoMatchedBetsComponent } from './casino-matched-bets.component';

describe('CasinoMatchedBetsComponent', () => {
  let component: CasinoMatchedBetsComponent;
  let fixture: ComponentFixture<CasinoMatchedBetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasinoMatchedBetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CasinoMatchedBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
