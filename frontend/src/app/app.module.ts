import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientComponent } from './pages/patient/patient.component';

import { SideMenuModule } from "./components/side-menu/side-menu.module";
import { MaterialModule } from "./material.module";

import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from "ng-apexcharts";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CharacteristicsComponent } from './pages/characteristics/characteristics.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PatientComponent,
    CharacteristicsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SideMenuModule,
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
