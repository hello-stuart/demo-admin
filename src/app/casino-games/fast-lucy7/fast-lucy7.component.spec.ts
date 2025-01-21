import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastLucy7Component } from './fast-lucy7.component';

describe('FastLucy7Component', () => {
  let component: FastLucy7Component;
  let fixture: ComponentFixture<FastLucy7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FastLucy7Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FastLucy7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
