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
    if (user) {
      this.authService.user.next(JSON.parse(user));
      return true;
    }
    else {
      return this.authService.user.pipe(
        take(1),
        map(user => {
          // !! will return false is 'user' object is null or undefined, true otherwise
          const isAuth = !!user;
          if (isAuth) return true;
          // Not logged in, so redirect to login page with reurn url
          return this.router.createUrlTree(['/auth'], { queryParams: { returnUrl: state.url}});
        })
      );
    }
    }

}
