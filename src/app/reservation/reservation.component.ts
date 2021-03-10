import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {AppDataState, DataStateEnuM} from "../state/book.state";
import {catchError, map, startWith} from "rxjs/operators";
import {BookServiceService} from '../BookService/book-service.service';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  public pages: Array<number>;
  public currentKeyword: string="";

  public size: number=5;
  public currentPage: number=0;
  // @ts-ignore
  public totalPage: number;

  public reservation$:Observable<AppDataState<any>> |null=null;
  readonly DataStateEnuM=DataStateEnuM;
  constructor(public rs:BookServiceService) { }

  ngOnInit(): void {
    this.onGetAllReservations();
  }

  onGetAllReservations() {
    this.reservation$= this.rs.getAllReservations(this.currentPage,this.size).pipe(
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
  onPageBook(i: number) {
    this.currentPage=i;
    this.onGetAllReservations();
  }

  onDelete(r) {
    let v = confirm("Etes vous sure de vouloir supprimer ce produit ?")
    if(v==true)
      this.rs.deleteReservation(r)
        .subscribe(data=>{
          this.onGetAllReservations();
        })
  }
  onSelect(r: any) {
    this.rs.select(r).subscribe(data=>{
     // r.confirmed=data.confirmed;
    })
  }

}
