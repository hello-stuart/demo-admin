import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureAuthComponent } from './secure-auth.component';

describe('SecureAuthComponent', () => {
  let component: SecureAuthComponent;
  let fixture: ComponentFixture<SecureAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecureAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecureAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
