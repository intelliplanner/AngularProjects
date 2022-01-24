import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import {Observable,throwError} from 'rxjs';
import {Employee} from '../employee/Employee';
import {catchError} from 'rxjs/operators';
import {nodemailer} from 'nodemailer';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

 uri = 'http://localhost:3000/employees';

  constructor(private httpClient:HttpClient) { 	 }


  getEmployees():Observable<Employee[]>{
  	return this.httpClient.get<Employee[]>(this.uri).pipe(catchError(this.handleError));
  }

  getEmployee(id:number):Observable<Employee>{
  	return this.httpClient.get<Employee>('${this.uri}/${id}').pipe(catchError(this.handleError));
  }

  // addEmployee(employ: Employee):Observable<Employee>{
  // 	return this.httpClient.post<Employee>(this.uri,employ,

  // 		headers:new HttpHeaders({
  // 			'Content-Type':'application/json'
  // 		})

  // 		).pipe(catchError(this.handleError));
  // }
  private handleError(errorResponse: HttpErrorResponse){
  		if(errorResponse.error instanceof ErrorEvent){
			console.error('Clent Side Error');
  		}else{
  			console.error('Server Side Error');
  		}
  		return throwError('this is the service with the service');
  }


 
}
