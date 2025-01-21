import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreUserComponent } from './restore-user.component';

describe('RestoreUserComponent', () => {
  let component: RestoreUserComponent;
  let fixture: ComponentFixture<RestoreUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RestoreUserComponent]
    });
    fixture = TestBed.createComponent(RestoreUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
