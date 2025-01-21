import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Baccarat29Component } from './baccarat-29.component';

describe('Baccarat29Component', () => {
  let component: Baccarat29Component;
  let fixture: ComponentFixture<Baccarat29Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Baccarat29Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Baccarat29Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
