import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './Component/book/book.component';
import { StudentComponent } from './Component/student/student.component';
import { BookLoanComponent } from './Component/book-loan/book-loan.component';


const routes: Routes = [
  { path: 'Book', component: BookComponent },
  { path: 'Student', component: StudentComponent },
  { path: 'BookLoan', component: BookLoanComponent },
  { path: '', redirectTo: 'Book', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
