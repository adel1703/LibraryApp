import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'https://localhost:7249/api/Students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getStudent(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  addStudent(studentDto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, studentDto).pipe(catchError(this.handleError));
  }

  updateStudent(id: number, student: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, student).pipe(catchError(this.handleError));
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
