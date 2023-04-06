import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { UserService } from './../user/service/user.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(public userService: UserService,
              public router: Router,
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
      let errorMsg = error.error.message;
      this.userService.logout();
      this.snackBar.open('Expired user token, please login again!', 'close', {duration: 5000});
      this.router.navigate(['/login']);
      return throwError(() => errorMsg)
    }));
  }

}
