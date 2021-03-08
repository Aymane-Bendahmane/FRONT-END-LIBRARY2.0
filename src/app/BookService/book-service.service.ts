import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  public host: string = 'http://localhost:8988';
  public authenticated: boolean = false;

  constructor(public http: HttpClient) {
    this.getHeaders();
  }


  public getBook() {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      authorization: 'Basic ' + btoa('user0' + ':' + '1234'),

    });
    return this.http.get(this.host + '/books', {headers: headers});
  }

  // @ts-ignore
  uploadPhotoBook(file: File, id): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', this.host + '/uploadPhoto/' + id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  // @ts-ignore
  public getBookUrl(url): Observable<any> {

    return this.http.get(url, {headers: this.getHeaders()});
  }

  public getBookByKeyWord(mc: string, page: number, size: number) {
    return this.http.get(this.host + '/books/search/BookByKeyword?des=' + mc + '&page=' + page + '&size=' + size, {headers: this.getHeaders()});
  }


  authenticate(credentials: any, callback: any) {

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password),

    });


    this.http.get(this.host + '/user', {headers: headers}).subscribe(response => {
      console.log('See me ;(');
      // @ts-ignore
      if (response['name']) {
        this.authenticated = true;
        localStorage.setItem('credentials', JSON.stringify(credentials));

      } else {
        this.authenticated = false;
      }
      //console.log(this.authenticated)
      return callback && callback();
    });


  }


  // @ts-ignore
  getHeaders(): HttpHeaders {
    let tmp = localStorage.getItem('credentials');

    if (tmp != null) {
      let credentials = JSON.parse(tmp);
      this.authenticated = true;
      const headers = new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password),

      });

      console.log(credentials);
      return headers;
    }


  }
}
