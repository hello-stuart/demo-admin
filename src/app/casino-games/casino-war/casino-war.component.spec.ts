import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasinoWarComponent } from './casino-war.component';

describe('CasinoWarComponent', () => {
  let component: CasinoWarComponent;
  let fixture: ComponentFixture<CasinoWarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasinoWarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CasinoWarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
