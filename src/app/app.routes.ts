import { Routes } from '@angular/router';
import { MachineryListComponent } from './machinery/machinery-list/machinery-list.component';
import { MachineryDetailComponent } from './machinery/machinery-detail/machinery-detail.component';
import { MachineryFormComponent } from './machinery/machinery-form/machinery-form.component';
import { RentalListComponent } from './rental/rental-list/rental-list.component';
import { RentalFormComponent } from './rental/rental-form/rental-form.component';
import { MaintenanceListComponent } from './maintenance/maintenance-list/maintenance-list.component';
import { MaintenanceFormComponent } from './maintenance/maintenance-form/maintenance-form.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'machinery',
    component: MachineryListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'machinery/new',
    component: MachineryFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'machinery/:id',
    component: MachineryDetailComponent,
    canActivate: [authGuard]
  },
  {
    path: 'rental',
    component: RentalListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'rental/new',
    component: RentalFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'rental/edit/:id',
    component: RentalFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'maintenance',
    component: MaintenanceListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'maintenance/new',
    component: MaintenanceFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'maintenance/edit/:id',
    component: MaintenanceFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/register',
    component: RegisterComponent
  },
  {
    path: '**',
    redirectTo: 'machinery'
  }
];