import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsUpdateComponent } from './news-update.component';

describe('NewsUpdateComponent', () => {
  let component: NewsUpdateComponent;
  let fixture: ComponentFixture<NewsUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NewsUpdateComponent]
    });
    fixture = TestBed.createComponent(NewsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
