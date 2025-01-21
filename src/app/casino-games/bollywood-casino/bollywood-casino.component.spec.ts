import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BollywoodCasinoComponent } from './bollywood-casino.component';

describe('BollywoodCasinoComponent', () => {
  let component: BollywoodCasinoComponent;
  let fixture: ComponentFixture<BollywoodCasinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BollywoodCasinoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BollywoodCasinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
