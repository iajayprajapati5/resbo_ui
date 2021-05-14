import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(error => {
      // if (error instanceof HttpErrorResponse && error.status === 401) {
      //   alert("Not Logged In.");
      //   return throwError(error);
      // } else {
      //   return throwError(error);
      // }
      alert(error?.error?.message || "Unknown error.");
      return throwError(error);
    }));
  }
}
