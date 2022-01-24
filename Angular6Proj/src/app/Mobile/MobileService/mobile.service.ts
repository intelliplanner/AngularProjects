import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import {Observable,throwError} from 'rxjs';

import {catchError} from 'rxjs/operators';
import {nodemailer} from 'nodemailer';
import {MobileShop} from '.././MobileShop';



@Injectable({
  providedIn: 'root'
})
export class MobileService {
	uri = 'http://localhost:9090/mobile/';
  constructor(private httpClient:HttpClient) { }

  
  // getAllMobile():Observable<Mobile[]>{
  //   const httpOptions = {
  //      headers: new HttpHeaders({
  //                   'Content-Type': 'application/json',
  //                   'Access-Control-Allow-Origin': '*',
  //                   'Access-Control-Allow-Credentials': 'true'
  //      })
  //    };
  //    let  url  =  this.uri  + 'getAllMobile/';
  // 	return this.httpClient.get<Mobile[]>(url,httpOptions).pipe(catchError(this.handleError));
  // }


  getAllMobileShops():Observable<MobileShop[]>{
    const httpOptions = {
       headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
       })
     };
     let  url  =  this.uri  + 'getAllMobileShop/';
  	return this.httpClient.get<MobileShop[]>(url,httpOptions).pipe(catchError(this.handleError));
  }

    private handleError(errorResponse: HttpErrorResponse){
  		if(errorResponse.error instanceof ErrorEvent){
			  console.error('Clent Side Error');
  		}else{
  			console.error('Server Side Error');
  		}
  		return throwError('this is the service with the service');
  }

//  saveMobile(topics: Mobile):Observable<Mobile>{
//    const httpOptions = {
//        headers: new HttpHeaders({
//                     'Content-Type': 'application/json',
//                     'Access-Control-Allow-Origin': '*',
//                     'Access-Control-Allow-Credentials': 'true'
//        })
//      };
//      let  url=  this.uri  + 'saveMobile/';
//     return this.httpClient.post<Mobile>(url,topics,httpOptions)
//     .pipe(catchError(this.handleError));
//   }

// saveMobileShops(topicsExtended: MobileShop):Observable<MobileShop>{
//    const httpOptions = {
//        headers: new HttpHeaders({
//                     'Content-Type': 'application/json',
//                     'Access-Control-Allow-Origin': '*',
//                     'Access-Control-Allow-Credentials': 'true'
//        })
//      };
//      let  url=  this.uri  + 'saveMobileShop/';
//     return this.httpClient.post<MobileShop>(url,topicsExtended,httpOptions)
//     .pipe(catchError(this.handleError));
//   }
  

}
