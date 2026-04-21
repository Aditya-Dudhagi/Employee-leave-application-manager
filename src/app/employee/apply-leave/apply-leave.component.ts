import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { LeaveService } from '../../services/leave.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss']
})
export class ApplyLeaveComponent implements OnInit {
  leaveForm!: FormGroup;
  isSubmitting = false;
  minDate = new Date();
  employeeNames: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private leaveService: LeaveService,
    private employeeService: EmployeeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.employeeNames = this.employeeService.getEmployeeNames();

    this.leaveForm = this.fb.group({
      employeeName: [this.authService.getUserName(), Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      leaveType: ['Full Day', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  get f() {
    return this.leaveForm.controls;
  }

  onSubmit(): void {
    if (this.leaveForm.invalid) {
      Object.keys(this.f).forEach(key => this.f[key].markAsTouched());
      return;
    }

    const fromDate = this.formatDate(this.f['fromDate'].value);
    const toDate = this.formatDate(this.f['toDate'].value);

    if (fromDate > toDate) {
      this.snackBar.open('From Date must be before or equal to To Date', 'Close', {
        duration: 4000,
        panelClass: ['snack-error']
      });
      return;
    }

    this.isSubmitting = true;

    setTimeout(() => {
      this.leaveService.addLeave({
        employeeName: this.f['employeeName'].value,
        fromDate,
        toDate,
        leaveType: this.f['leaveType'].value,
        reason: this.f['reason'].value
      });

      this.isSubmitting = false;
      this.snackBar.open('🎉 Leave request submitted successfully!', 'Close', {
        duration: 3000,
        panelClass: ['snack-success']
      });
      this.router.navigate(['/employee/my-leaves']);
    }, 600);
  }

  private formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }
}
