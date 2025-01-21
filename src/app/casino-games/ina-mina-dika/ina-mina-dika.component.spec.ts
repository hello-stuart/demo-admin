import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InaMinaDikaComponent } from './ina-mina-dika.component';

describe('InaMinaDikaComponent', () => {
  let component: InaMinaDikaComponent;
  let fixture: ComponentFixture<InaMinaDikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InaMinaDikaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InaMinaDikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
