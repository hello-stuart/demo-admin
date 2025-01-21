import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lucky0To9Component } from './lucky0-to9.component';

describe('Lucky0To9Component', () => {
  let component: Lucky0To9Component;
  let fixture: ComponentFixture<Lucky0To9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lucky0To9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Lucky0To9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
