import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { LeaveService } from '../../services/leave.service';
import { Leave } from '../../models/leave.model';

@Component({
  selector: 'app-my-leaves',
  templateUrl: './my-leaves.component.html',
  styleUrls: ['./my-leaves.component.scss']
})
export class MyLeavesComponent implements OnInit {
  leaves: Leave[] = [];
  filteredLeaves: Leave[] = [];
  displayedColumns = ['dates', 'leaveType', 'reason', 'status', 'actions'];
  statusFilter = 'All';

  constructor(
    private authService: AuthService,
    private leaveService: LeaveService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadLeaves();
  }

  loadLeaves(): void {
    this.leaves = this.leaveService.getLeavesByEmployee(this.authService.getUserName());
    this.leaves.sort((a, b) => b.id - a.id);
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.statusFilter === 'All') {
      this.filteredLeaves = [...this.leaves];
    } else {
      this.filteredLeaves = this.leaves.filter((l: Leave) => l.status === this.statusFilter);
    }
  }

  onFilterChange(status: string): void {
    this.statusFilter = status;
    this.applyFilter();
  }

  cancelLeave(id: number): void {
    this.leaveService.cancelLeave(id);
    this.snackBar.open('Leave request cancelled', 'Close', {
      duration: 3000,
      panelClass: ['snack-success']
    });
    this.loadLeaves();
  }
}
