import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KbcComponent } from './kbc.component';

describe('KbcComponent', () => {
  let component: KbcComponent;
  let fixture: ComponentFixture<KbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KbcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
