import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerResultModalComponent } from './player-result-modal.component';

describe('PlayerResultModalComponent', () => {
  let component: PlayerResultModalComponent;
  let fixture: ComponentFixture<PlayerResultModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerResultModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
