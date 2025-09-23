import { Routes } from '@angular/router';
import { MachineryListComponent } from './machinery/machinery-list/machinery-list.component';
import { MachineryDetailComponent } from './machinery/machinery-detail/machinery-detail.component';
import { MachineryFormComponent } from './machinery/machinery-form/machinery-form.component';
import { RentalListComponent } from './rental/rental-list/rental-list.component';
import { RentalFormComponent } from './rental/rental-form/rental-form.component';
import { MaintenanceListComponent } from './maintenance/maintenance-list/maintenance-list.component';
import { MaintenanceFormComponent } from './maintenance/maintenance-form/maintenance-form.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'machinery',
    pathMatch: 'full'
  },
  {
    path: 'machinery',
    component: MachineryListComponent
  },
  {
    path: 'machinery/new',
    component: MachineryFormComponent
  },
  {
    path: 'machinery/:id',
    component: MachineryDetailComponent
  },
  {
    path: 'rental',
    component: RentalListComponent
  },
  {
    path: 'rental/new',
    component: RentalFormComponent
  },
  {
    path: 'rental/edit/:id',
    component: RentalFormComponent
  },
  {
    path: 'maintenance',
    component: MaintenanceListComponent
  },
  {
    path: 'maintenance/new',
    component: MaintenanceFormComponent
  },
  {
    path: 'maintenance/edit/:id',
    component: MaintenanceFormComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'machinery'
  }
];