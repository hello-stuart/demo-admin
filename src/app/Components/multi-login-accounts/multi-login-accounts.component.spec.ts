import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLoginAccountsComponent } from './multi-login-accounts.component';

describe('MultiLoginAccountsComponent', () => {
  let component: MultiLoginAccountsComponent;
  let fixture: ComponentFixture<MultiLoginAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiLoginAccountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiLoginAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
