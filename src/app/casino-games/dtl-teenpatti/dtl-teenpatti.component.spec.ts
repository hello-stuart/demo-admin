import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtlTeenpattiComponent } from './dtl-teenpatti.component';

describe('DtlTeenpattiComponent', () => {
  let component: DtlTeenpattiComponent;
  let fixture: ComponentFixture<DtlTeenpattiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtlTeenpattiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DtlTeenpattiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
