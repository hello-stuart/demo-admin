import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnedayTeenpattiComponent } from './oneday-teenpatti.component';

describe('OnedayTeenpattiComponent', () => {
  let component: OnedayTeenpattiComponent;
  let fixture: ComponentFixture<OnedayTeenpattiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnedayTeenpattiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnedayTeenpattiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
