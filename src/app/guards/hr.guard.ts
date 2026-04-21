import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HrGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isHR()) {
      return true;
    }
    if (this.authService.isEmployee()) {
      return this.router.parseUrl('/employee/dashboard');
    }
    return this.router.parseUrl('/login');
  }
}
