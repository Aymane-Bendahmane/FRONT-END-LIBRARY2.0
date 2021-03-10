import { Component, OnInit } from '@angular/core';
import {BookServiceService} from "../BookService/book-service.service";
import {Router} from "@angular/router";
import {Students} from "../Model/Students";
import {Semestre} from "../Model/Semestre";
import {Role} from "../Model/Role";

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.css']
})
export class NewStudentComponent implements OnInit {

semestres:   Semestre [] = [
  {name:'S1'},
  {name:'S2'},
  {name:'S3'},
  {name:'S4'},
  {name:'S5'},
  {name:'S6'},
  {name:'S7'},
  {name:'S8'},
  {name:'S9'},
  {name:'S10'},


];
  roles:   Role [] = [
    {name:'USER'},



  ];

  // @ts-ignore
  student:Students=new Students();


  constructor(private StudentService:BookServiceService, private router:Router) { }

  ngOnInit(): void {
  }


  saveStudent() {


      this.StudentService.saveStudent(this.student)
        .subscribe(data => {
          console.log(data)
          alert("effectué !");
          this.router.navigate(['students']);

        }, err => {
          console.log(err);
        })
    }

}
