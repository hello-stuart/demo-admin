import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewDownlineUserComponent } from './addnew-downline-user.component';

describe('AddnewDownlineUserComponent', () => {
  let component: AddnewDownlineUserComponent;
  let fixture: ComponentFixture<AddnewDownlineUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddnewDownlineUserComponent]
    });
    fixture = TestBed.createComponent(AddnewDownlineUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
