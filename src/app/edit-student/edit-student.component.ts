import {Component, OnInit} from '@angular/core';
import {Students} from '../Model/Students';
import {ActivatedRoute, Router} from '@angular/router';
import {BookServiceService} from '../BookService/book-service.service';
import {Semestre} from '../Model/Semestre';
import {Role} from '../Model/Role';
import {dashCaseToCamelCase} from '@angular/compiler/src/util';
import {compareSegments} from '@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  semestres: Semestre [] = [
    {name: 'S1'},
    {name: 'S2'},
    {name: 'S3'},
    {name: 'S4'},
    {name: 'S5'},
    {name: 'S6'},
    {name: 'S7'},
    {name: 'S8'},
    {name: 'S9'},
    {name: 'S10'},


  ];
  roles: Role [] = [
    {name: 'USER'},


  ];
  student: Students;
  mode: number = 1;
  private url: string;
  // @ts-ignore
  st: Object = new Students();
  idStudent: number;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private Ss: BookServiceService) {
    this.idStudent = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.Ss.getStudentByid(this.idStudent)
      .subscribe(data => {
        // @ts-ignore
        this.student = data;
      }, error => {
        console.log(error);
      });
  }

  updateStudents() {
    this.Ss.onUpdateStudents(this.student)
      .subscribe(data => {
        console.log(data);
        alert('effectué !');
        this.router.navigate(['students']);
      }, error => {
        console.log(error);
        alert('Probleme !');
      });

  }
}
