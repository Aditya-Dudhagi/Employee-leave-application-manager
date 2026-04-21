import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../services/leave.service';
import { EmployeeService } from '../../services/employee.service';
import { Leave } from '../../models/leave.model';

@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class HrDashboardComponent implements OnInit {
  totalRequests = 0;
  pendingCount = 0;
  approvedCount = 0;
  rejectedCount = 0;
  totalEmployees = 0;
  employeesOnLeave: string[] = [];
  recentLeaves: Leave[] = [];

  constructor(
    private leaveService: LeaveService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const allLeaves: Leave[] = this.leaveService.getAllLeaves();
    this.totalRequests = allLeaves.length;
    this.pendingCount = allLeaves.filter((l: Leave) => l.status === 'Pending').length;
    this.approvedCount = allLeaves.filter((l: Leave) => l.status === 'Approved').length;
    this.rejectedCount = allLeaves.filter((l: Leave) => l.status === 'Rejected').length;
    this.totalEmployees = this.employeeService.getTotalCount();
    this.employeesOnLeave = this.leaveService.getEmployeesOnLeaveToday();
    this.recentLeaves = allLeaves.slice(-5).reverse();
  }
}
