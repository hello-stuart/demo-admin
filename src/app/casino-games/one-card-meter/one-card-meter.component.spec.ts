import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneCardMeterComponent } from './one-card-meter.component';

describe('OneCardMeterComponent', () => {
  let component: OneCardMeterComponent;
  let fixture: ComponentFixture<OneCardMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneCardMeterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneCardMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
