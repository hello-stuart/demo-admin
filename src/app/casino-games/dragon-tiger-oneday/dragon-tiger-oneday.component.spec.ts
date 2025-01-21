import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragonTigerOnedayComponent } from './dragon-tiger-oneday.component';

describe('DragonTigerOnedayComponent', () => {
  let component: DragonTigerOnedayComponent;
  let fixture: ComponentFixture<DragonTigerOnedayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragonTigerOnedayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DragonTigerOnedayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
