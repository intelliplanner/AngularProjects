import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor, HttpErrorResponse, HttpEvent, HttpResponse
} from '@angular/common/http';
import { finalize, catchError, map } from 'rxjs/operators';
import { SharedService } from '../shared/shared.service';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class Interceptor implements HttpInterceptor {
  private totalRequests = 0;
 
  constructor(public router: Router, public sharedService: SharedService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.totalRequests++;
    this.sharedService.global_loader = true;
  
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.sharedService.global_loader = false;
        }
      }),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status == 422) {
          this.sharedService.global_loader=false;
         
          this.sharedService.global_notification = [];
          this.sharedService.global_notification.push(
            { severity: 'error', detail: error.message }
          );
         this.sharedService.global_loader = false;

          }
        return throwError(error);

      })
    );

  }
  
}