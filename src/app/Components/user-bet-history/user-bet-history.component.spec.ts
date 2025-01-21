import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBetHistoryComponent } from './user-bet-history.component';

describe('UserBetHistoryComponent', () => {
  let component: UserBetHistoryComponent;
  let fixture: ComponentFixture<UserBetHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserBetHistoryComponent]
    });
    fixture = TestBed.createComponent(UserBetHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
