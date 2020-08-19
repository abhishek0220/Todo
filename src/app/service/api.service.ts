import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUri : string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getTodo(){
    let url = `${this.baseUri}/todo`;
    return this.http.get(url);
  }
  getTodobyID(id){
    let url = `${this.baseUri}/todo/${id}`;
    return this.http.get(url);
  }
  addTodo(data): Observable<any> {
    let url = `${this.baseUri}/add`;
    return this.http.post(url, data)
  }
  removeTodo(id): Observable<any> {
    let url = `${this.baseUri}/todo/${id}/edit`;
    return this.http.delete(url);
  }
  editTodo(id, data){
    let url = `${this.baseUri}/todo/${id}/edit`;
    return this.http.post(url, data);
  }
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
