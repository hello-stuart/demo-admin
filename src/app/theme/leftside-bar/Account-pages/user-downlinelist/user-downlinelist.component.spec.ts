import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDownlinelistComponent } from './user-downlinelist.component';

describe('UserDownlinelistComponent', () => {
  let component: UserDownlinelistComponent;
  let fixture: ComponentFixture<UserDownlinelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDownlinelistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDownlinelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
