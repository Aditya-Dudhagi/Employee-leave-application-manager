import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isSidenavOpen = true;

  constructor(public authService: AuthService, private router: Router) {}

  get isEmployee(): boolean {
    return this.authService.isEmployee();
  }

  get isHR(): boolean {
    return this.authService.isHR();
  }

  get userName(): string {
    return this.authService.getUserName();
  }

  get roleLabel(): string {
    return this.isHR ? 'HR Manager' : 'Employee';
  }

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  logout(): void {
    this.authService.logout();
  }
}
