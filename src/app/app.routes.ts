import { Routes } from '@angular/router';
import { LoginComponent } from './templates/login/login.component';
import { CreateUserComponent } from './templates/user/create-user/create-user.component';
import { DashboardComponent } from './templates/user/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateUserComponent },
  { path: 'dashboard', component: DashboardComponent },
];
