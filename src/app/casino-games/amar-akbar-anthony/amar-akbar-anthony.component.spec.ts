import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmarAkbarAnthonyComponent } from './amar-akbar-anthony.component';

describe('AmarAkbarAnthonyComponent', () => {
  let component: AmarAkbarAnthonyComponent;
  let fixture: ComponentFixture<AmarAkbarAnthonyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmarAkbarAnthonyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmarAkbarAnthonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
