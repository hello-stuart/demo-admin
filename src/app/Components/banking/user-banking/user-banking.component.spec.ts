import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBankingComponent } from './user-banking.component';

describe('UserBankingComponent', () => {
  let component: UserBankingComponent;
  let fixture: ComponentFixture<UserBankingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserBankingComponent]
    });
    fixture = TestBed.createComponent(UserBankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
