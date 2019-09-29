import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})

export class DashboardCanActivateGuardService implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let islogin = false;
        if (this.authService.isUserLoggedin()) {
            this.router.navigate(['login']);
            return false;
        } else {
            return true;
        }

    }
}