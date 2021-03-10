import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {AppDataState, DataStateEnuM} from "../state/book.state";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookServiceService} from "../BookService/book-service.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  bookFormGroup?:FormGroup
  submitted: boolean=false;
  public modeImg: number=1;

  public currentbook: any;
  public timestamp: any;
  // @ts-ignore
  public editPhoto: boolean;
  // @ts-ignore
  public selectedFiles;
  // @ts-ignore
  public progress: number;
  public currentFileUpload: any;
  public currentTime: number=0;

  constructor(public bs:BookServiceService,private fb:FormBuilder,public route:Router) { }

  ngOnInit(): void {
    this.bookFormGroup=this.fb.group({
      author:["",Validators.required],
      name:["",Validators.required],
      date_entree:["",Validators.required],
      description:["",Validators.required],
      disponiblity:[true,Validators.required]
    })
  }

  onSaveBook() {
    this.submitted=true;
    if(this.bookFormGroup?.invalid) return;
    this.bs.save(this.bookFormGroup?.value).subscribe(data=>{
      this.currentbook=data;
      this.modeImg=2;
      alert("Le livre a été enrégistré avec succés")
    })
  }
  uploadPhoto() {
    this.progress = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.bs.uploadPhotoBook(this.currentFileUpload, this.currentbook.id).subscribe(event =>{
     /* if (event.type === HttpEventType.UploadProgress){
        // @ts-ignore
        this.progress = Math.round(100 * event.loaded / event.total);
        console.log(this.progress);
      }else if (event instanceof HttpResponse){
        alert("Fin de téléchargement.....")
        //this.getProducts('/products/search/selectedProducts');
        this.currentTime=Date.now();
        this.route.navigateByUrl("/Home");
      }*/
    },err=>{
      alert("Problème de chargement ");
    })
    this.selectedFiles = undefined
  }

  // @ts-ignore
  onSelectedFile(event) {
    this.selectedFiles=event.target.files;
  }

  onEditPhoto(b: any) {
    this.currentbook=b;
    this.editPhoto=true;
  }

  getTS() {
    return this.timestamp;
  }
}
