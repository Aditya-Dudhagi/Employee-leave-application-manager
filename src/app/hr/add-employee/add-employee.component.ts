import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  isSubmitting = false;

  departments: string[] = ['IT', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales', 'Support'];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      department: ['', Validators.required],
      role: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  get f() {
    return this.employeeForm.controls;
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      Object.keys(this.f).forEach(key => this.f[key].markAsTouched());
      return;
    }

    this.isSubmitting = true;

    setTimeout(() => {
      this.employeeService.addEmployee({
        name: this.f['name'].value.trim(),
        department: this.f['department'].value,
        role: this.f['role'].value.trim()
      });

      this.isSubmitting = false;
      this.snackBar.open('🎉 Employee added successfully!', 'Close', {
        duration: 3000,
        panelClass: ['snack-success']
      });
      this.employeeForm.reset();
    }, 500);
  }
}
