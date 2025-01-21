import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasinoResultModalComponent } from './casino-result-modal.component';

describe('CasinoResultModalComponent', () => {
  let component: CasinoResultModalComponent;
  let fixture: ComponentFixture<CasinoResultModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasinoResultModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CasinoResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
