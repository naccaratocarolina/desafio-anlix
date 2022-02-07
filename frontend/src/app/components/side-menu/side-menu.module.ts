import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideMenuRoutingModule } from './side-menu-routing.module';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

import { MaterialModule } from "../../material.module";

@NgModule({
  declarations: [ SideMenuComponent ],
  imports: [
    CommonModule,
    SideMenuRoutingModule,
    MaterialModule
  ],
  exports: [ SideMenuComponent ]
})
export class SideMenuModule { }
