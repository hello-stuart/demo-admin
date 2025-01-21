import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftsideBarComponent } from './leftside-bar.component';

describe('LeftsideBarComponent', () => {
  let component: LeftsideBarComponent;
  let fixture: ComponentFixture<LeftsideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftsideBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeftsideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
