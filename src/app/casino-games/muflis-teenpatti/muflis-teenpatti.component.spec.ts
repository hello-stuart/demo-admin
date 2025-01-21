import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuflisTeenpattiComponent } from './muflis-teenpatti.component';

describe('MuflisTeenpattiComponent', () => {
  let component: MuflisTeenpattiComponent;
  let fixture: ComponentFixture<MuflisTeenpattiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuflisTeenpattiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MuflisTeenpattiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
