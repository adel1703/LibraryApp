import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IbookLoan } from '../Models/BookLoan';
import { Istudent } from '../Models/StudentModel';
import { Ibook } from '../Models/BookModel';

@Injectable({
  providedIn: 'root'
})
export class BookLoanService {
  
  private apiUrl = 'https://localhost:7249/api/BookLoans';
  private apiUrl2 = 'https://localhost:7249/api';

  constructor(private http: HttpClient) {}


  getBookLoans(): Observable<IbookLoan[]> {
    return this.http.get<IbookLoan[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getBookLoan(id: number): Observable<IbookLoan> {
    return this.http.get<IbookLoan>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  addBookLoan(bookLoan: IbookLoan): Observable<IbookLoan> {
    // تحويل التواريخ إلى ISO string قبل إرسالها
    bookLoan.borrowedAt = new Date(bookLoan.borrowedAt).toISOString();
    if (bookLoan.returnedAt) {
      bookLoan.returnedAt = new Date(bookLoan.returnedAt).toISOString();
    }
  
    return this.http.post<IbookLoan>(this.apiUrl, bookLoan).pipe(catchError(this.handleError));
  }
  
  updateBookLoan(bookLoan: IbookLoan): Observable<IbookLoan> {
    // تحويل التواريخ إلى ISO string قبل إرسالها
    bookLoan.borrowedAt = new Date(bookLoan.borrowedAt).toISOString();
    if (bookLoan.returnedAt) {
      bookLoan.returnedAt = new Date(bookLoan.returnedAt).toISOString();
    }
  
    return this.http.put<IbookLoan>(`${this.apiUrl}/${bookLoan.id}`, bookLoan).pipe(catchError(this.handleError));
  }
  

  returnBookLoan(loanId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/return/${loanId}`, null).pipe(catchError(this.handleError));
  }

  
  deleteBookLoan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  getStudentLoans(studentId: number): Observable<IbookLoan[]> {
    return this.http.get<IbookLoan[]>(`${this.apiUrl}/Students/${studentId}`).pipe(catchError(this.handleError));
  }

  getStudents(): Observable<Istudent[]> {
    return this.http.get<Istudent[]>(`${this.apiUrl2}/Students`).pipe(catchError(this.handleError));
  }

  getBooks(): Observable<Ibook[]> {
    return this.http.get<Ibook[]>(`${this.apiUrl2}/Books`).pipe(catchError(this.handleError));
  }
  

  getBookLoanDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/details`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Server error:', error);
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(`Server-side error: ${error.status} - ${error.message}`);
      console.error('Response body:', error.error);  // عرض المزيد من التفاصيل هنا
    }
    return throwError('There was a problem with the server. Please try again later.');
  }
  
}
