import { Component } from '@angular/core';
import {BookServiceService} from './BookService/book-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'template-Ang';
  constructor(public service:BookServiceService,public rt:Router) {
  }

  logout() {
    localStorage.removeItem('credentials')
    this.rt.navigateByUrl('/login')
    window.location.reload()

  }
}
