import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { RenderComponent } from './render/render.component';
import { LoginComponent } from './teachers/login-teachers/login-teachers.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'app',
    component: AppLayoutComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [authGuard] },
      {
        path: 'add',
        component: AddAssignmentComponent,
        canActivate: [authGuard],
      },
      { path: 'assignments', component: AssignmentsComponent },
      { path: 'render', component: RenderComponent, canActivate: [authGuard] },
      {
        path: 'assignment/:id',
        component: AssignmentDetailComponent,
        canActivate: [authGuard],
      },
      {
        path: 'assignment/edit/:id',
        component: EditAssignmentComponent,
        canActivate: [authGuard],
      },
      {
        path: 'assignment/details/:id',
        component: AssignmentDetailComponent,
        canActivate: [authGuard],
      },
    ],
  },
];
