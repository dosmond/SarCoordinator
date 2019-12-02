import { AuthProcessService } from './auth-service';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(
    private router: Router,
    private authProcess: AuthProcessService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authProcess.afa.user.pipe(
      map(user => {
        if (user) {
            console.log("From logged-in-component");
            console.log(user);
            return true;
        } else {
            this.router.navigate([`/login`], { queryParams: { redirectUrl: state.url }});
        }
      })
    );
  }
}