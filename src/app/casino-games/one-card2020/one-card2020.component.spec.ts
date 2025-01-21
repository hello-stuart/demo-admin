import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneCard2020Component } from './one-card2020.component';

describe('OneCard2020Component', () => {
  let component: OneCard2020Component;
  let fixture: ComponentFixture<OneCard2020Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneCard2020Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneCard2020Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
