import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragonTiger2020Component } from './dragon-tiger-2020.component';

describe('DragonTiger2020Component', () => {
  let component: DragonTiger2020Component;
  let fixture: ComponentFixture<DragonTiger2020Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragonTiger2020Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DragonTiger2020Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
