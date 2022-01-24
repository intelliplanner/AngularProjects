import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlCallService {

  apiUrl: string = 'http://skillstan.in:3000/'; 
  urlThirdParty: string = "https://jsonplaceholder.typicode.com/users";

  headers = new HttpHeaders();
  useSubscribe = new Subject();

  constructor(private _http:HttpClient) { 

    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.headers.append('Access-Control-Allow-Origin', '*'); 
    this.headers.append('Access-Control-Request-Header', '*');
  }

  getTable(): Observable<any> {
    return this._http.post<any>(this.apiUrl+'pool', 'id'); 
  }

  getEdit(): Observable<any> {
    return this._http.post<any>(this.apiUrl+'pool', 'id'); 
  }




}
