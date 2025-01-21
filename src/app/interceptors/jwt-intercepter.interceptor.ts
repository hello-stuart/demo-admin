import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MainService } from '../services/main.service';
import { ConditionhandlerService } from '../Services/conditionhandler.service';

@Injectable()
export class UnityInterceptor implements HttpInterceptor {
  isValidToken: any;
  isDesktop: any;
  constructor(private conditionhandlerService: ConditionhandlerService, private toaster: ToastrService, private router: Router, private mainService: MainService) {
    this.conditionhandlerService.getUserLogedIn().subscribe((resp) => {
      this.isValidToken = resp;
    });
    this.conditionhandlerService.getInnerWidth().subscribe((resp: any) => {
      if (resp < 1024) {
        this.isDesktop = false;
      } else {
        this.isDesktop = true;
      }
    });

  }

  omitCalls = ['auth'];
  skipInterceptor = false;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('api')) {
      this.skipInterceptor = true;
    }
    else {
      this.skipInterceptor = false
    }

    let token = localStorage.getItem('token');
    if (token && !this.skipInterceptor) {
      this.conditionhandlerService.setUserLogedIn(true);
      const Authorization = "Bearer " + localStorage.getItem('token') || "";
      return next.handle(req.clone({ setHeaders: { Authorization } })).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 && this.isValidToken) {
            this.conditionhandlerService.setUserLogedIn(false);
            // localStorage.removeItem('userDetail');
            // localStorage.removeItem('token');
            // this.router.navigate(['/login']);

            // this.toaster.error('pleasde logt in again')
          }
          return throwError(error);
        })
      );
    }
    return next.handle(req);
  }
}
