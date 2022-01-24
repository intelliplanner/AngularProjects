import { HttpClient, HttpErrorResponse ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { environment } from 'src/environments/environment';
import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MasterService {
  ServerUrl = environment.baseUrlGet;

  baseUrlteachers= environment.baseUrlTeachers;

  baseUrlTpr= environment.baseUrlTpr;
 
  constructor(public httpClient: HttpClient) { }
  

  getInstituteById(payload): Observable<any> {
    return this.httpClient.get(this.ServerUrl + `getBasicInfoByInstituteId?bilingual=${payload.bilingual}&languageId=${payload.languageId}&instituteId=${payload.instituteId}&codeStandard=${payload.codeStandard}`).pipe(
      catchError(this.handleError)
    );
  }
  getInstituteSubCategory(payload): Observable<any> {
    return this.httpClient.get(this.ServerUrl + `instituteSubCategory?bilingual=${payload.bilingual}&languageId=${payload.languageId}&categoryId=${payload.categoryId}&codeStandard=${payload.codeStandard}`).pipe(
      catchError(this.handleError)
    );
  }
  getSubCategoryDetailsGovernmentById(payload): Observable<any> {
    return this.httpClient.get(this.ServerUrl + `getList?bilingual=${payload.bilingual}&languageId=${payload.languageId}&categoryId=${payload.categoryId}&goveranceSectorId=${payload.goveranceSectorId}&limit=${payload.limit}&codeStandard=${payload.codeStandard}`).pipe(
      catchError(this.handleError)
    );
  }
  getGovtSubCategory(payload): Observable<any> {
    return this.httpClient.get(this.ServerUrl + `governancesector?bilingual=${payload.bilingual}&languageId=${payload.languageId}`).pipe(
      catchError(this.handleError)
    );
  }


  getSubCategoryDetailsById(payload): Observable<any> {
    return this.httpClient.get(this.ServerUrl + `getList?bilingual=${payload.bilingual}&languageId=${payload.languageId}&subCategoryId=${payload.subCategoryId}&limit=${payload.limit}&codeStandard=${payload.codeStandard}`).pipe(
      catchError(this.handleError)
    );
  }
  // *********************************
  getTeacherDataById(payload){
    return this.httpClient.get<any>(this.baseUrlteachers + `/teachers/teacherDataById?loginId=${payload.id}`);
  }
  sendEmailOpt(payload){
    return this.httpClient.get<any>(this.baseUrlteachers + `/teachers/sendOtp?otpType=email&mobileOrEmail=${payload.email}`).pipe(
      catchError(this.handleError)
    );
  }
  sendMobileOpt(payload){
    return this.httpClient.get<any>(this.baseUrlteachers + `/teachers/sendOtp?otpType=mobile&mobileOrEmail=${payload.mobileopt}`).pipe(
      catchError(this.handleError)
    );
  }
  verifyEmailOrMobileOpt(payload){
    return this.httpClient.get<any>(this.baseUrlteachers + `/teachers/verifyOtp?otpType=${payload.otpType}&mobileOrEmail=${payload.emailOrMobile}&otp=${payload.otp}`);
  }
  generateUsernamaPassword(payload){
    return this.httpClient.post<any>(this.baseUrlteachers + `/users/saveuser`,payload);
  }

  //*********** */
  getGenderList(){
    return this.httpClient.get<any>(this.baseUrlteachers + `/master/genderNic`);
  }
  getClassList(){
    return this.httpClient.get<any>(this.baseUrlteachers + `/master/classTaughtNic`);
  }
  getNatureOfAppointmentList(){
    return this.httpClient.get<any>(this.baseUrlteachers + `/master/natureOfAppointmentNic`);
  }
  getTeachersTypeList(){
    return this.httpClient.get<any>(this.baseUrlteachers + `/master/teacherTypeNicList`);
  }
  
  getAcademicQualificationName(payload){
    return this.httpClient.get<any>(this.baseUrlteachers + `/master/academicQualification?id=${payload.id}`);
  }
  
  getProfessionalQualificationName(payload){
    return this.httpClient.get<any>(this.baseUrlteachers + `/master/professionalQualification?id=${payload.id}`);
  }
  saveTeacherProfileHistory(payload){
    const httpOptions = {
      headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
      })
  };
    return this.httpClient.post<any>(this.baseUrlteachers + `/teachers/saveTeacherProfileHistory`,payload,httpOptions);
  }
  
  getTeacherProfileHistory(payload){
    return this.httpClient.get<any>(this.baseUrlteachers + `/teachers/teacherProfileHistory/${payload.id}`);
  }
 
  
  updateTeacherProfileHistoryStatus(payload){
    return this.httpClient.post<any>(this.baseUrlteachers + `/teachers/updateteacherProfileHistoryStatus`,payload);
  }

  getTeacherPenDetailsStatus(payload){
    return this.httpClient.get<any>(this.baseUrlteachers + `/teachers/pen/reg/getPenDetailStatus?teacherId=${payload.teacherId}&mobile=${payload.mobile}&email=${payload.email}`);
  }
  
  getTeacherDataByEmailAndMobile(payload){
    return this.httpClient.get<any>(this.baseUrlteachers + `/teachers/teacherDataByEmailAndMobile?email=${payload.email}&mobile=${payload.mobile}`);
  }
  
  getTprList(){
    return this.httpClient.get<any>(this.baseUrlTpr + `/tpr/getTpRecordList`);
  }
  getTprById(payload){
    debugger
    return this.httpClient.get<any>(this.baseUrlTpr + `/tpr/getTpRecordById?id=${payload}`);
  }
  getTransporterList(){
    return this.httpClient.get<any>(this.baseUrlTpr + `/transporter/getTransporterList`);
  }
  getTransporterById(payload){
    debugger
    return this.httpClient.get<any>(this.baseUrlTpr + `/transporter/getTransporterById?id=${payload.id}`);
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
