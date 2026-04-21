import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export type UserRole = 'employee' | 'hr' | null;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ROLE_KEY = 'userRole';
  private readonly USER_KEY = 'userName';

  constructor(private router: Router) {}

  login(role: UserRole, userName: string): void {
    localStorage.setItem(this.ROLE_KEY, role as string);
    localStorage.setItem(this.USER_KEY, userName);
  }

  logout(): void {
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/login']);
  }

  getRole(): UserRole {
    return localStorage.getItem(this.ROLE_KEY) as UserRole;
  }

  getUserName(): string {
    return localStorage.getItem(this.USER_KEY) || '';
  }

  isLoggedIn(): boolean {
    return !!this.getRole();
  }

  isEmployee(): boolean {
    return this.getRole() === 'employee';
  }

  isHR(): boolean {
    return this.getRole() === 'hr';
  }
}
