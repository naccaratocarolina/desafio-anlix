import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientComponent } from './pages/patient/patient.component';
import { CharacteristicsComponent } from './pages/characteristics/characteristics.component';

import { SideMenuModule } from "./components/side-menu/side-menu.module";
import { ToolbarModule } from "./components/toolbar/toolbar.module";
import { PatientsTableModule } from "./components/patients-table/patients-table.module";
import { MaterialModule } from "./material.module";

import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from "ng-apexcharts";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PatientComponent,
    CharacteristicsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SideMenuModule,
    ToolbarModule,
    PatientsTableModule,
    HttpClientModule,
    MaterialModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
