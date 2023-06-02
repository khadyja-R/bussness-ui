import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  canActivate() {
    console.log(this.authService);
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
            console.log(authenticated);
          if (!authenticated) {
            this.router.navigate(['/login']);
          }
        }),
      );
  }
}