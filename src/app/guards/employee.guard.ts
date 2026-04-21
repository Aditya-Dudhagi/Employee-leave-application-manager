import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isEmployee()) {
      return true;
    }
    if (this.authService.isHR()) {
      return this.router.parseUrl('/hr/dashboard');
    }
    return this.router.parseUrl('/login');
  }
}
