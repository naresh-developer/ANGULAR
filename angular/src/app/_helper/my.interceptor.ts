import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }
  from '@angular/common/http';
  import { Router } from '@angular/router';

import { Observable } from 'rxjs'
import { tap } from "rxjs/operators";
import { AuthenticationService } from '../_services/authentication.service';


@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let currentUser = this.authenticationService.currentUserValue;
      if (currentUser && currentUser.token) {
          request = request.clone({
              setHeaders: { 
                  Authorization: `Bearer ${currentUser.token}`
              }
          });
      }

      return next.handle(request);
  }
}