import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { SideMenuRoutingModule } from './side-menu-routing.module';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@NgModule({
  declarations: [ SideMenuComponent ],
  imports: [
    CommonModule,
    SideMenuRoutingModule,
    MatIconModule
  ],
  exports: [ SideMenuComponent ]
})
export class SideMenuModule { }
