import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinLossComponent } from './win-loss.component';

describe('WinLossComponent', () => {
  let component: WinLossComponent;
  let fixture: ComponentFixture<WinLossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinLossComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WinLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
