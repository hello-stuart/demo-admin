import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AndarBaharAComponent } from './andar-bahar-a.component';

describe('AndarBaharAComponent', () => {
  let component: AndarBaharAComponent;
  let fixture: ComponentFixture<AndarBaharAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AndarBaharAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AndarBaharAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
