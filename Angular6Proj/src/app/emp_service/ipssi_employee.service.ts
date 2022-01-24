import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import {Observable,throwError} from 'rxjs';
import {IpssiEmployees} from '../ipssi_employees/IpssiEmployees';
import {catchError} from 'rxjs/operators';
import {nodemailer} from 'nodemailer';
@Injectable({
  providedIn: 'root'
})
export class IpssiEmployeeService {

 // uri = 'http://localhost:3000/ipssi_employees';
  // uri = 'http://localhost:9090/employee/get';
  uri = 'http://localhost:9090/employee/';


  constructor(private httpClient:HttpClient) { 	 }


  getIpssiEmployees():Observable<IpssiEmployees[]>{
    const httpOptions = {
       headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
       })
     };
     let  url  =  this.uri  + 'getAll/';
  	return this.httpClient.get<IpssiEmployees[]>(url,httpOptions).pipe(catchError(this.handleError));
  }

 

  getIpssiEmployeeById(id:number):Observable<IpssiEmployees>{ 
    const httpOptions = {
       headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
       })
     };
    let  url  =  this.uri  + 'get/'+ id;
  	return this.httpClient.get<IpssiEmployees>(url,httpOptions).pipe(catchError(this.handleError));
  }

  
  // editIpssiEmployee(id:number):Observable<IpssiEmployees>{
  //   return this.httpClient.get<IpssiEmployees>('${this.uri}/${id}').pipe(catchError(this.handleError));
  // }

  // editIpssiEmployee()

  updateIpssiEmployee(employee: IpssiEmployees):Observable<IpssiEmployees>{
   const httpOptions = {
       headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
       })
     };
     let  url=  this.uri  + 'update/';
    return this.httpClient.put<IpssiEmployees>(url,employee,httpOptions)
    .pipe(catchError(this.handleError));
  }
addIpssiEmployee(employee: IpssiEmployees):Observable<IpssiEmployees>{
   const httpOptions = {
       headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                     'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
       })
     };
     let  url=  this.uri  + 'savenew/';
    return this.httpClient.post<IpssiEmployees>(url,employee,httpOptions)
    .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse){
  		if(errorResponse.error instanceof ErrorEvent){
			  console.error('Clent Side Error');
  		}else{
  			console.error('Server Side Error');
  		}
  		return throwError('this is the service with the service');
  }
}
