import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LeaveService } from '../../services/leave.service';
import { Leave } from '../../models/leave.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {
  userName = '';
  totalLeaves = 20;
  leavesTaken = 0;
  leavesRemaining = 0;
  pendingCount = 0;
  recentLeaves: Leave[] = [];

  constructor(
    private authService: AuthService,
    private leaveService: LeaveService
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    this.loadData();
  }

  loadData(): void {
    const allLeaves = this.leaveService.getLeavesByEmployee(this.userName);
    this.leavesTaken = this.leaveService.getLeavesTaken(this.userName);
    this.leavesRemaining = this.totalLeaves - this.leavesTaken;
    this.pendingCount = allLeaves.filter((l: Leave) => l.status === 'Pending').length;
    this.recentLeaves = allLeaves.slice(-5).reverse();
  }
}
