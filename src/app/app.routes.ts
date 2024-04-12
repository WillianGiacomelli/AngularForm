import { Routes } from '@angular/router';
import { LoginComponent } from './templates/user/login/login.component';
import { CreateUserComponent } from './templates/user/create-user/create-user.component';
import { DashboardComponent } from './templates/dashboard/dashboard.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
];
