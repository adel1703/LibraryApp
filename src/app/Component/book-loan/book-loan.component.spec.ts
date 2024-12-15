import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookLoanComponent } from './book-loan.component';

describe('BookLoanComponent', () => {
  let component: BookLoanComponent;
  let fixture: ComponentFixture<BookLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookLoanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
