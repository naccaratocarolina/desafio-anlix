import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsTableRoutingModule } from './patients-table-routing.module';
import { PatientsTableComponent } from './patients-table.component';

import { MaterialModule } from "../../material.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PatientsTableComponent
  ],
  imports: [
    CommonModule,
    PatientsTableRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ PatientsTableComponent ]
})
export class PatientsTableModule { }
