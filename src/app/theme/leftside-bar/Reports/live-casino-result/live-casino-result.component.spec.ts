import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveCasinoResultComponent } from './live-casino-result.component';

describe('LiveCasinoResultComponent', () => {
  let component: LiveCasinoResultComponent;
  let fixture: ComponentFixture<LiveCasinoResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveCasinoResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiveCasinoResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
