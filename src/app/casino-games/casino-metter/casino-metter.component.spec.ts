import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasinoMetterComponent } from './casino-metter.component';

describe('CasinoMetterComponent', () => {
  let component: CasinoMetterComponent;
  let fixture: ComponentFixture<CasinoMetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasinoMetterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CasinoMetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
