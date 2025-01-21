import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDownlinelistComponent } from './master-downlinelist.component';

describe('MasterDownlinelistComponent', () => {
  let component: MasterDownlinelistComponent;
  let fixture: ComponentFixture<MasterDownlinelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterDownlinelistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MasterDownlinelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
