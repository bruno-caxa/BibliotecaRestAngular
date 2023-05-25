import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';

import { UserService } from './../user/service/user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {


  constructor(public userService: UserService,
              public snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') !== null) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
    }
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      let errorMsg = error.error.errors[0].message;

      if (error.error == 'true') {
        this.userService.logout();
      }
      this.snackBar.open(errorMsg, 'close', {duration: 5000});
      return throwError(() => errorMsg)
    }));
  }

}
