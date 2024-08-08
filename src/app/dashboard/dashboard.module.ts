import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { EditTaskPageComponent } from './pages/edit-task-page/edit-task-page.component';
import { ListTaskPageComponent } from './pages/list-task-page/list-task-page.component';
import { AddTaskPageComponent } from './pages/add-task-page/add-task-page.component';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    AddTaskPageComponent,
    EditTaskPageComponent,
    ListTaskPageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
