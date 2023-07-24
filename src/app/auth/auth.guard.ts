import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(state: RouterStateSnapshot): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user = localStorage.getItem('userData');
    // Check whether the session is still valid or not.
    // The session will be still valid if user data is still stoted in localStorage
    if (user) {
      this.authService.user.next(JSON.parse(user));
      return true;
    }
    else {
      return this.authService.user.pipe(
        // Take only the first emitted
        take(1),
        map(user => {
          // !! will return false is 'user' object is null or undefined, true otherwise
          const isAuth = !!user;
          if (isAuth) return true;
          // Not logged in, so redirect to login page with return url
          // Not really need here, but just for demo purposes
          // return this.router.createUrlTree(['/auth'], { queryParams: { returnUrl: state.url }});
          return this.router.createUrlTree(['/auth']);
        })
      );
    }
  }

  canActivateChild(state: RouterStateSnapshot): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     return this.canActivate(state);
  }
}
