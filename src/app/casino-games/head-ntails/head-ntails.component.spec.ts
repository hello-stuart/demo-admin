import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadNtailsComponent } from './head-ntails.component';

describe('HeadNtailsComponent', () => {
  let component: HeadNtailsComponent;
  let fixture: ComponentFixture<HeadNtailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadNtailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadNtailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
