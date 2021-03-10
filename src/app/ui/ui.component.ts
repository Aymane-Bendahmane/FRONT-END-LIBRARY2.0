import {Component, OnInit} from '@angular/core';
import {BookServiceService} from '../BookService/book-service.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css']
})
export class UiComponent implements OnInit {
  public books: Object;
  public start: any;
  public end: any;
  public v: any;

  public profileFrom: FormGroup;
  public dateEnd: any;

  constructor(public service: BookServiceService, private router: Router) {

  }

  async ngOnInit(): Promise<void> {
    this.profileFrom = new FormGroup({
      startdate: new FormControl([Validators.required]),
      enddate: new FormControl([Validators.required])
    });


    const spinner = document.querySelector('#spinner');


    await this.getBook();

    spinner.setAttribute('hidden', '');


  }

  getBook() {
    this.service.getBook().subscribe(data => {
      this.books = data;

    }, error => {
      console.log(error);
    });
  }

  onReserver() {
    let crd: any = JSON.parse(localStorage.getItem('credentials'));
    if (!crd) {
      this.router.navigateByUrl('/login');
    }

  }

  onSubmit() {
    let crd: any = JSON.parse(localStorage.getItem('credentials'));


    this.v = {
      idBook: 1,
      nameStd: crd.username,
      StratRes: this.profileFrom.value.startdate,
      EndRes: this.profileFrom.value.enddate

    };

    this.service.onReservation(this.v).subscribe(data => {
      if (data) {
        console.log(data);
        alert('Book Reserved');

        window.location.reload();

      }
    }, error => {
      console.log(error);
    });

  }

  get startdate() {
    return this.profileFrom;
  }

  getDateEnd(id:any)
  {
    console.log(":-)")
    this.service.getDateEnd(id).subscribe( data=>{
      this.dateEnd = data
    },error => {
      console.log(error)
    })
    return
  }
}
