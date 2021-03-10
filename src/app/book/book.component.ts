import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {AppDataState, DataStateEnuM} from "../state/book.state";
import {BookServiceService} from "../BookService/book-service.service";
import {catchError, map, startWith} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  public pages: Array<number>;
  public currentKeyword: string="";

  public size: number=5;
  public currentPage: number=0;
  // @ts-ignore
  public totalPage: number;

  public book$:Observable<AppDataState<any>> |null=null;
  readonly DataStateEnuM=DataStateEnuM;
  constructor(private bs:BookServiceService,private route:Router) { }

  ngOnInit(): void {
    this.onSearch();
  }

  onDelete(b: any) {
    let v = confirm("Etes vous sure de vouloir supprimer ce produit ?")
    if(v==true)
      this.bs.deleteProduct(b)
        .subscribe(data=>{
          this.onSearch();
        })
  }

  onUpdate(b: any) {
    this.route.navigateByUrl("/Ebook/"+b.id);
  }

  onPageBook(i: number) {
    this.currentPage=i;
    this.onSearch();
  }

  onSearch() {
    this.book$= this.bs.getBookByKeyWord(this.currentKeyword,this.currentPage,this.size).pipe(
      map(data=>{
        // @ts-ignore
        this.totalPage=data.totalPages;
        this.pages=new Array<number>(this.totalPage);
        console.log(data);
        return ({dataState:DataStateEnuM.LOADED,data:data})}),
      startWith({dataState:DataStateEnuM.LOADING}),
      catchError(err=>of({dataState:DataStateEnuM.ERROR,errorMessage:err.message}))
    )
  }

  onSearchBook(value: any) {
    this.currentPage=0;
    this.currentKeyword=value.keyword;
    this.onSearch();
  }
}
