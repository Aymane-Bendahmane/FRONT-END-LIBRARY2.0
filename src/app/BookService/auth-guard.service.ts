import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {BookServiceService} from './book-service.service';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public auth:BookServiceService,private  router:Router) { }

  canActivate(): boolean {
    if (!this.auth.isAdmin()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
