import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lucky7AComponent } from './lucky-7-a.component';

describe('Lucky7AComponent', () => {
  let component: Lucky7AComponent;
  let fixture: ComponentFixture<Lucky7AComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lucky7AComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Lucky7AComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
