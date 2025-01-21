import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreCardSvgsComponent } from './score-card-svgs.component';

describe('ScoreCardSvgsComponent', () => {
  let component: ScoreCardSvgsComponent;
  let fixture: ComponentFixture<ScoreCardSvgsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreCardSvgsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScoreCardSvgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
