import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    
  })
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  ServerUrl = environment.baseUrlGet;
  CaptchaUrl = environment.baseCaptchaUrl;
  baseCaptchaVerifyUrl = environment.baseCaptchaVerifyUrl;
  serverUrlLogin = environment.baseUrlLogin;
  serverUrlUser = environment.baseUrlUser;
  serverUrlTpr=environment.baseUrlTpr;
  serverUrlTeacher=environment.baseUrlTpr;

  headers= new HttpHeaders();
  constructor(private httpClient: HttpClient, private _router: Router) {
    //this.environment()
    // 'Content-Type':'application/json',
    // 'Accept':'application/json',
    // 'Access-Control-Allow-Headers':'Content-Type',
    // 'Access-Control-Allow-Origin': '*',
    this.headers.append('Accept','application/json');
    this.headers.append('Content-Type','application/json');
    this.headers.append('Content-Type','application/x-www-form-urlencoded');
    this.headers.append('Access-Control-Allow-Methods','*');
    this.headers.append('Access-Control-Allow-Origin','*')
    this.headers.append('Access-Control-Request-Header','*');

  }
  redirectCares(token){
    const httpOptionsCares = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization':token
        
      })
    }
    return this.httpClient.get('http://localhost:4200/cares/config/15/',httpOptionsCares)
  }

  getUniversity(): Observable<any> {

    return this.httpClient.get(this.ServerUrl + `institutecount?categoryId=27`, httpOptions).pipe(
      catchError(this.handleError)
    )
  }

 

  
  getSchool(): Observable<any> {
    return this.httpClient.get(this.ServerUrl + `institutecount?categoryId=43`, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  getCollege(): Observable<any> {
    return this.httpClient.get(this.ServerUrl + `institutecount?categoryId=15`, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  
  getStandlonIns(): Observable<any> {
    return this.httpClient.get(this.ServerUrl + `institutecount?categoryId=36`, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
//   getCaptchaText():Observable<any>{
//     return this.httpClient.get(this.CaptchaUrl + `secure/captcha/captcha.jpg`,{  responseType:'blob',observe: 'response',}).pipe(map((resp: any) => {
//        console.log("response", resp);
//        return resp;
 
//      }), catchError(this.handleError)
//    );
//  }


// getCaptchaText() {
  // return this.httpClient.get(this.CaptchaUrl + `secure/captcha/captcha.jpeg`, { responseType: 'json' }).pipe(
  //   return this.httpClient.get(this.serverUrlUser + `getCaptcha`, { responseType: 'json'}).pipe(
  //   catchError(this.handleError)
  // )


//   let HTTPOptions:any = {

//     headers: new HttpHeaders({
//        'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*',
//     }),
//     responseType: 'json'
//  }

//   return this.httpClient.get(this.serverUrlUser + `getCaptcha`).pipe(
//   catchError(this.handleError)
// )
 
// }
getCaptchaText() {
  console.log(this.serverUrlTeacher)
  //   let HTTPOptions:Object = {
  //     headers: new HttpHeaders({
  //         'Access-Control-Allow-Origin': '*',
  //         'Content-Type': 'application/json'
  //     }),
  //     responseType: 'json'
  //  }
  //   return this.httpClient.get(this.CaptchaUrl + `getCaptcha`, HTTPOptions).pipe(
    // return this.httpClient.get(this.CaptchaUrl + `getCaptcha`, { responseType: 'json' }).pipe(
      return this.httpClient.get(this.serverUrlTeacher + `/captcha/getCaptcha`, { responseType: 'json' }).pipe(
    catchError(this.handleError)
  )
}
verifyGetCaptcha(text, encodeCaptcha): Observable<any> {
  // return this.httpClient.get(this.CaptchaUrl + `verifycaptcha?captchaText=${text}&data=${encodeCaptcha}`).pipe(
 return this.httpClient.get(this.serverUrlTeacher + `/captcha/verifycaptcha?captchaText=${text}&data=${encodeCaptcha}`)
 }
// verifyGetCaptcha(text, encodeCaptcha): Observable<any> {
//   let HTTPOptions:Object = {

//     headers: new HttpHeaders({
//         'Access-Control-Allow-Origin': '*'
//     }),
//     responseType: 'text'
//  }
//   return this.httpClient.get(this.serverUrlUser + `verifycaptcha?captchaText=${text}&data=${encodeCaptcha}`).pipe(
//     catchError(this.handleError)
//   )
// }



  // getCaptchaText():Observable<any>{
  //      return this.httpClient.get(this.CaptchaUrl + `secure/captcha/captcha.jpg`,{  responseType:'blob'}).pipe(
  //       catchError(this.handleError)
  //       )
  //   }
  //   verifyGetCaptcha(text): Observable<any> {
  //     return this.httpClient.get(this.CaptchaUrl + `verifycaptcha?captchaText=${text}`).pipe(
  //       catchError(this.handleError)
  //     )
  //   }
  getIndustrialIns(): Observable<any> {
    return this.httpClient.get(this.ServerUrl + `institutecount?categoryId=58`, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  getAllState(payload): Observable<any> {
    return this.httpClient.get(this.ServerUrl + `state?countryId=15&bilingual=${payload.bilingual}&languageId=${payload.languageId}`, httpOptions).pipe(
      catchError(this.handleError)
    )
  }




  getAllCategoryList(payload){
    return this.httpClient.get(this.ServerUrl + `instituteCategory?languageId=15&bilingual=${payload.bilingual}&languageId=${payload.languageId}`, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  getAllSubCategoryList(payload){
    return this.httpClient.get(this.ServerUrl + `instituteSubCategory?categoryId=${payload.categoryId}&bilingual=${payload.bilingual}&languageId=${payload.languageId}`, httpOptions).pipe(
      catchError(this.handleError)
    )
  }



//  https://api.eideas.nic.in/eIdeas/district?countryId=15&stateId=58&bilingual=S
  getAllDistrictStateWise(payload):Observable<any>{
    return this.httpClient.get(this.ServerUrl + `district?countryId=15&stateId=${payload.stateId}&bilingual=${payload.bilingual}&languageId=${payload.languageId}`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getInstituteList(payload):Observable<any>{
    return this.httpClient.get(this.ServerUrl +`getList?groupId=${payload.id}&bilingual=${payload.bilingual}&languageId=${payload.languageId}&codeStandard=${payload.codeStandard}&limit=${payload.limit}`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getInstituteListByFilter(payload):Observable<any>{
    return this.httpClient.get(this.ServerUrl + `getList?districtId=${payload.districtId}&stateId=${payload.stateId}&categoryId=${payload.category}&codeStandard=${payload.codeStandard}&subCategoryId=${payload.subId}&bilingual=${payload.bilingual}&limit=${payload.limit}&languageId=${payload.languageId}`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  
  getSearchByName(payload):Observable<any>{
    return this.httpClient.get(this.ServerUrl +`searchByName?name=${payload.keyWord}&districtId=${payload.districtId}&stateId=${payload.stateId}&categoryId=${payload.category}&codeStandard=${payload.codeStandard}&subCategoryId=${payload.subId}&limit=${payload.limit}&bilingual=${payload.bilingual}&languageId=${payload.languageId}`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
 

 

  getLanguageList(payload): Observable<any> {
    return this.httpClient.get(this.ServerUrl + `language?bilingual=${payload}&groupId=20012`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getLoginPageContent(payload): Observable<any> {
    return this.httpClient.get(this.serverUrlUser + `loginpagecontent?Id=${payload.siteId}&languageId=${payload.languageId}`, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  /**
       * 
       * @post api 
       */
  login(loginData): Observable<any> {
    return this.httpClient.post(this.serverUrlLogin, loginData, httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  forgotPassword(forgotData): Observable<any>{
    return this.httpClient.post(this.serverUrlUser + `verifyforgotpassword`, forgotData, httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  emailVerification(email):Observable<any>{
    return this.httpClient.get(this.serverUrlTeacher + `/teachers/verifyEmail?email=${email}`, httpOptions)
  }

 getToken(){
   return sessionStorage.getItem('Token');
 }
 setToken(token:any){
   sessionStorage.setItem('Token',token)
 }
 
 isLogined():boolean{
   return this.getToken() !=null;
 }
 getTotalRecordCountPenDetails(){
  return this.httpClient.get<any>(this.serverUrlTeacher + `/teachers/pen/getTotalRecordCountPenDetails`);
}

getCounts(){
  return this.httpClient.get<any>(this.serverUrlTpr + `/tpr/getCounts`);
}
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      
      console.error('An error occurred:', error.error.message);
    } else {
     // console.log(error)
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened. Please try again later.');
  }

}

