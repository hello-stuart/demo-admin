import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralLockComponent } from './general-lock.component';

describe('GeneralLockComponent', () => {
  let component: GeneralLockComponent;
  let fixture: ComponentFixture<GeneralLockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralLockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralLockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
