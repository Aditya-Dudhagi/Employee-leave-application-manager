import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeRecord } from '../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: EmployeeRecord[] = [];
  displayedColumns: string[] = ['id', 'name', 'department', 'role'];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employees = this.employeeService.getEmployees();
  }
}
