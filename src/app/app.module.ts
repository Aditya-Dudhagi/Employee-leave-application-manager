import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/material.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { EmployeeDashboardComponent } from './employee/dashboard/dashboard.component';
import { ApplyLeaveComponent } from './employee/apply-leave/apply-leave.component';
import { MyLeavesComponent } from './employee/my-leaves/my-leaves.component';
import { HrDashboardComponent } from './hr/dashboard/dashboard.component';
import { ManageLeavesComponent } from './hr/manage-leaves/manage-leaves.component';
import { AddEmployeeComponent } from './hr/add-employee/add-employee.component';
import { EmployeeListComponent } from './hr/employee-list/employee-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    EmployeeDashboardComponent,
    ApplyLeaveComponent,
    MyLeavesComponent,
    HrDashboardComponent,
    ManageLeavesComponent,
    AddEmployeeComponent,
    EmployeeListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
