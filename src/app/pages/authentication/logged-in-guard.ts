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
          if(localStorage.getItem("role") === 'admin')
            return true;
          this.router.navigate([`/login`], { queryParams: { redirectUrl: state.url }});
        } else {
            this.router.navigate([`/login`], { queryParams: { redirectUrl: state.url }});
        }
      })
    );
  }
}