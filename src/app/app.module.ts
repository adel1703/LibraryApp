import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './Component/book/book.component';
import { StudentComponent } from './Component/student/student.component';
import { BookLoanComponent } from './Component/book-loan/book-loan.component';

import { BookService } from './Service/book.service';
import { BookLoanService } from './Service/book-loan.service';
import { StudentService } from './Service/student.service';


@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    StudentComponent,
    BookLoanComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    BookService,
    BookLoanService,
    StudentService,

    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
