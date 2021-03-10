import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Students} from '../Model/Students';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  public host: string = 'http://localhost:8988';
  public authenticated: boolean = false;

  constructor(public http: HttpClient) {
    this.getHeaders();
  }

  isAdmin() {
    let admin = JSON.parse(localStorage.getItem('credentials'));

    if (admin) {
      if (admin.role == 'admin') {
        return true;
      } else {
        return false;
      }
    }
  }

  public getBook() {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      authorization: 'Basic ' + btoa('user0' + ':' + '1234'),

    });
    return this.http.get(this.host + '/bookss', {headers: this.getHeaders()});
  }


  authenticate(credentials: any, callback: any) {

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password),

    });


    this.http.get(this.host + '/user', {headers: headers}).subscribe(response => {
      console.log(response['principal']);
      // @ts-ignore
      if (response['name']) {
        this.authenticated = true;
        response['authorities'].forEach(role => {

          credentials.role = role.authority;
        });

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

      return headers;
    }


  }

  onReservation(value: any) {
    return this.http.post(this.host + '/saveReservation', value, {headers: this.getHeaders()});
  }

  /*************************************************Books***************************/
  // @ts-ignore
  uploadPhotoBook(file: File, id) {
    let formdata: FormData = new FormData();

    formdata.append('file', file);


    return this.http.post(this.host + '/uploadPhoto/' + id,formdata,{headers: this.getHeaders()});
  }

  public getBookByKeyWord(mc: string, page: number, size: number) {
    return this.http.get(this.host + '/Sbooks?mc=' + mc + '&page=' + page + '&size=' + size, {headers: this.getHeaders()});
  }

  // @ts-ignore
  public getBookUrl(id:any): Observable<any> {
    return this.http.get(this.host+'/getBook/'+id, {headers: this.getHeaders()});
  }

  deleteProduct(book: any): Observable<void> {
    return this.http.get<void>(this.host + '/Dbooks/' + book.id, {headers: this.getHeaders()});
  }

  save(book: any): Observable<any> {
    return this.http.post<any>(this.host + '/AddBook', book, {headers: this.getHeaders()});
  }

  updateProduct(book: any): Observable<any> {
    return this.http.patch<any>(this.host + '/editB/' + book.id, book, {headers: this.getHeaders()});
  }

  /****************************************************Students***************************/
  public getStudents(page: number, size: number) {
    return this.http.get(this.host + '/students?page=' + page + '&size=' + size, {headers: this.getHeaders()});

  }

  public getStudentByKeyword(mc: string, page: number, size: number) {
    return this.http.get(this.host + '/Sstudents?mc=' + mc + '&page=' + page + '&size=' + size, {headers: this.getHeaders()});
  }

  public deleteResource(id) {
    return this.http.get<void>(this.host + '/Dstudent/' + id, {headers: this.getHeaders()});

  }

  getStudentByid(id: number) {
    return this.http.get(this.host + '/students/' + id, {headers: this.getHeaders()});

  }

  getallstudents(): Observable<Students[]> {
    return this.http.get<any>(this.host + '/students', {headers: this.getHeaders()})
      .pipe(
        map(data => data._embedded.categories)
      );
  }

  saveStudent(student: Students) {

    return this.http.post(this.host + '/addS', student, {headers: this.getHeaders()});
    // @ts-ignore


  }

  onUpdateStudents(student: Students) {
    return this.http.put(this.host + '/editS/' + student.id, student, {headers: this.getHeaders()});
  }

  /********************************reservation***********/
  getAllReservations(page: number, size: number): Observable<any[]> {
    return this.http.get<any[]>(this.host + '/reservations?page=' + page + '&size=' + size + '&projection=R1',{headers: this.getHeaders()});
  }

  select(reservation: any): Observable<any> {
    reservation.confirmed = !reservation.confirmed;
    return this.http.patch<any>(this.host + '/editR/' + reservation.id, reservation,{headers: this.getHeaders()});
  }

  deleteReservation(reservation: any): Observable<void> {
    return this.http.get<void>(this.host + "/Dreservation/" + reservation.id,{headers: this.getHeaders()});
  }

  getDateEnd(id:any) {
    return this.http.get(this.host+'/getDate/'+id,{headers: this.getHeaders()}) ;
  }
}
