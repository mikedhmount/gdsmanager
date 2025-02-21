import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthGuardService } from '../service/auth-guard.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthGuardService, private router: Router) {}

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean> {
  //   const isAuthenticated = this.authService.isAuthenticated();
  //   console.log("Auth: " + isAuthenticated);
  //   if (isAuthenticated) {
  //     return isAuthenticated;
  //   } else {
  //     this.router.navigate(['/login']);
  //     return isAuthenticated;
  //   }
  // }
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      tap((isAuthenticated: any) => {
        console.log("AuthGuard - isAuthenticated:", isAuthenticated);
        if (!isAuthenticated) {
          console.log("AuthGuard - Redirecting to /login");
          this.router.navigate(['/login']);
        }
      })
    );
  }
  
}