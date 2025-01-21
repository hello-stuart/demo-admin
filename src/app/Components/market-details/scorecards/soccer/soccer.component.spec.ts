import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoccerComponent } from './soccer.component';

describe('SoccerComponent', () => {
  let component: SoccerComponent;
  let fixture: ComponentFixture<SoccerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoccerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoccerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
