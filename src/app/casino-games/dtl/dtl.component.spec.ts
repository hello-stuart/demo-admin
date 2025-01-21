import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtlComponent } from './dtl.component';

describe('DtlComponent', () => {
  let component: DtlComponent;
  let fixture: ComponentFixture<DtlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
