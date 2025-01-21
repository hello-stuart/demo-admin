import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragonTigerComponent } from './dragon-tiger.component';

describe('DragonTigerComponent', () => {
  let component: DragonTigerComponent;
  let fixture: ComponentFixture<DragonTigerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragonTigerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DragonTigerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
