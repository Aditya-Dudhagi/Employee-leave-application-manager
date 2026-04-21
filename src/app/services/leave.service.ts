import { Injectable } from '@angular/core';
import { Leave, Employee } from '../models/leave.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private readonly LEAVES_KEY = 'leaves';
  private readonly EMPLOYEES_KEY = 'employees';

  private defaultEmployees: Employee[] = [
    { name: 'Aditya', totalLeaves: 20 },
    { name: 'Rahul', totalLeaves: 20 },
    { name: 'Sneha', totalLeaves: 20 },
    { name: 'Priya', totalLeaves: 20 }
  ];

  private defaultLeaves: Leave[] = [
    {
      id: 1,
      employeeName: 'Aditya',
      fromDate: '2026-04-10',
      toDate: '2026-04-12',
      leaveType: 'Full Day',
      reason: 'Family function - cousin\'s wedding ceremony',
      status: 'Approved'
    },
    {
      id: 2,
      employeeName: 'Rahul',
      fromDate: '2026-04-22',
      toDate: '2026-04-24',
      leaveType: 'Full Day',
      reason: 'Personal medical appointment and recovery',
      status: 'Pending'
    },
    {
      id: 3,
      employeeName: 'Sneha',
      fromDate: '2026-04-18',
      toDate: '2026-04-18',
      leaveType: 'Half Day',
      reason: 'Bank work and document submission',
      status: 'Rejected'
    },
    {
      id: 4,
      employeeName: 'Priya',
      fromDate: '2026-04-25',
      toDate: '2026-04-28',
      leaveType: 'Full Day',
      reason: 'Vacation trip to hometown',
      status: 'Pending'
    },
    {
      id: 5,
      employeeName: 'Aditya',
      fromDate: '2026-04-20',
      toDate: '2026-04-20',
      leaveType: 'Half Day',
      reason: 'Doctor visit for regular checkup',
      status: 'Pending'
    },
    {
      id: 6,
      employeeName: 'Sneha',
      fromDate: '2026-04-05',
      toDate: '2026-04-07',
      leaveType: 'Full Day',
      reason: 'Sister\'s engagement ceremony',
      status: 'Approved'
    }
  ];

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    if (!localStorage.getItem(this.LEAVES_KEY)) {
      localStorage.setItem(this.LEAVES_KEY, JSON.stringify(this.defaultLeaves));
    }
    if (!localStorage.getItem(this.EMPLOYEES_KEY)) {
      localStorage.setItem(this.EMPLOYEES_KEY, JSON.stringify(this.defaultEmployees));
    }
  }

  getAllLeaves(): Leave[] {
    const data = localStorage.getItem(this.LEAVES_KEY);
    return data ? JSON.parse(data) : [];
  }

  getLeavesByEmployee(employeeName: string): Leave[] {
    return this.getAllLeaves().filter(l => l.employeeName === employeeName);
  }

  addLeave(leave: Omit<Leave, 'id' | 'status'>): Leave {
    const leaves = this.getAllLeaves();
    const newLeave: Leave = {
      ...leave,
      id: leaves.length > 0 ? Math.max(...leaves.map(l => l.id)) + 1 : 1,
      status: 'Pending'
    };
    leaves.push(newLeave);
    localStorage.setItem(this.LEAVES_KEY, JSON.stringify(leaves));
    return newLeave;
  }

  updateLeaveStatus(id: number, status: 'Approved' | 'Rejected'): void {
    const leaves = this.getAllLeaves();
    const index = leaves.findIndex(l => l.id === id);
    if (index !== -1) {
      leaves[index].status = status;
      localStorage.setItem(this.LEAVES_KEY, JSON.stringify(leaves));
    }
  }

  cancelLeave(id: number): void {
    let leaves = this.getAllLeaves();
    leaves = leaves.filter(l => l.id !== id);
    localStorage.setItem(this.LEAVES_KEY, JSON.stringify(leaves));
  }

  getEmployees(): Employee[] {
    const data = localStorage.getItem(this.EMPLOYEES_KEY);
    return data ? JSON.parse(data) : [];
  }

  getLeavesTaken(employeeName: string): number {
    const leaves = this.getLeavesByEmployee(employeeName);
    return leaves
      .filter(l => l.status === 'Approved')
      .reduce((total, l) => {
        const from = new Date(l.fromDate);
        const to = new Date(l.toDate);
        const days = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        return total + (l.leaveType === 'Half Day' ? days * 0.5 : days);
      }, 0);
  }

  getEmployeesOnLeaveToday(): string[] {
    const today = new Date().toISOString().split('T')[0];
    const leaves = this.getAllLeaves();
    return leaves
      .filter(l => l.status === 'Approved' && l.fromDate <= today && l.toDate >= today)
      .map(l => l.employeeName);
  }
}
