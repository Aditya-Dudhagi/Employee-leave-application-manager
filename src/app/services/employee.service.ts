import { Injectable } from '@angular/core';
import { EmployeeRecord } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly STORAGE_KEY = 'employeeRecords';

  private defaultEmployees: EmployeeRecord[] = [
    { id: 1, name: 'Aditya', department: 'IT', role: 'Developer' },
    { id: 2, name: 'Rahul', department: 'HR', role: 'HR Executive' },
    { id: 3, name: 'Sneha', department: 'Finance', role: 'Accountant' },
    { id: 4, name: 'Priya', department: 'Marketing', role: 'Marketing Analyst' }
  ];

  constructor() {
    this.initializeEmployees();
  }

  initializeEmployees(): void {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.defaultEmployees));
    }
  }

  getEmployees(): EmployeeRecord[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  addEmployee(employee: Omit<EmployeeRecord, 'id'>): EmployeeRecord {
    const employees = this.getEmployees();
    const newEmployee: EmployeeRecord = {
      ...employee,
      id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1
    };
    employees.push(newEmployee);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(employees));
    return newEmployee;
  }

  getEmployeeNames(): string[] {
    return this.getEmployees().map(e => e.name);
  }

  getTotalCount(): number {
    return this.getEmployees().length;
  }
}
