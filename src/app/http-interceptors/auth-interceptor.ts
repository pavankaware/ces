import { Injectable } from '@angular/core';
import { ToasterService } from '../services/toaster.service';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router, public toasterService: ToasterService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // skip interceptor for login page
    let re = /jwt.json/gi;
    if (req.url.search(re) === -1) {
      if (this.auth.isUserLoggedin()) {
        this.router.navigate(['login']);
        this.toasterService.showToaster('errorToastr', 'Error', 'Your session is expired, please login again.', 'top-right');
        return;
      }
    }
    // Get the auth token from the service.
    
    const authToken = this.auth.getToken();

    // Clone the request and set the new header in one step.
    if (req.url.search(re) === -1) { 
      var authReq = req.clone({ setHeaders: { Authorization: authToken } });
    }else {
      var authReq = req.clone();
    }
   

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}

