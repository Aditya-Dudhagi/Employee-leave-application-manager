import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserRole } from '../../services/auth.service';
import { LeaveService } from '../../services/leave.service';
import { Employee } from '../../models/leave.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  selectedRole: UserRole = null;
  selectedEmployee: string = '';
  employees: Employee[] = [];
  isLoading = false;

  constructor(
    private authService: AuthService,
    private leaveService: LeaveService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.redirectByRole(this.authService.getRole());
      return;
    }
    this.employees = this.leaveService.getEmployees();
  }

  onLogin(): void {
    if (!this.selectedRole) return;

    const userName = this.selectedRole === 'employee' ? this.selectedEmployee : 'HR Manager';
    if (this.selectedRole === 'employee' && !this.selectedEmployee) return;

    this.isLoading = true;

    setTimeout(() => {
      this.authService.login(this.selectedRole, userName);
      this.isLoading = false;
      this.redirectByRole(this.selectedRole);
    }, 800);
  }

  private redirectByRole(role: UserRole): void {
    if (role === 'employee') {
      this.router.navigate(['/employee/dashboard']);
    } else if (role === 'hr') {
      this.router.navigate(['/hr/dashboard']);
    }
  }
}
