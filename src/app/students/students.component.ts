import { Component, OnInit } from '@angular/core';
import {BookServiceService} from "../BookService/book-service.service";
import {ActivatedRoute, Router} from "@angular/router";

import {Students} from "../Model/Students";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  private currentKeyword: string="";
  private stud: Object;

  constructor(private Ss:BookServiceService,private router:Router) { }
  public students:any=undefined;
  public size: number=5;
  public currentPage: number=0;
  public totalPage: number;
  public pages: Array<number>;
  ngOnInit() {
    //this.getProduct();
    //this.onGetProducts()
    this.ChercherStudents();
  }

  onGetStudents() {
    this.Ss.getStudents(this.currentPage,this.size)
      .subscribe(data=>{
        // @ts-ignore
        this.totalPage=data.totalPages;
        this.pages=new Array<number>(this.totalPage);
        this.students=data;

        console.log(data)
      },err=>{
        console.log(err);
      });
  }


  onPageStudent(i: number) {
    this.currentPage=i;
    this.ChercherStudents();
  }

  onChercher(form : any){
    this.currentPage=0;
    this.currentKeyword=form.keyword;
    this.ChercherStudents();
  }

  ChercherStudents() {
    this.Ss.getStudentByKeyword(this.currentKeyword,this.currentPage,this.size)
      .subscribe(data=>{
        // @ts-ignore
        this.totalPage=data.totalPages;
        this.pages=new Array<number>(this.totalPage);
        this.students=data;
      },err=>{
        console.log(err);
      });
  }



  onDeleteStudents(s:Students){
      let conf=window.confirm("Etes vous sur de vouloir supprimer ?");
      if(conf==true){
        this.Ss.deleteResource(s.id)
          .subscribe(data=>{
            this.students.content.splice(this.students.content.indexOf(s),1);
            //this.ChercherProduits();
            this.ChercherStudents()
          },err=>{
            console.log(err);
          })
      }

  }

  onEditStudent(id:any) {

    this.router.navigate(['edit-S',id]);
  }
}
