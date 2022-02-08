import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarRoutingModule } from './toolbar-routing.module';
import { ToolbarComponent } from './toolbar.component';

import { MaterialModule } from "../../material.module";

@NgModule({
  declarations: [ ToolbarComponent ],
  imports: [
    CommonModule,
    ToolbarRoutingModule,
    MaterialModule
  ],
  exports: [ ToolbarComponent ]
})
export class ToolbarModule { }
