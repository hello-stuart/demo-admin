import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card32AComponent } from './card-32-a.component';

describe('Card32AComponent', () => {
  let component: Card32AComponent;
  let fixture: ComponentFixture<Card32AComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card32AComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Card32AComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
