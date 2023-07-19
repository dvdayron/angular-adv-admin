import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SingupComponent } from './auth/singup/singup.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graph1Component } from './pages/graph1/graph1.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  { 
    path: '', 
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'graph1', component: Graph1Component },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },
  
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SingupComponent },

  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
