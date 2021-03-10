import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UiComponent} from './ui/ui.component';
import {
  AuthGuardService as AuthGuard
} from './BookService/auth-guard.service';
import {LoginComponent} from './login/login.component';
import {NewStudentComponent} from './new-student/new-student.component';
import {StudentsComponent} from './students/students.component';
import {EditStudentComponent} from './edit-student/edit-student.component';
import {BookComponent} from './book/book.component';
import {NewBookComponent} from './new-book/new-book.component';
import {EditBookComponent} from './edit-book/edit-book.component';
import {ReservationComponent} from './reservation/reservation.component';

const routes: Routes = [{
  path: 'Home', component: UiComponent
},
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', component: UiComponent,
  },
  {
    path: 'students', component: StudentsComponent,canActivate: [AuthGuard]
  },
  {
    path: 'new-student', component: NewStudentComponent,canActivate: [AuthGuard]
  },
  {
    path: 'edit-S/:id', component: EditStudentComponent,canActivate: [AuthGuard]
  },
  {
    path: 'Gbooks', component: BookComponent, canActivate: [AuthGuard],
  },
  {
    path: 'Nbook', component: NewBookComponent, canActivate: [AuthGuard]
  },
  {
    path: 'Ebook/:id', component: EditBookComponent, canActivate: [AuthGuard]
  },
  {
    path:"reservation",component:ReservationComponent,canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
