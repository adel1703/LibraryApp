import { Component, OnInit } from '@angular/core';
import { BookService } from '../../Service/book.service';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit   {
  Books: any[] = [];
  selectedBook: any = null;
  newBook: any = { id: 0, title: '', minAge: 7, maxAge: 12 };
  editing: boolean = false;
  errorMessage: string = '';


  constructor(private BookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.BookService.getBooks().subscribe(data => {
      this.Books = data;
    });
  }


  selectBooks(Book: any): void {
    this.selectedBook = { ...Book };
    this.editing = true;
  }

  addBooks(): void {
    if (this.newBook.minAge < 7 || this.newBook.maxAge < 7) {
      this.errorMessage = 'لا يجب أن يكون العمر أقل من 7 سنوات.';
      return;
    }
    if (this.newBook.minAge >= this.newBook.maxAge) {
      this.errorMessage = 'لا يجب أن يكون أقل عمر أكبر أو يساوي أكبر عمر.';
      return;
    }

    this.BookService.addBook(this.newBook).subscribe(() => {
      this.loadBooks();
      this.newBook = { id: 0, title: '', minAge: null, maxAge: null };
      this.errorMessage = ''; 
    });
  }

  updateBooks(): void {
    if (this.selectedBook) {
        if (this.selectedBook.minAge < 7 || this.selectedBook.maxAge < 7) {
            this.errorMessage = 'لا يجب أن يكون العمر أقل من 7 سنوات.';
            return;
        }
        if (this.selectedBook.minAge >= this.selectedBook.maxAge) {
            this.errorMessage = 'لا يجب أن يكون أقل عمر أكبر أو يساوي أكبر عمر.';
            return;
        }

        this.BookService.updateBook(this.selectedBook.id, this.selectedBook).subscribe(() => {
            this.loadBooks();
            this.selectedBook = null;
            this.editing = false;
            this.errorMessage = ''; // Clear the error message
        });
    }
  }

  deleteBooks(id: number): void {
    this.BookService.deleteBook(id).subscribe(() => {
      this.loadBooks();
    });
  }

}
