import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiComponent } from './ui/ui.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import { ReservationComponent } from './reservation/reservation.component';
import {EditBookComponent} from './edit-book/edit-book.component';
import {BookComponent} from './book/book.component';
import {NewBookComponent} from './new-book/new-book.component';
import {NewStudentComponent} from './new-student/new-student.component';
import {StudentsComponent} from './students/students.component';
import {EditStudentComponent} from './edit-student/edit-student.component';

@NgModule({
  declarations: [
    AppComponent,
    UiComponent,
    LoginComponent,
    ReservationComponent,
    EditBookComponent,
    BookComponent,
    NewBookComponent,
    EditBookComponent,
    NewStudentComponent,
    StudentsComponent,
    EditStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
