import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UiComponent} from './ui/ui.component';
import {
  AuthGuardService as AuthGuard
} from './BookService/auth-guard.service';
import {LoginComponent} from './login/login.component';
const routes: Routes = [{
  path:'Home',component: UiComponent,canActivate: [AuthGuard]
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'',component: UiComponent,canActivate: [AuthGuard]
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
