import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentBetsComponent } from './current-bets.component';

describe('CurrentBetsComponent', () => {
  let component: CurrentBetsComponent;
  let fixture: ComponentFixture<CurrentBetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentBetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
