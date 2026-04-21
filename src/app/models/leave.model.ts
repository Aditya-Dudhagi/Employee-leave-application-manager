export interface Leave {
  id: number;
  employeeName: string;
  fromDate: string;
  toDate: string;
  leaveType: 'Full Day' | 'Half Day';
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface Employee {
  name: string;
  totalLeaves: number;
}
