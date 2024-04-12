import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../templates/user/login/login.component';
import { CreateUserComponent } from '../templates/user/create-user/create-user.component';
import { DashboardComponent } from '../templates/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'create', component: CreateUserComponent },
  //{ path: 'dashboard', component: DashboardComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
