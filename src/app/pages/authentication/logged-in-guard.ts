import { IUser } from './../../models/IUser';
import { AuthProcessService } from './auth-service';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
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
    let auth: boolean = false;
    return this.authProcess.afa.user.pipe(
      map(user => {
        if (user) {
          this.authProcess.getIdToken().then(async token => {
            this.authProcess.getUserRole(token).toPromise().then(res => {
              let roles = (res as IUser).roles
              
              if(roles != ["volunteer"])
                true
              console.log(auth)
            })
          })
          return true;
        } else {
          this.router.navigate([`/login`], { queryParams: { redirectUrl: state.url }});
        }
      })
    )
  }
}