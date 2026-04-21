import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LeaveService } from '../../services/leave.service';
import { Leave } from '../../models/leave.model';

@Component({
  selector: 'app-manage-leaves',
  templateUrl: './manage-leaves.component.html',
  styleUrls: ['./manage-leaves.component.scss']
})
export class ManageLeavesComponent implements OnInit {
  leaves: Leave[] = [];
  filteredLeaves: Leave[] = [];
  displayedColumns = ['employee', 'dates', 'leaveType', 'reason', 'status', 'actions'];
  statusFilter = 'All';

  constructor(
    private leaveService: LeaveService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadLeaves();
  }

  loadLeaves(): void {
    this.leaves = this.leaveService.getAllLeaves();
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

  approveLeave(id: number): void {
    this.leaveService.updateLeaveStatus(id, 'Approved');
    this.snackBar.open('✅ Leave request approved!', 'Close', {
      duration: 3000,
      panelClass: ['snack-success']
    });
    this.loadLeaves();
  }

  rejectLeave(id: number): void {
    this.leaveService.updateLeaveStatus(id, 'Rejected');
    this.snackBar.open('❌ Leave request rejected', 'Close', {
      duration: 3000,
      panelClass: ['snack-error']
    });
    this.loadLeaves();
  }
}
