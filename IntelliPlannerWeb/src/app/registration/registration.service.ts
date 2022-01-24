import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})
export class RegistrationService {
    serverUrl: string;
    constructor(private httpClient: HttpClient) {
        this.serverUrl = environment.baseUrlUser;
    }

    /**
     * 
     * get api
     */

    getExistUser(username) {
        const httpOptionSignUp = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + sessionStorage.getItem('signUpToken')
            })
        }
        return this.httpClient.get(this.serverUrl + `isusernameexist/${username}`, httpOptionSignUp).pipe(
            catchError(this.handleError)
        )
    }


    

    saveUser(user) {
        const httpOption = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
            })
        }
        return this.httpClient.post(this.serverUrl + `user`, user, httpOption).pipe(
            catchError(this.handleError)
        )
    }

    otpVerification(otp): Observable<any> {
        const httpOptionSignUp = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + sessionStorage.getItem('signUpToken')
            })
        }
        return this.httpClient.post(this.serverUrl + `verifyotp`, otp, httpOptionSignUp).pipe(
            catchError(this.handleError)
        )
    }
    saveLoginData(loginData) {
        const httpOptionSignUp = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + sessionStorage.getItem('signUpToken')
            })
        }
        return this.httpClient.post(this.serverUrl + `usercredentials`, loginData, httpOptionSignUp).pipe(
            catchError(this.handleError)
        )
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
    // public handleError(err: HttpErrorResponse): Observable<any> {
    //   return Observable.throw(err);
    // }
}