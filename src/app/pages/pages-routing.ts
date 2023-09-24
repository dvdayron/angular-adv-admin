import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './examples/progress/progress.component';
import { Graph1Component } from './examples/graph1/graph1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './examples/promises/promises.component';
import { RxjsComponent } from './examples/rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';

const routes: Routes = [
  { 
    path: 'dashboard', 
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: {title: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent, data: {title: 'Progress'} },
      { path: 'graph1', component: Graph1Component, data: {title: 'Graph1'} },
      { path: 'account', component: AccountSettingsComponent, data: {title: 'Account Settings'} },
      { path: 'promises', component: PromisesComponent, data: {title: 'Promises'} },
      { path: 'rxjs', component: RxjsComponent, data: {title: 'Rxjs'} },
      { path: 'profile', component: ProfileComponent, data: {title: 'Profile'} },
      { path: 'users', component: UsersComponent, data: {title: 'Users'} },
      { path: 'users/edit/:id', component: UserEditComponent, data: {title: 'Edit user'} },
      { path: 'doctors', component: DoctorsComponent, data: {title: 'Doctors'} },
      { path: 'hospitals', component: HospitalsComponent, data: {title: 'Hospitals'} },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class PagesRoutingModule { }