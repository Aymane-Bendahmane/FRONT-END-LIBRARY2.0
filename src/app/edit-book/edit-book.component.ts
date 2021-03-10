import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookServiceService} from "../BookService/book-service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  public url: string;
  // @ts-ignore
  bookFormGroup:FormGroup;

  public timestamp: any;
  // @ts-ignore
  public editPhoto: boolean;
  // @ts-ignore
  public selectedFiles;
  // @ts-ignore
  public progress: number;
  public currentFileUpload: any;
  public currentTime: number=0;


  public book:any;
  constructor(private activatedRoute:ActivatedRoute,public bs:BookServiceService,public fb:FormBuilder,private route:Router) { }

  ngOnInit(): void {
    this.url = this.activatedRoute.snapshot.params.id

    this.bs.getBookUrl(this.url).subscribe(book=>{
      this.book=book;
      console.log('test' +book.id +book.name)

      this.bookFormGroup= this.fb.group({

        id:[book.id,Validators.required],
        author:[book.author,Validators.required],
        name:[book.name,Validators.required],
        date_entree:[book.date_entree,Validators.required],
        description:[book.description,Validators.required],
        disponiblity:[book.disponiblity,Validators.required]


      })
    })
  }

  onSaveBook() {
    this.bs.updateProduct(this.bookFormGroup?.value)
      .subscribe(data=>{
        alert("Mise a jour faite avec succés")
      })
  }

  uploadPhoto() {
    this.progress = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.bs.uploadPhotoBook(this.currentFileUpload, this.book.id).subscribe(event =>{
    /*  if (event.type === HttpEventType.UploadProgress){
        // @ts-ignore
        this.progress = Math.round(100 * event.loaded / event.total);
        console.log(this.progress);
      }else if (event instanceof HttpResponse){
        alert("Fin de téléchargement.....")
        //this.getProducts('/products/search/selectedProducts');
        this.currentTime=Date.now();
        this.route.navigateByUrl("/Gbooks")
          .then(() => {
            window.location.reload();})
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
    this.book=b;
    this.editPhoto=true;
  }

  getTS() {
    return this.timestamp;
  }
}
