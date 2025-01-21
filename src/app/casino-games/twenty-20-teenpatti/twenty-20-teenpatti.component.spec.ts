import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Twenty20TeenpattiComponent } from './twenty-20-teenpatti.component';

describe('Twenty20TeenpattiComponent', () => {
  let component: Twenty20TeenpattiComponent;
  let fixture: ComponentFixture<Twenty20TeenpattiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Twenty20TeenpattiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Twenty20TeenpattiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
