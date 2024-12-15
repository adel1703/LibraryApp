import { Component, OnInit } from '@angular/core';
import { BookLoanService } from '../../Service/book-loan.service';
import { IbookLoan } from '../../Models/BookLoan';
import { Ibook } from '../../Models/BookModel';

@Component({
  selector: 'app-book-loan',
  templateUrl: './book-loan.component.html',
  styleUrls: ['./book-loan.component.css']
})
export class BookLoanComponent implements OnInit {

  bookLoans: IbookLoan[] = [];
  newBookLoan: IbookLoan = { id: 0, studentId: 0, bookId: 0, bookTitle: '', studentName: '', borrowedAt: '', returnedAt: null, hide: false };
  students: any[] = [{ id: 0, name: '', dataOfBirth: '' }];
  books: Ibook[] = [];
  filteredBooks: Ibook[] = [];
  errorMessage: string = '';
  isEditMode: boolean = false;

  constructor(private bookLoanService: BookLoanService) {}

  ngOnInit(): void {
    this.loadBookLoans();
    this.loadStudents();
    this.loadBooks();
  }

  calculateAge(dateOfBirth: string): number {
    const today = new Date();            // الحصول على التاريخ الحالي
    const birthDate = new Date(dateOfBirth);  // تحويل تاريخ الميلاد إلى اوبجيكت Date
  
    let age = today.getFullYear() - birthDate.getFullYear();  
    
    const m = today.getMonth() - birthDate.getMonth();  
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;  
    }
    
    return age;  
  }
  

  // داخل المكون BookLoanComponent
loadBookLoans(): void {
  this.bookLoanService.getBookLoans().subscribe(
    (data: IbookLoan[]) => {
      this.bookLoans = data.map(loan => ({
        ...loan,
        bookTitle: this.getBookTitle(loan.bookId),
        studentName: this.getStudentName(loan.studentId),
        borrowedAt: new Date(loan.borrowedAt).toLocaleDateString('en-CA'), // تنسيق التاريخ هنا
        returnedAt: loan.returnedAt ? new Date(loan.returnedAt).toLocaleDateString('en-CA') : null // تنسيق التاريخ عند الرجوع
      }));
      console.log('Book Loans:', this.bookLoans);
    },
    (error) => {
      this.errorMessage = 'Error loading book loans: ' + error;
      console.error(error);
    }
  );
}


   loadStudents(): void {
    this.bookLoanService.getStudents().subscribe(
      (data: any[]) => {
        this.students = data.map(student => ({
          ...student,
          age: this.calculateAge(student.dayOfBirth)  // تأكد من استخدام الحقل الصحيح (dayOfBirth)
        }));
      },
      (error) => {
        this.errorMessage = 'Error loading students: ' + error;
        console.error(error);
      }
    );
  }
  
  
  loadBooks(): void {
    this.bookLoanService.getBooks().subscribe(
      (data: Ibook[]) => {
        this.books = data;
        console.log('Books:', this.books);
      },
      (error) => {
        this.errorMessage = 'Error loading books: ' + error;
        console.error(error);
      }
    );
  }

  getBookTitle(bookId: number): string {
    const book = this.books.find(b => b.id === bookId);
    return book ? book.title : '';
  }

  getStudentName(studentId: number): string {
    const student = this.students.find(s => s.id === studentId);
    return student ? student.name : '';
  }

  onStudentChange(event: any): void {
    const studentId = +event.target.value;
    const student = this.students.find(s => s.id === studentId);

    if (student) {
        this.newBookLoan.studentName = student.name;

        if (student.dataOfBirth) {
            const age = this.calculateAge(student.dataOfBirth);
            this.filteredBooks = this.books.filter(book => age >= book.minAge && age <= book.maxAge);

            if (this.filteredBooks.length === 0) {
                this.errorMessage = 'No books available for the selected student.';
            } else {
                this.errorMessage = '';
            }
        }
    }
}

  
  onBookChange(event: any): void {
    const bookId = +event.target.value;
    const book = this.books.find(b => b.id === bookId);
  
    if (book) {
      this.newBookLoan.bookTitle = book.title;
    } else {
      this.newBookLoan.bookTitle = '';
    }
  }
  
  addOrUpdateBookLoan(): void {
    console.log('New Book Loan:', this.newBookLoan);

    
    if (!this.students || !this.books) {
      this.errorMessage = 'Student or book not found';
      console.error('Student or book not found:', {
        studentId: this.newBookLoan.studentId,
        bookId: this.newBookLoan.bookId,
        students: this.students,
        books: this.books
      });
      return;
    }
  
    if (this.isEditMode) {
      this.updateBookLoan();
    } else {
      this.addBookLoan();
    }
  }

  
  
  addBookLoan(): void {
    if (!this.newBookLoan.borrowedAt || !this.newBookLoan.studentId || !this.newBookLoan.bookId) {
        this.errorMessage = 'All fields are required.';
        return;
    }
    
    const bookLoanToSend = {
        ...this.newBookLoan,
        borrowedAt: this.formatDate(this.newBookLoan.borrowedAt),
        returnedAt: this.newBookLoan.returnedAt ? this.formatDate(this.newBookLoan.returnedAt) : null,
    };
    

    this.bookLoanService.addBookLoan(bookLoanToSend).subscribe(
        (response) => {
            this.bookLoans.push(response);
            this.resetForm();
        },
        (error) => {
            console.error('Error adding book loan:', error);
            this.errorMessage = 'Failed to add book loan.';
        }
    );
}

  
  
  updateBookLoan(): void {
    const bookLoanToSend = {
        ...this.newBookLoan,
        borrowedAt: this.formatDate(this.newBookLoan.borrowedAt),
        returnedAt: this.newBookLoan.returnedAt ? this.formatDate(this.newBookLoan.returnedAt) : null,
    };
    
  
    this.bookLoanService.updateBookLoan(bookLoanToSend).subscribe(
      () => {
        this.loadBookLoans();
        this.resetForm();
      },
      (error) => {
        console.error('Error updating book loan:', error);
      }
    );
  }
  
  
  // دالة تنسيق التاريخ
  private formatDate(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

  
  editBookLoan(loan: IbookLoan): void {
    this.newBookLoan = { ...loan };

    this.newBookLoan.bookTitle = this.getBookTitle(loan.bookId);
    this.newBookLoan.studentName = this.getStudentName(loan.studentId);
  
    this.isEditMode = true;
  
    this.onStudentChange({ target: { value: loan.studentId } });
  }

  deleteBookLoan(id: number): void {
    this.bookLoanService.deleteBookLoan(id).subscribe(() => {
      this.loadBookLoans();
    });
  }

  resetForm(): void {
    this.newBookLoan = { id: 0, studentId: 0, bookId: 0, bookTitle: '', studentName: '', borrowedAt: '', returnedAt: null, hide: false };
    this.errorMessage = '';
    this.isEditMode = false;
    this.filteredBooks = [];
  }

  returnBook(loan: IbookLoan): void {
    const confirmed = confirm(`Are you sure you want to mark this book as returned?`);
    if (confirmed) {
      loan.returnedAt = '';
      loan.hide = true;
    
      this.bookLoanService.updateBookLoan(loan).subscribe(
        () => {
          this.bookLoans = this.bookLoans.filter(l => l.id !== loan.id);
          this.loadBookLoans();
        },
        (error) => {
          console.error('Error marking book as returned:', error);
        }
      );
    }
  }

}