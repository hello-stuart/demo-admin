import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstandWorliComponent } from './instand-worli.component';

describe('InstandWorliComponent', () => {
  let component: InstandWorliComponent;
  let fixture: ComponentFixture<InstandWorliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstandWorliComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstandWorliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
