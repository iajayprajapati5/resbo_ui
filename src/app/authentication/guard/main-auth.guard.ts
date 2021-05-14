import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MainAuthGuard implements CanActivate {

  constructor(private authServ: AuthenticationService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authServ.loggedInUser.authorities?.includes("ROLE_USER"))
      return true;

    return this.authServ.getLoggedInUser().pipe(tap(res => {
        if(res.authorities?.includes("ROLE_USER")){
          this.authServ.loggedInUser = res;
        }
      }), map(res => {
        return this.authServ.loggedInUser.authorities?.includes("ROLE_USER");
      }), catchError(error => {
        this.router.navigateByUrl("/login");
        return of(false);
      })
    );
  }
}
