import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, RouterState, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/take';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot): Observable<boolean> {
   return this.auth.user$.pipe(map(user => {
      if (user) {
        return true;
      }

      this.router.navigate(['/login'], {queryParams: { returnUrl: state.url }});
      return false;
    })
   );
  }
}