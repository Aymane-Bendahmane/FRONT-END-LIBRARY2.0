import {Component, OnInit} from '@angular/core';
import {BookServiceService} from '../BookService/book-service.service';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css']
})
export class UiComponent implements OnInit {
  public books: Object;


  constructor(public service: BookServiceService) {
  }

  ngOnInit(): void {
    const spinner = document.querySelector('#spinner');

    (async () => {
      const movies = await this.getBook();
      spinner.setAttribute("hidden", "");

    })();


  }
getBook(){
    this.service.getBook().subscribe( data => {
      this.books = data ;
      console.log(data)
    },error => {
      console.log(error)
    });
}

}
