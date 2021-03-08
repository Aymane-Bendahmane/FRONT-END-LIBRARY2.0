import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BookServiceService} from '../BookService/book-service.service';
import {HttpHeaders} from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  profileFrom = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })
  constructor(private  service:BookServiceService,private router:Router) { }

  ngOnInit(): void {
    this.service.getHeaders()
  }



  onSubmit() {
      console.log(this.profileFrom.value)
   this.service.authenticate(this.profileFrom.value,()=>{
          this.router.navigateByUrl('/');
   });
    return false;


  }
}
