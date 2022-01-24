import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ErrorHandlerService } from '../error-handler.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {


  private iss = {
    login : 'http://localhost:4200/login',
    signup : 'http://localhost:4200/login/signup'
  }

  constructor(
    private _http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private _router: Router
    ){}

  _apiBaseUrl  = 'http://139.59.6.162:3000/';

  login(loginData: any){

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post<any>(this._apiBaseUrl+'adminlogins', 
                      loginData, 
                      {headers: headers}
                )
                .pipe(catchError(this.errorHandlerService.handleError));
                
  }


  handle(token){

    this.setToken(token);
    //console.log(this.isValid());
  }

  setToken(token: string){
    localStorage.setItem("setToken", token);
  }

  getToken(){
    return localStorage.getItem('setToken');
  }

  get(){
    return localStorage.getItem('setToken');
  }

  isValid(){
    const token = this.get();
    if(token){
      const payload = this.payload(token);

      if(payload){
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }

    }
  }

  payload(token){
  const payload = token.split('.')[1];
  return this.decode(payload);
  }

  decode(payload){

      return JSON.parse(atob(payload));
  }


  isLogined(): boolean{
    return this.getToken() != null;
    //return this.isValid();
  }

  logout(){
    localStorage.removeItem('setToken');
    return this._router.navigate(['/login']); 
  }

  errorHandler(error: Response){
    console.log(error);
    return throwError(error);
  }


}
