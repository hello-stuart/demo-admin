import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurCasinoResultComponent } from './our-casino-result.component';

describe('OurCasinoResultComponent', () => {
  let component: OurCasinoResultComponent;
  let fixture: ComponentFixture<OurCasinoResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurCasinoResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OurCasinoResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
