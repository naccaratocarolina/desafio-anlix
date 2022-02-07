import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientComponent } from './pages/patient/patient.component';
import { CharacteristicsComponent } from './pages/characteristics/characteristics.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  { path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'patient/:id',
    component: PatientComponent
  },
  {
    path: 'characteristics',
    component: CharacteristicsComponent
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
