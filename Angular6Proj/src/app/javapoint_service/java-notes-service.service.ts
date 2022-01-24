import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import {Observable,throwError} from 'rxjs';
import {Topics} from '../javapoint/Topics';
import {TopicsExtended} from '../javapoint/Topics-Extended';
import {TopicsExtendedContent} from '../javapoint/Topics-Extended-Content';
import {catchError} from 'rxjs/operators';
import {nodemailer} from 'nodemailer';
@Injectable({
  providedIn: 'root'
})
export class JavaNotesServiceService {
  
  uri = 'http://localhost:9090/javaTopics/';
  uri1 = 'http://localhost:9090/javaTopicExtended/';
  uri2 = 'http://localhost:9090/javaContent/';
  
  constructor(private httpClient:HttpClient) { }


  getAllTopics():Observable<Topics[]>{
    const httpOptions = {
       headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
       })
     };
     let  url  =  this.uri  + 'getAllTopic/';
  	return this.httpClient.get<Topics[]>(url,httpOptions).pipe(catchError(this.handleError));
  }
  getAllTopicsExtended():Observable<TopicsExtended[]>{
    const httpOptions = {
       headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
       })
     };
     let  url  =  this.uri1  + 'getAllTopicsExtended/';
    return this.httpClient.get<TopicsExtended[]>(url,httpOptions).pipe(catchError(this.handleError));
  }


getAllTopicsExtendedContent():Observable<TopicsExtendedContent[]>{
    const httpOptions = {
       headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
       })
     };
     let  url  =  this.uri2  + 'getAllContent/';
    return this.httpClient.get<TopicsExtendedContent[]>(url,httpOptions).pipe(catchError(this.handleError));
  }

  
  getIpssiTopicsById(id:number):Observable<Topics>{ 
    const httpOptions = {
       headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
       })
     };
    let  url  =  this.uri  + 'get/'+ id;
  	return this.httpClient.get<Topics>(url,httpOptions).pipe(catchError(this.handleError));
  }

  
  // editIpssiTopics(id:number):Observable<Topics>{
  //   return this.httpClient.get<Topics>('${this.uri}/${id}').pipe(catchError(this.handleError));
  // }

  // editIpssiTopics()

  updateIpssiTopics(topics: Topics):Observable<Topics>{
   const httpOptions = {
       headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
       })
     };
     let  url=  this.uri  + 'update/';
    return this.httpClient.put<Topics>(url,topics,httpOptions)
    .pipe(catchError(this.handleError));
  }
	

  saveTopics(topics: Topics):Observable<Topics>{
   const httpOptions = {
       headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
       })
     };
     let  url=  this.uri  + 'saveTopic/';
    return this.httpClient.post<Topics>(url,topics,httpOptions)
    .pipe(catchError(this.handleError));
  }

saveTopicsExtended(topicsExtended: TopicsExtended):Observable<TopicsExtended>{
   const httpOptions = {
       headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
       })
     };
     let  url=  this.uri1  + 'saveTopicExtended/';
    return this.httpClient.post<TopicsExtended>(url,topicsExtended,httpOptions)
    .pipe(catchError(this.handleError));
  }
  
  saveTopicsExtendedContent(topicsExtendedContent: TopicsExtendedContent):Observable<TopicsExtendedContent>{
   const httpOptions = {
       headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
       })
     };
     let  url=  this.uri2  + 'saveContent/';
    return this.httpClient.post<TopicsExtendedContent>(url,topicsExtendedContent,httpOptions)
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
