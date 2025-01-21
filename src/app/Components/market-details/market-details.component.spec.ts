import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketDetailsComponent } from './market-details.component';

describe('MarketDetailsComponent', () => {
  let component: MarketDetailsComponent;
  let fixture: ComponentFixture<MarketDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
