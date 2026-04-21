import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { EmployeeDashboardComponent } from './employee/dashboard/dashboard.component';
import { ApplyLeaveComponent } from './employee/apply-leave/apply-leave.component';
import { MyLeavesComponent } from './employee/my-leaves/my-leaves.component';
import { HrDashboardComponent } from './hr/dashboard/dashboard.component';
import { ManageLeavesComponent } from './hr/manage-leaves/manage-leaves.component';
import { AddEmployeeComponent } from './hr/add-employee/add-employee.component';
import { EmployeeListComponent } from './hr/employee-list/employee-list.component';
import { AuthGuard } from './guards/auth.guard';
import { EmployeeGuard } from './guards/employee.guard';
import { HrGuard } from './guards/hr.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'employee',
    component: LayoutComponent,
    canActivate: [AuthGuard, EmployeeGuard],
    children: [
      { path: 'dashboard', component: EmployeeDashboardComponent },
      { path: 'apply-leave', component: ApplyLeaveComponent },
      { path: 'my-leaves', component: MyLeavesComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'hr',
    component: LayoutComponent,
    canActivate: [AuthGuard, HrGuard],
    children: [
      { path: 'dashboard', component: HrDashboardComponent },
      { path: 'manage-leaves', component: ManageLeavesComponent },
      { path: 'add-employee', component: AddEmployeeComponent },
      { path: 'employees', component: EmployeeListComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
