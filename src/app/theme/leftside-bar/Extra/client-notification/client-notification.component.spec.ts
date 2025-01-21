import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientNotificationComponent } from './client-notification.component';

describe('ClientNotificationComponent', () => {
  let component: ClientNotificationComponent;
  let fixture: ComponentFixture<ClientNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClientNotificationComponent]
    });
    fixture = TestBed.createComponent(ClientNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
