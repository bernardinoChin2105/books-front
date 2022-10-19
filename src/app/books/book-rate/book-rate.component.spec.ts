import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRateComponent } from './book-rate.component';

describe('BookRateComponent', () => {
  let component: BookRateComponent;
  let fixture: ComponentFixture<BookRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
