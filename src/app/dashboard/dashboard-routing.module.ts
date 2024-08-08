import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AddTaskPageComponent } from './pages/add-task-page/add-task-page.component';
import { EditTaskPageComponent } from './pages/edit-task-page/edit-task-page.component';
import { ListTaskPageComponent } from './pages/list-task-page/list-task-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'add-task',
        component: AddTaskPageComponent
      },
      {
        path: 'edit-task',
        component: EditTaskPageComponent
      },
      {
        path: 'list-task',
        component: ListTaskPageComponent
      },
      {
        path: '**',
        redirectTo: 'list-task'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
