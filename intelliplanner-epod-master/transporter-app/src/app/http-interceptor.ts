import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  	console.log("JWTInterceptor")
    req = req.clone({
      setHeaders: {
        authorization: (localStorage.getItem('authToken') || "none")
      }
    });
    console.log("JWTreq",req)
    return next.handle(req);
  }

}