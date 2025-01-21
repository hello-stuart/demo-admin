import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorecardsComponent } from './scorecards.component';

describe('ScorecardsComponent', () => {
  let component: ScorecardsComponent;
  let fixture: ComponentFixture<ScorecardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScorecardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScorecardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
