import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeLayoutComponent } from './theme-layout.component';

describe('ThemeLayoutComponent', () => {
  let component: ThemeLayoutComponent;
  let fixture: ComponentFixture<ThemeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThemeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
