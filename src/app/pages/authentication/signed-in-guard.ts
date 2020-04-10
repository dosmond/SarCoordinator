import { AuthProcessService } from './auth-service';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignedInGuard implements CanActivate {
  constructor(
    private router: Router,
    private authProcess: AuthProcessService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authProcess.afa.user.pipe(
      map(user => {
        if (!user) {
          return true
        } else {
          if(localStorage.getItem("role") !== 'admin') {
            this.authProcess.signOut();
          }
            
          this.router.navigate([`/dashboard`]);
        }
      })
    );
  }
}