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
import { NotificationService } from 'src/app/shared/service/notification.service';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  constructor(private notificationServ: NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        alert(error?.error?.exception);
      }
      // else{
      //   alert(error?.error?.message || "Unknown error.");
      // }
      this.notificationServ.setNotification(error?.error?.message, "danger");
      return throwError(error);
    }));
  }
}
