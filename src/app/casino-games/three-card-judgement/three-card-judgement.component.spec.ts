import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeCardJudgementComponent } from './three-card-judgement.component';

describe('ThreeCardJudgementComponent', () => {
  let component: ThreeCardJudgementComponent;
  let fixture: ComponentFixture<ThreeCardJudgementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeCardJudgementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThreeCardJudgementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
