import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwentyCardRaceComponent } from './twenty-card-race.component';

describe('TwentyCardRaceComponent', () => {
  let component: TwentyCardRaceComponent;
  let fixture: ComponentFixture<TwentyCardRaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwentyCardRaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TwentyCardRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
