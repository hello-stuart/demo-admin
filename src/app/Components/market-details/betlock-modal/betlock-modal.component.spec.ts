import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetlockModalComponent } from './betlock-modal.component';

describe('BetlockModalComponent', () => {
  let component: BetlockModalComponent;
  let fixture: ComponentFixture<BetlockModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetlockModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BetlockModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
