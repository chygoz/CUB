import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SettingsComponent } from './settings/settings.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent }
    ],
    canActivate: [AuthGuardService]
  },
  {
    path: 'reports', component: LayoutComponent,
    children: [
      { path: '', component: ReportsComponent }
    ],
    canActivate: [AuthGuardService]
  },
  {
    path: 'statistics', component: LayoutComponent,
    children: [
      { path: '', component: StatisticsComponent }
    ],
    canActivate: [AuthGuardService]
  },
  {
    path: 'settings', component: LayoutComponent,
    children: [
      { path: 'settings', component: SettingsComponent }
    ],
    canActivate: [AuthGuardService]
  },
  {
    path: 'settings', component: LayoutComponent,
    children: [
      { path: 'add-admin', component: AddAdminComponent }
    ],
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
