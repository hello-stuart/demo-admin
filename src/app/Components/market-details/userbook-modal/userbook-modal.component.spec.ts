import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbookModalComponent } from './userbook-modal.component';

describe('UserbookModalComponent', () => {
  let component: UserbookModalComponent;
  let fixture: ComponentFixture<UserbookModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserbookModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserbookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
