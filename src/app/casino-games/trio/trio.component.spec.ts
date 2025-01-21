import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrioComponent } from './trio.component';

describe('TrioComponent', () => {
  let component: TrioComponent;
  let fixture: ComponentFixture<TrioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
